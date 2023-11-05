const kStorage_html_key = "__kStorage_html_key__";
const kStorage_hotSearchData_key = "__kStorage_hotSearchData_key__";
const kStorage_rankData_key = "__kStorage_rankData_key__";
const kStore_baseUrl_key = "__kStore_baseUrl_key__";

import localStorage from "localStorage";

// 保存html文档
export function storage_save_html(htmlData) {
    localStorage.setItem(kStorage_html_key, htmlData)
}

// 获取html文档
export function storage_get_html() {
    return localStorage.getItem(kStorage_html_key)
}

// 保存 热门搜索数据
export function storage_save_hotSearchData(data) {
    localStorage.setItem(kStorage_hotSearchData_key, data)
}

// 获取 热门搜索数据
export function storage_get_hotSearchData() {
    let data = localStorage.getItem(kStorage_hotSearchData_key)
    if (data != null) {
        let arr = data.split(',')
        return arr
    }
    return null
}

// 保存 搜索排行榜数据
export function storage_save_rankData(data) {
    localStorage.setItem(kStorage_rankData_key, data)
}

// 获取 搜索排行榜数据
export function storage_get_rankData() {
    let data = localStorage.getItem(kStorage_rankData_key)
    if (data != null) {
        let arr = data.split(',')
        return arr
    }
    return null
}


// 保存 baseUrl
export function storage_save_baseUrl(baseUrl) {
    localStorage.setItem(kStore_baseUrl_key, baseUrl)
}

// 获取 baseUrl
export function storage_get_baseUrl() {
    return localStorage.getItem(kStore_baseUrl_key)
}