import 'assets/style_entry.js';
import '../movie/main.scss';
import './main.scss';
import 'bootstrap-loader';

// 工具组件
import DBjsonp from 'public/DBjsonp';
import locationTool from 'public/locationTool';
import movieCard from 'public/components/movieCard';

//  头部组件
import header from 'public/components/header';
$('body').prepend(header.render())
header.init()

// 模板组件
import temp from './temp.js';

// 获得搜索ID
const searchPar = locationTool.getSearch() as any;
const id = searchPar.id;

// 请求数据
DBjsonp.getActorById({
    id:id,
    succ:(json)=>{
        
        console.log(json);
        

        // 渲染子组件
        let movieCardStr = '';
        json.works.forEach((item)=>{
            const val = item.subject;
            movieCardStr += `<div class="col-sm-2 col-xs-4" >${movieCard.default(val.images.small,val.title,val.rating.average,`movie.html?id=${val.id}`)}</div>`
        })

        // 插入模板
        $('body').append(temp({
            name:json.name, // 姓名
            name_en:json.name_en, // 英文名
            gender:json.gender,  // 性别
            born_place:json.born_place, // 出生地
            img:json.avatars.large, // 图
            works:json.works, // 作品
            aka:json.aka, // 其他名称
            aka_en:json.aka_en,  // 其他英语翻译名称
            alt:json.alt, // 豆瓣路径

            // 子组件
            movieCard: movieCardStr,
        }))
    }
})
