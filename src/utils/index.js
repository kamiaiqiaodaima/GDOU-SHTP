//cookie操作
export function setCookie(key, val, iday) {
    var date = new Date();
    date.setDate(date.getDate() + iday);
    document.cookie = key + '=' + val + ';expires=' + date + ';path=/';
}
export function removeCookie(key) {//封装
    setCookie(key, '', -1);
}
export function lookCookie(key) {
    var str = document.cookie;
    var arr = str.split('; ');//注意分号后留空格
    for (let ele of arr) {
        var arr2 = ele.split('=');
        if (key == arr2[0]) {
            window.console.log(arr2[1]);
            return arr2[1];
        } else {
            window.console.log('没有你要的缓存');
        }
    }
}
//根据类别的英文转换成中文
export function translateType(type){
     switch (type){
        case 'digital':
           return '数码';
        case 'sports':
           return '运动';
        case 'books':
           return '书籍';
        case 'lives':
           return '生活用品';
        case 'traffic':
           return '交通工具';
        case 'dress_shoes':
           return '衣鞋';
        case 'music':
           return '音乐';
        case 'pet':
           return '宠物';
        case 'others':
           return '其它';
        default:
           return '其它';
     }
}
//格式化时间
export function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
}
//与现在时间比较大小
export function compareTime(val){
   var time = new Date(val).getTime();
   var now = new Date().getTime();
   window.console.log(val,time,now,time>now);
   return time>now;
}
export var uploadUrl = 'http://192.168.43.193:6325/products/upload';
export default {
    setCookie,
    removeCookie,
    lookCookie,
    translateType,
    dateFormat,
    compareTime,
    uploadUrl
}