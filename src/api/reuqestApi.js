import { storage_get_baseUrl, storage_save_baseUrl } from "../utils/storage"
import { paramJquery, timestamp } from "../utils/utils"

const kBaseURL0 = "https://jx.qqwtt.com/"
const kBaseURL1 = "https://movie.heheda.top/"
const kBaseURL2 = "https://www.pouyun.com/"
export const kBaseURL3 = "https://vip.bljiex.com/"


export function RequestApi_baseUrl() {
    return storage_get_baseUrl() || kBaseURL3
}

export function switchBaseUrl() {
    debugger
    let currentBaseUrl = RequestApi_baseUrl()
    let array = [kBaseURL0, kBaseURL1, kBaseURL2, kBaseURL3]
    let index= array.indexOf(currentBaseUrl)
    index += 1
    index = index % array.length
    let newUrl = array[index]
    storage_save_baseUrl(newUrl)
    // alert('已切换至:' + newUrl)
    // alert('已切换至最新')
    toastRef.show("已切换至最新!");
}

export function includesReferUrl(url) {
    var result = false
    if (url.includes(kBaseURL3)) {
        result = true
    }
    return result
}

export function RequestApi_Home() {
    // return RequestApi_baseUrl() + 'so.php'
    return kBaseURL2 + 'so.php'
}

export function RequestApi_SearchResults(word) {
    debugger
    let path = "api.php?out=jsonp&wd=" + word + "&cb=" + paramJquery() + "&_=" + timestamp()
    return RequestApi_baseUrl() + path
}

export function RequestApi_VideoPlayer(flag, id) {
    debugger
    let path = "api.php?out=jsonp&flag=" +flag + "&id=" + id + "&cb=" + paramJquery() + "&_=" + timestamp()
    return RequestApi_baseUrl() + path
}

export function RequestApi_VideoPlayer_parsePlayingUrl2(url) {
    return "https://json.2s0.cn:5678/home/api?type=ys&uid=812432&key=cdjmtvxyBDJKOTV027&url=" + url
}

export function RequestApi_VideoPlayer_parsePlayingUrl(url) {
    return "https://json.vipjx.cnow.eu.org/?url=" + url
}