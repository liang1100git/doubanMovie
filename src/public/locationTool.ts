const  getSearch = ()=>{
    const str = location.search.replace('?','');
    const arr = str.split('&');
    let json = {};
    arr.forEach((val)=>{
        let i = val.split('=');
        json[i[0]] = i[1];
    })
    return json;
}

export default {
    getSearch:getSearch,
}