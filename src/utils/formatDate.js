let moment = require('moment');
let dayUnix = 86400000; // 1 * 24 * 60 * 60 * 1000

export const formatDate = {
    // 获取从number天之前到当天的时间段
    getDays (number) {
        let startTime = moment().subtract(number, 'days').format('YYYY-MM-DD') + ' 00:00:00';
        let endTime = moment().subtract(1, 'days').format('YYYY-MM-DD') + ' 23:59:59';
        return {startTime: startTime, endTime: endTime};
    },
    // 获取number月之前到当前月的最后一天的时间段
    getMoths (number) {
        let startTime = moment().subtract(number - 1, 'month').format('YYYY-MM') + '-01 00:00:00';
        let endTime = moment().endOf('month').format('YYYY-MM-DD') + ' 23:59:59';
        return {startTime: startTime, endTime: endTime};
    },
    // 获取number季度之前的第一天到本季度的最后一天时间段
    getQuarters (number) {
        let currentYear = moment().format('YYYY');
        let currentMoth = moment().format('MM'); // 当前月份
        let lastMoth = Math.ceil(currentMoth/3) * 3; // 获取当前季度最后一月
        let thisQuartersFirstDay = currentYear + '-' + lastMoth + '-01'; // 当前季度的最后一个月的第一天
        let str = moment(thisQuartersFirstDay).endOf('month').format('YYYY-MM-DD'); //获取当季度最后一天的字符串
        // 说明: number * 3 - 1 , 当前季度最后月有一个月 , 所以少往前推一个月
        let startTime = moment(str).add(lastMoth - currentMoth ,'month').subtract(number * 3 - 1, 'month').format('YYYY-MM') + '-01 00:00:00';
        let endTime = str + ' 23:59:59';
        return {startTime: startTime, endTime: endTime};
    },
    // 时间戳转日期
    getDate (unix, format) {
        let day = moment.unix(unix.toString().substring(0, 10));
        return moment(day).format(format);
    },
    // 格式化日期
    getFormatDate (value, format) {
        return moment(value).format(format);
    }
}