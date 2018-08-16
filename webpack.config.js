const path = require('path');
const webpack= require('webpack');
const CssPlugin = require('mini-css-extract-plugin');
const SpritePlugin = require('webpack-spritesmith');
const webpackTool = require('./webpack-tool');

/**页面入口 */
const pages = ['index','search','movie','person']; 
const isDev = process.env.NODE_ENV === "dev";

module.exports = {
    entry:Object.assign({
    },webpackTool.createScriltEntry(pages)),
    output:{
        // publicPath:'/dist',
        publicPath:'',
        path: path.resolve(__dirname,'./dist'),
        filename: '[name]/main.[hash].js',
        chunkFilename:'chunks/[name].[hash].js',
    },
    optimization:{
        runtimeChunk:{
            name: entrypoint => `runtimechunk~${entrypoint.name}`
        },
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
              vendors: {
                  test: /[\\/](node_modules|assets)[\\/]/,
                  name: 'vendors',
                  chunks: 'all'
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              }
            }
        }
    },
    module:{
        rules:[
            {
                test: /\.ts$/,
                loader:"ts-loader"
            },{
                test: /\.scss$/,
                use: [
                    isDev?'style-loader':CssPlugin.loader,
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            indent: 'postcss',
                            plugins: (loader) => [
                                require('autoprefixer')(),
                            ]
                        }
                    },
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                './src/assets/style/mixins.scss',
                                './src/assets/style/vars.scss',
                                './src/assets/icon/sprite.scss',
                            ]
                        }
                    }

                ],
            },{
                test: /\.css$/,
                use:[ 
                    isDev?'style-loader':CssPlugin.loader,
                    'css-loader'],
            },{
                test:/\.(gif|jpg|png|woff|woff2|svg|eot|ttf)$/,
                exclude:[path.resolve(__dirname,'src/assets/icon/sprite.png')],
                loader:'url-loader',
                options:{
                    limit: 8192,
                    fallback:'file-loader',
                    name: 'imgs/[name].[hash].[ext]',
                    publicPath: '/dist/'
                },
            },
            {
                // 雪碧图必须使用file-loader
                test: path.resolve(__dirname,'src/assets/icon/sprite.png'),
                loader: 'file-loader',
                options:{
                    publicPath: '/dist/',
                    name:'imgs/[name].[hash].[ext]'
                }
            },
            {
                test: /\.html$/i,
                loader: 'html-withimg-loader',
                
            },{
                test:/\.ejs$/,
                loader: 'ejs-loader',
            }
            // {
            //     test: require.resolve('jquery'),
            //     use: [
            //         { loader: 'expose-loader', options: 'jQuery' },
            //         { loader: 'expose-loader', options: '$' }
            //     ]
            // },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CssPlugin({
            filename: '[name].css',
            chunkFilename:"chunks/[name].[hash].css",
        }),
        new webpack.ProvidePlugin({
            "window.jQuery": 'jquery',
            "window.$":'jquery',
            jQuery:'jquery',
            $:'jquery'
        }),
        // new webpack.ProvidePlugin({
        //     "window.jQuery": 'assets/easyui/jquery.min.js',
        //     "window.$":'assets/easyui/jquery.min.js',
        //     jQuery:'assets/easyui/jquery.min.js',
        //     $:'assets/easyui/jquery.min.js'
        // }),
        new SpritePlugin({
            src:{
                cwd: path.resolve(__dirname,'src/assets/icon/img'),
                glob:'*.png',
            },
            target:{
                image: path.resolve(__dirname,'src/assets/icon/sprite.png'),
                css: path.resolve(__dirname,'src/assets/icon/sprite.css'),
            },
            apiOptions: {
                cssImageRef: './sprite.png'
            },
        }),
        new SpritePlugin({
            src:{
                cwd: path.resolve(__dirname,'src/assets/icon/img'),
                glob:'*.png',
            },
            target:{
                image: path.resolve(__dirname,'src/assets/icon/sprite.png'),
                css: path.resolve(__dirname,'src/assets/icon/sprite.scss'),
            },
            apiOptions: {
                cssImageRef: '../../../src/assets/icon/sprite.png'
            },
        }),
    ].concat(webpackTool.createHtmlEntry(pages)),
    devServer: {
        
        proxy: { // proxy URLs to backend development server
            '/': 'http://localhost:80'
          },

        hot: true,
        compress:true,
        port:8002,
        open: true,
        publicPath: '/dist/',
        // openPage:'dist/pages/index.html',
    },
    resolve:{
        alias: {
            "assets": path.resolve(__dirname,'src/assets'),
            "public": path.resolve(__dirname,'src/public'),
        },
        extensions:[".ts",".json",'.js','.tsx'],
    }
}