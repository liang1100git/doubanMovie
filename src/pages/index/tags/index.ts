import temp from './temp.js';
import './style.scss';

import moveCard from 'public/components/movieCard';
import DBjonp from 'public/DBjsonp';

const tags = [
    {value:'热门',id:'tags-remen'},
    {value:'喜剧',id:'tags-xiju'},
    {value:'动作',id:'tags-dongzuo'},
    {value:' 剧情',id:'tags-juqing'},
    {value:'欧美',id:'tags-oumei'},
]

const bind = ()=>{
    // 渲染激活项
    const renderActive = ()=>{
        const $panel = $('#moveTags div.active')
        //  判断懒加载
        if( $panel.attr('data-loaded') == "false" ){
            const value = $panel.attr('data-value')
            
            

            if(value){
                DBjonp.searchMovie({tag: value,count:12,succ:(json:any)=>{
                    //  jsonp 获取数据并渲染模板
                    let items = '';
                    json.subjects.forEach((val,i)=>{
                        let addClass =   i>7? ' hidden-md': '';
                        items += `<div class="col-xs-6 col-md-3 col-lg-2${addClass}" >${
                            moveCard.c(val.images.small,val.title,val.rating.average,val.casts,`movie.html?id=${val.id}`)
                         }</div>`
                    })
                    // 添加内容 并 设置懒加载属性
                    $panel.html( `<div class="row" >${ items }</div>` );
                    $panel.attr('data-loaded',"true");
                    $('#moveTags').height('auto')
                }})
            }
        }
    }
    renderActive()// 首项加载
    
   $('#moveTags a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    renderActive()
    
  })
   $('#moveTags a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    const $panel = $('#moveTags');
    $panel.height( $panel.innerHeight() as number )
  })
}

export default {
    html:temp({tags:tags}),
    initEvent: bind,
}
