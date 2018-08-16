import 'assets/style_entry.js';
import './main.scss'
import 'bootstrap-loader';

import DBjsonp from 'public/DBjsonp';
import locationTool from 'public/locationTool';

//  头部组件
import header from 'public/components/header';
$('body').prepend(header.render())
header.init()


import temp from './temp.js';
import movieCard from 'public/components/movieCard';


const searchPar = locationTool.getSearch() as any;
const movieId = searchPar.id;

DBjsonp.getMovieById({
    id:movieId,
    succ:(json)=>{
        $('title').html('电影：'+json.title);

        console.log(json);
        // 渲染演员卡片
        let presonCard = '';
        json.casts.forEach((val)=>{
            const img  = val.avatars? val.avatars.small: '';
            presonCard += `<div class="col-xs-2 col-ms-4 col-lg-2">${ movieCard.personCard(img,val.name,`person.html?id=${val.id}`,false) }</div>`
        })
        // 渲染导演卡 
        let directorsCard = '';
        json.directors.forEach((val)=>{
            const img  = val.avatars? val.avatars.small: '';
            directorsCard += `<div class="col-xs-2 col-ms-4 col-lg-2">${ movieCard.personCard(img,val.name,`person.html?id=${val.id}`,true) }</div>`
        })

        // 渲染整模板填充       
        $('body').append(temp({
            img: json.images.large,
            title:json.title,
            year:json.year,
            scorse:json.rating.average,
            tags:json.genres,
            directors:json.directors,
            casts:json.casts,
            summary:json.summary,
            original_title: json.original_title,
            aka: json.aka,
            alt:json.alt,

            // 填充卡片模板
            directorsCard:directorsCard,
            castsCard: presonCard, // 演员组卡片
            //  导员组卡片
        }));

    }
})