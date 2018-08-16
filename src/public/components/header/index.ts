import temp from './temp.js';
import './style.scss';

// 提取搜索函数
const search = () => {
    // 获取搜索值
    let text = $('#HS-input').val() as string;
    console.log($('#HS-input'));
    if (text === undefined) text = '';

    // 获取搜索类型
    const btnHtml = $('.HS-type-text').html();
    let type = '';
    switch (btnHtml) {
        case '影片':
            type = 'q';
            break;
        case '标签':
            type = 'tag'
            break;
        default:
            break;
    }
    if (text.trim().length === 0) { // 没有搜索内容直接跳转到 搜索页面
        window.location.href = 'search.html'
    } else {
        window.location.href = `search.html?${type}=${text}`;
    }
}


const bind = ()=>{
    // 修改键盘事件
    $('#HS-input').keydown((e)=>{
        if(e.keyCode === 13){
            search();
            e.preventDefault();
        }
    })
    // 点击搜索事件
    $('.HS-search-btn').on('click',search)

    // 下拉按钮切换效果
    $('.HS-type-item').on('click',(e)=>{
        const text = e.currentTarget.innerHTML
        $('.HS-type-text').html(text)
    })
}

export default {
    render:()=>temp(),
    init:bind,
}
