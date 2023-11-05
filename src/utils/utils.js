function randomNum(n){
    var res = "";
    for(var i=0;i<n;i++){
      res += Math.floor(Math.random()*10);
    }
    return res;
  }

function randomStr() {
	return randomNum(16)
}

export function timestamp() {
	var date = String(Date.parse(new Date()))
	return date
}

export function paramJquery() {
	return "jQuery182" + randomStr() + "_" + timestamp()
}

/* 解析 获取热门搜索 */
export function utils_parseHtml_to_hotSearch(html){
	let arrayA = html.match(/<a[^>]*>([\s\S]*?)<\/a>/g);
	let results = [];
	if (arrayA && arrayA.length > 0) {
	    results = arrayA.map(item => {
	        let array = item.match(/<a[^>]*>([\s\S]*?)<\/a>/);
			return array[1]
	    });
	}
	let index_ = results.indexOf('更多...')
	let index = results.indexOf('更多')
	let curIndex = 10
	if (index_ != -1) {
		curIndex = index_ + 1
	} 
	if (index != -1) {
		curIndex = index + 1
	}
	return results.slice(0, curIndex)
}

/* 解析 获取排行榜100 */
export function utils_parseHtml_to_rankList100(html) {
	let arr = html.split('title=\"')
	let that = this
	let result = arr.map(item => {
		let subArr = item.split('\";')
		return subArr[0]
	})
	return result.slice(1)
}
			
/* 判断字符串是否包含中文 */
export function utils_hasChinese(str) {
	return /[\u4E00-\u9FA5]+/g.test(str)
}

/* 判断字符串是否全是中文 */
export function utils_isAllChinese(str) {
	 return /^[\u4E00-\u9FA5]+$/.test(str)
}
