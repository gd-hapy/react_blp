import request from "../api/request"
import { RequestApi_SearchResults, RequestApi_VideoPlayer, RequestApi_VideoPlayer_parsePlayingUrl } from "../api/reuqestApi"

export function getVideoInfo(flag, id) {
    return new Promise((resolve, reject) => {
        request.get(RequestApi_VideoPlayer(flag, id)).then((res) => {
            if (res == undefined) return
            debugger
			let dataStr = "{" + res.split('({')[1].split('})')[0] + "}"
			let result = JSON.parse(dataStr)
            if (result['code'] === 0) {
                resolve(result)
            } else {
                resolve(null)
            }
        })
    })
}

export function parseVideoPlaingUrl(url) {
    return new Promise((resolve, reject) => {
        request.get(RequestApi_VideoPlayer_parsePlayingUrl2(url)).then((res) => {
            if (res == undefined) return
            let url = res['url']
            resolve(url)
        })
    })
}