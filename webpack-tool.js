const HtmlPlugin = require('html-webpack-plugin');

const createScriltEntry = (pages) => {
    let scriptEntry = {};
    pages.forEach((val, i) => {
        scriptEntry[val] = `./src/pages/${val}/main.ts`
    })
    return scriptEntry;
}

// html 入口
const createHtmlEntry = (pages) => {
    let htmlEntry = [];
    pages.forEach((val) => {
        htmlEntry.push(new HtmlPlugin({
            filename: `./pages/${val}.html`,
            template: `./src/pages/${val}/index.html`,
            chunks: [
                val,
                `runtimechunk~${val}`,
                `vendors`
            ],
            chunksSortMode: "manual",
        }))
    })
    return htmlEntry;
}

module.exports = {
    createHtmlEntry:createHtmlEntry,
    createScriltEntry:createScriltEntry,
}
