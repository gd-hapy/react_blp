import axios from "axios";
import { RequestApi_baseUrl, includesReferUrl, kBaseURL3 } from "./reuqestApi";

var baseURL = RequestApi_baseUrl()
class Request {
	constructor() {
		this.baseURL = this.baseURL; // 从环境变量中获取api地址
		this.timeout = 300000;
	}
	mergeOptions(options) {
		return {
			baseURL,
			timeout: 300000,
			...options,
		};
	}
	request(options) {
		const instance = axios.create();
		this.setInterceptors(instance);
		const opts = this.mergeOptions(options);
		return instance(opts);
	}
	get(url, data = {}, outHeaders = {}) {
		// console.log(data, "data+++++++++++++");
		// debugger
		// let _url = 'api/' + encodeURI(url)
		// this.baseURL = tm.state.base_url
		// debugger
		let _url = encodeURI(url)
		// debugger
		var headers = {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Access-Control-Allow-Origin':'*'
		}
		if (includesReferUrl(_url)) {
			headers = {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Access-Control-Allow-Origin':'*',
				'Referer': kBaseURL3	
			}
		}

		return this.request({
			dataType: "json",
			method: "get",
			url: _url,
			params: {
				...data
			}, // get参数可以直接展开
			headers: headers,
			// {
			// 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			// 	'Access-Control-Allow-Origin':'*',
			// 	'Referer': kBaseURL3,
			// 	// 'Content-Type':'application/x-www-form-urlencoded'
			// },
		});
	}
	post(url, data = {}, outHeaders = {}) {
		// 请求体中 {}
		// debugger
		const _url = encodeURI(url)
		return this.request({
			method: "post",
			url: _url,
			data, // post要求必须传入data属性
			headers: {},
		});
	}
	// 设置拦截器
	setInterceptors(instance) {
		// 请求拦截器
		instance.interceptors.request.use((config) => {
			// config.withCredentials = true;
			// uni.showLoading({
			// 	title: '加载中...'
			// })

			config.headers['Access-Control-Allow-Origin'] = '*';
			config.headers = {
				...config.headers,
			};
			return config;
		});
		// 响应拦截器
		instance.interceptors.response.use(
			(res) => {
				// debugger
				// uni.hideLoading();
				let {
					data
				} = res;
				// console.log("请求获取data", data)
				if (data) {
					//console.log('data=============', data)
					return Promise.resolve(data);
				} else {
					Promise.resolve(null)
				}
			},
			(err) => {
				console.error("axios报错", err);
				// debugger
				// uni.hideLoading();
				return Promise.reject(err);
			}
		);
	}
}
export default new Request();