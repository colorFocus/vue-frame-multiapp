//new Date(value).format("yyyy-MM-dd hh:mm:ss")
//new Date(value).format("yyyy-MM-dd")
Date.prototype.format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

/**
 * 超过3天显示日期,少于一天显示今天
 */
Date.prototype.fromNoww = function (today) {
    let now = new Date().getTime();
    let last = this.getTime();
    let dif = now - last;
    if (dif > 1000 * 60 * 60 * 24 * 3) { // 1000 milliseconds
        return this.format("yyyy年MM月dd日 ");
    }
    if (dif < 1000 * 60 * 60 * 24) {
        if (this.getDate() == new Date().getDate()) {
            return "今天 ";
        } else {
            return "昨天 ";
        }

    }
    if (dif < 1000 * 60 * 60 * 24 * 2) {
        if (this.getDate() == new Date().getDate() - 1) {
            return "昨天 ";
        }
    }
    if (dif < 1000 * 60 * 60 * 24 * 3) {
        if (this.getDate() == new Date().getDate() - 2) {
            return "前天 ";
        }
    }
    return this.fromNow(this);
}

export default {
    /**
     * 将指定时间偏移几小时
     * @param time {String} 指定时间，例："2018-01-24 17:00"
     * @param offset {Number} 偏移量，正数代表加几小时，负数代表减几小时，例：1
     * @param pattern {String} 返回时间的格式，例："yyyy-MM-dd HH:mm"
     * @returns {String} 返回计算后的时间，如："2018-01-24 18:00"
     */
    offsetHours(time, offset, pattern) {
        let date = new Date(Date.parse(time));
        let yyyy = date.getFullYear();
        let MM = date.getMonth();
        let dd = date.getDate();
        let HH = date.getHours() + offset;
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        return this.timeFormat(new Date(yyyy, MM, dd, HH, mm, ss), pattern);
    },
    /**
     * 将指定月份偏移几个月
     * @param month {String} 指定月份，例："2018-01"
     * @param offset {Number} 偏移量，负数代表上几个月，正数代表下几个月，例：1
     * @returns {String} 返回计算后的月份，如："2018-02"
     */
    offsetMonths(_month, offset) {
        let date = new Date(Date.parse(_month));
        let year = date.getFullYear();
        let month = date.getMonth();
        let preOrNextMonth = month + offset;
        return this.timeFormat(new Date(year, preOrNextMonth), "yyyy-MM");
    },
    /**
     * 获取指定日期是星期几
     * @param date {String} 指定日期,例："2018-01-23"
     * @returns {Number} 返回星期几(1-7)，如：2
     */
    dayOfWeek(date) {
        let time = new Date(Date.parse(date));
        let weekday = new Array(7);
        weekday[0] = 7;
        weekday[1] = 1;
        weekday[2] = 2;
        weekday[3] = 3;
        weekday[4] = 4;
        weekday[5] = 5;
        weekday[6] = 6;
        return weekday[time.getDay()];
    },
    /**
     * 获取指定月份有多少天
     * @param month {String} 指定月份：例"2018-01"
     * @returns {number} 返回指定月份有多少天，如：31
     */
    daysInMonth(_month) {
        let date = new Date(Date.parse(_month));
        let year = date.getFullYear();
        let month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    }
}