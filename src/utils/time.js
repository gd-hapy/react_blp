export function getCurrentDate() {
    let date = new Date()
    const weekDays = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return date.getFullYear() + "-" + (date.getMonth()+1).toString().padStart(2, '0') + "-" + (date.getDate().toString()).padStart(2, '0') + '   ' + weekDays[date.getDay()]

}

export function getCurrentTime() {
    let date = new Date()
    return date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ':' + date.getSeconds().toString().padStart(2, '0')
}