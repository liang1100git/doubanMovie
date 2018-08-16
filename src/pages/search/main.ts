import 'assets/style_entry.js';
import './main.scss'
import 'bootstrap-loader';

import BDjsop from 'public/DBjsonp';
import moveCard from 'public/components/movieCard';

import header from 'public/components/header';
import DBjsonp from 'public/DBjsonp';
$('body').prepend(header.render())
header.init();


import tagList from './tagLIst';
$('#topContainer').prepend(tagList);

import locationTool from 'public/locationTool';

// 获得搜索参数并设置默认值
let searchData:any = locationTool.getSearch();
searchData.container = $('.search-result');  //搜索结果的填充容器
if( !searchData.q && !searchData.tag){
    searchData.tag = '热门';
}


// 获得数据并渲染
DBjsonp.searchMovie({
    q:searchData.q,
    tag: searchData.tag,
    count:18,
    succ:(json:any)=>{
        // 设置搜索数据
        searchData.count = 18;
        let items = '';
        json.subjects.forEach((val)=>{
            items += `<div class="col-lg-2 col-md-3  col-xs-6"  >${
                moveCard.b(val.images.small,val.title,val.rating.average,val.casts,`movie.html?id=${val.id}`)
            }</div>`
        })
        $('.search-header-tit').html(json.title)  //设置搜索标题
        $('.search-header-mate').html(`搜索结果:${json.total}条`)  //设置搜索标题

        searchData.container.append(items);
    }
})

const moreBtn = $('#search-more-btn');
moreBtn.on('click',()=>{
    moreBtn.attr('disabled','true') // 避免重复点击
    // 获得数据并渲染
DBjsonp.searchMovie({
    q:searchData.q,
    tag: searchData.tag,
    start:searchData.count,
    count:18,
    succ:(json:any)=>{
        // 设置搜索数据
        searchData.count += json.count;
        let items = '';
        json.subjects.forEach((val)=>{
            items += `<div class="col-lg-2 col-md-3  col-xs-6"  >${
                moveCard.b(val.images.small,val.title,val.rating.average,val.casts,`movie.html?id=${val.id}`)
            }</div>`
        })
        searchData.container.append(items);
        moreBtn.removeAttr('disabled').blur()
    }
})
})