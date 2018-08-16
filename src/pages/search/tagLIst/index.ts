import temp from './temp.js';
import './style.scss'

const tags = [
    {
        title: '片库',
        list:[ '热门','经典','豆瓣高分','冷门佳片','粤语' ]
    },
    {
        title:'地区',
        list:['华语','美国','欧洲','日本','韩国','泰国']
    },{
        title:'分类',
        list:['喜剧','悲剧','爱情','动作','枪战','犯罪','惊悚','悬疑','动画','科幻','战争']
    }
];



export default temp({tagList:tags});
