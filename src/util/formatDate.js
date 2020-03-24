// 日期格式化
const format = {
  // 获取指定日期的那一周的开始、结束日期
  getDate: (date) => {
    var now = ''
    if (date) {
      now = new Date(date)
    } else {
      now = new Date()
    }
    let nowDayOfWeek = now.getDay() // 本周的第几天
    let nowDay = now.getDate() // 当前日
    let nowMonth = now.getMonth() // 当前月
    let nowYear = now.getFullYear() // 当前年

    var dataArr = []
    for (var i = 0; i < 7; i++) {
      var format = new Date(nowYear, nowMonth, nowDay + i)
      var myyear = format.getFullYear()
      var mymonth = format.getMonth() + 1
      var myweekday = format.getDate()
      if (mymonth < 10) {
        mymonth = '0' + mymonth
      }
      if (myweekday < 10) {
        myweekday = '0' + myweekday
      }

      var week = ''
      var isToday = false
      switch (new Date(nowYear, nowMonth, nowDay + i).getDay()) {
        case 0:
          week = '星期天'
          break
        case 1:
          week = '星期一'
          break
        case 2:
          week = '星期二'
          break
        case 3:
          week = '星期三'
          break
        case 4:
          week = '星期四'
          break
        case 5:
          week = '星期五'
          break
        case 6:
          week = '星期六'
      }

      if (now.getDay() == format.getDay() && nowDay == myweekday) {
        week = '今天'
        isToday = true
      }

      dataArr.push({
        date: mymonth + '-' + myweekday,
        week: week,
        isToday: isToday,
        data: myyear + '-' + mymonth + '-' + myweekday
      })
    }
    console.log('星期', dataArr)
    return dataArr
  },
}

module.exports = {
  format
}
