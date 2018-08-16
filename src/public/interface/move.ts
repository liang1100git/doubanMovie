import tagLIst from "../../pages/search/tagLIst";

// 图片
interface picInt{
    small:string,
    medium:string,
    large:string,
}
// 导演，演员 接口
interface presonInt{
    alt:string,
    name: string,
    id:string,
    avatars:picInt
}

// 简单电影
interface simpleMovieInt{
    id:string,
    title:string,
    original_title: string,
    alt:string,
    images:picInt,
    rating:{
        max:number,
        min:number,
        average:number,
        stars:string, // 星星后缀名称
    },
    year: string,
    subtype: 'movie'| 'tv',
}

// 单个电影接口
interface moveInt extends simpleMovieInt {
    reviews_count:number,// 影评数量
    douban_site: string, // 豆瓣地址
    mobile_url:string, //移动端地址
    countries:Array<string>, // 地区
    genres: Array<string>,// 类型标签   
    collect_count:number, // 看过的人 数量
    casts:Array<presonInt> // 演员列表
    original_title:string,//原名
    summary: string,// 简介
    directors:Array<presonInt>// 导演.
    aka:Array<string>// 其他译名
}


// 明星
interface celebrity extends presonInt {
    name_en: string, //英文名，
    // summary: string,
    aka: Array<string>, // 更多中文名
    aka_en:Array<string>, //更多英文名
    gender: string, //性别
    // birthday: string, // 生日,
    born_place: string, //出生地
    works: Array<{roles:string,subject:simpleMovieInt}>,// 5部电影
}

// 搜索电影
interface searchMoveInt{
    start: number,
    count: number,
    total: number,
    query: string,
    tag: string,
    title:string,
    subjects: simpleMovieInt;
}

export {
    searchMoveInt,
    moveInt,
    celebrity,
}