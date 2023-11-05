import request from "../api/request"
import { RequestApi_SearchResults } from "../api/reuqestApi"

export function getSearchResultsData(word) {
    return new Promise((resolve, reject) => {
        request.get(RequestApi_SearchResults(word)).then((res) => {
            debugger
            if (res == undefined) return
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