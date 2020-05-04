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
export default {
    setCookie,
    removeCookie,
    lookCookie
}