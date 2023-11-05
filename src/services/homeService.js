import request from "../api/request";
import { RequestApi_Home } from "../api/reuqestApi";
import { storage_get_hotSearchData, storage_get_rankData, storage_save_hotSearchData, storage_save_rankData } from "../utils/storage";
import { utils_parseHtml_to_hotSearch, utils_parseHtml_to_rankList100 } from "../utils/utils";

// 热门搜索数据 API
export function getHomeRequestData() {
    return new Promise((resolve, reject) => {
        let now = new Date()
        if (now.getDate() % 10 == 0) {
            _getHomeData().then((res) => {
                resolve(res)
            })
        } else {
            let searchData = storage_get_hotSearchData()
            let rankData = storage_get_rankData()
            if ((searchData != null && searchData.length > 0) && (rankData != null && rankData.length > 1)) {

                resolve(searchData)
            } else {
                _getHomeData().then((res) => {
                    resolve(res)
                })
            }
        }
    });
}

function _getHomeData() {
    return new Promise((resolve, reject) => {
        request.get(RequestApi_Home()).then((res) => {
            let hotSearch = utils_parseHtml_to_hotSearch(res)
            hotSearch.unshift('热门搜索：')
            storage_save_hotSearchData(hotSearch)
            let rankList = utils_parseHtml_to_rankList100(res)
            storage_save_rankData(rankList)

            resolve(hotSearch)
        })
    });
}