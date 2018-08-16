import 'assets/style_entry.js';
import './main.scss'
import 'bootstrap-loader';

import DBjsonp from 'public/DBjsonp';


import header from 'public/components/header';
$('body').prepend(header.render())
header.init()


import showing from './movieList1';
DBjsonp.getShowing({
    city:"深圳",
    count:18,
    succ:(data)=>{
        $("#main").append(showing({data:data}))
    }
})
// 通过本地数据渲染
// import moveData from 'public/tempDate';
// $('#main').append(showing({data:moveData}));

// 北美票房
// import usboxData from 'public/usboxData';  // 本地数据
import usbox from './sideUsbox';
// $('#side').append(usbox({data: usboxData}))  // 临时本地数据
DBjsonp.getUSBox({  // 使用jsonp数据加载组件
    succ:(json)=>{
        console.log(json);
        $('#side').append(usbox({data: json}))

    }
})


// 渲染 top250 侧栏组件
// import top250Data from 'public/t250data';
import top250 from './sideTop250';
DBjsonp.getTop250({succ:(json)=>{
    console.log(json)
    $('#side').append(top250({data:json}));
}})

// 顶部选项卡组件
import tags  from './tags/index'
$('#topCol').append(tags.html)
tags.initEvent()
