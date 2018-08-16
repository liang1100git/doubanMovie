import {moveInt,searchMoveInt,celebrity} from 'public/interface/move';

type  succFn = (json:Object)=>void;
type errFn = (msg:Object)=>void;


interface IntSearch{
    q?:string,
    tag?:string,
    start?:number,
    count?:number,
    succ?:(json:searchMoveInt)=>void,
    err?:errFn
}

/**
 * 豆瓣json请求封装对象
 */
class DBjsonp {
    baseUrl :string;
    constructor(){
        this.baseUrl = 'https://api.douban.com'
    }
    jsonp(url:string,par?:Object,succ?:any,err?:any){
        console.log(this.baseUrl+url);
        $.ajax({
            url: this.baseUrl+url,
            data:par,
            dataType: 'jsonp',
            jsonp: 'callback',
            method:'GET',
            success:(json)=>{
                succ && succ(json);
            },
            error:(msg)=>{
                err && err(msg);
            }
        })
    };

    /**
     * 通过ID请求数据
     * @param par.id 电影ID  
     * @param par.succ 成功回调  
     * @param par.err 失败回调  
     */
    getMovieById(par:{id:number,succ:(json:moveInt)=>void,err?:errFn}){
        this.jsonp('/v2/movie/subject/' + par.id, undefined , par.succ,par.err);
    };
     /**
     * 通过ID请求数据
     * @param par.id 演员ID  
     * @param par.succ 成功回调  
     * @param par.err 失败回调  
     */
    getActorById(par:{id:number,succ:(json:celebrity)=>void,err?:errFn}){
       const {id,succ,err} = par;
       this.jsonp('/v2/movie/celebrity/'+id,undefined,succ,err);
    };
    /**
     * 搜索电影  
     * @param par.q query 搜索关键词语  
     * @param par.tab  搜索范围标签  
     * @param par.start 起始数据  
     * @param par.count 返回数据数量  
     * @param par.succ  成功回调  
     * @param par.err 失败回调  
     */
    searchMovie(par:IntSearch){
        const {succ,err,...data}=par;
        this.jsonp('/v2/movie/search',data,succ,err);
    };
    /**
     * 返回TOP 250 电影   
     * @param par.start  起始数据  默认0  
     * @param par.count 返回数据条数量  默认10  
     * @param par.succ 
     * @param par.err
     */
    getTop250(par:{start?:number,count?:number,succ:succFn,err?:errFn}){
        const {succ,err,...data} = par;
        this.jsonp('/v2/movie/top250',data,succ,err)
    };
    /**s
     * 北美票房
     */
    getUSBox(par:{succ:succFn,err?:errFn}){
        const {succ,err} = par
        this.jsonp('/v2/movie/us_box',undefined,succ,err);
    };
    /**
     * 正在上映
     * @param par.city 上映的城市 默认北京
     */
    getShowing(par:{city?:string,succ:succFn,err?:errFn,start?:number,count?:number}){
        const {succ,err,...data}= par;
        this.jsonp('/v2/movie/in_theaters',data,succ,err);
    };
    /**
     * 即将上映
     */
    getComingSoon(par:{start?:number,count?:number,succ:succFn,err?:errFn}){
        const {succ,err,...data} = par;
        this.jsonp('/v2/movie/coming_soon',data,succ,err)
    }
}

export default new DBjsonp();
export {
    IntSearch
}