import './style.scss';

const personCard = (img="",name:string,link:string,isDirector:boolean)=>`
<a href=${link} class="moveCard">
    <div class="moveCard-imgWrap">
        <img src=${img} alt=${name } class="moveCard-img">
    </div>
    <div class="moveCard-msg">
        <p class="moveCard-tit">${name}</p>
        ${ isDirector?'<p class="moveCard-mate">导演</p>':''}
    </div>
</a>
`

const defaultCard = (img="",title:string,scores:number, link:string)=>`
<a href=${link} class="moveCard">
    <div class="moveCard-imgWrap">
        <img src=${img} alt=${"电影海报："+title} class="moveCard-img">
    </div>
    <div class="moveCard-msg">
        <p class="moveCard-tit">${title}
            <span class="moveCard-scores">${scores.toFixed(1)}</span>
        </p>
    </div>
</a>
`
const ACard = (img="",title:string,scores:number,stars:string,link:string)=>`
<a href=${link} class="moveCard moveCard-a">
    <div class="moveCard-imgWrap">
        <img src=${img} alt=${"电影海报："+ title} class="moveCard-img">
    </div>
    <div class="moveCard-msg ellipsis">
        <p class="moveCard-tit ellipsis">${title}</p>
        <span class="moveCard-scores">${scores.toFixed(1)}</span>
        <span class="icon icon-stars-${stars}"></span>
    </div>
</a>
`



type CastInt =  Array<{name:string}>;

const renderCastItem = (arr:CastInt)=>{
    let str = '';
    arr.forEach(element => {
        str += `<span class="moveCard-cast-item">${element.name}</span> / `
    });
    return str;
}

const BCard = (img="",title:string,scores:number,arr:CastInt,link:string)=>`
<a  href=${link} class="moveCard moveCard-b">
<div class="moveCard-imgWrap">
    <img src=${img} alt=${"电影海报："+ title} class="moveCard-img">
</div>
<div class="moveCard-msg">
    <p class="moveCard-tit ellipsis">${title}</p>
    <span class="moveCard-scores">${scores.toFixed(1)}</span>
    <p class="moveCard-cast ellipsis">主演：
        ${ renderCastItem(arr) }
    </p>
</div>
</a>
`

const CCard = (img="",title:string,scores:number,arr:CastInt,link:string)=>`
<a href=${link} class="moveCard moveCard-c">
<div class="moveCard-imgWrap">
    <img src=${img} alt=${"电影海报："+ title} class="moveCard-img">
</div>
<div class="moveCard-msg ellipsis">
    <p class="moveCard-tit ellipsis">
        <span class="moveCard-scores">${scores.toFixed(1)}</span>${title}</p>
    <p class="moveCard-cast ellipsis">
    ${ renderCastItem(arr) }
    </p>
</div>
</a>
`



export default {
    default: defaultCard,
    a:ACard,
    b:BCard,
    c:CCard,
    personCard:personCard,
}