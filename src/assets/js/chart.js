/**
 * Created by yangying.
 */
import echarts from 'echarts'

var vm ;
var color = ['#627dd6','#3dbcdf','#eeb22e','#fc7325','#e84a49','#6b2b81'];
var axisLabel= {
    show: true,
    textStyle: {
        color: '#5bc5c5'
    },
};//折线图xy轴颜色颜色
var methods={
    min:function(array){
        for(var i = 0;i < array.length-1 ;i++){
            if(array[i] < array[i+1]){
                [array[i],array[i+1]]=[array[i+1],array[i]]
            }
        }
        return array[array.length - 1];
    },
    max:function(array){
        for(var i = 0;i < array.length-1 ;i++){
            if(array[i] > array[i+1]){
                [array[i],array[i+1]]=[array[i+1],array[i]]
            }
        }
        return array[array.length - 1];
    }
}
//管理
function deviceDetail(data,dom,vm) {
  var option = {
    color: ['#3398DB'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'直接访问',
        type:'bar',
        barWidth: '60%',
        data:[10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };
  var myChart =echarts.init(dom);
  myChart.setOption(option);
};
function suger(data,dom,vm) {
  var option = {
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'center',
      left: 'right',
      data: ['早餐前','早餐后','晚餐前','晚餐后']
    },
    series : [
      {
        name: '',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'早餐前'},
          {value:310, name:'早餐后'},
          {value:234, name:'晚餐前'},
          {value:135, name:'晚餐后'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  var myChart =echarts.init(dom);
  myChart.setOption(option);
};
//统计
function status(data,dom,vm) {
  var option = {
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'center',
      left: 'right',
      data: ['早餐前','早餐后','晚餐前','晚餐后']
    },
    series : [
      {
        name: '',
        type: 'pie',
        radius : '55%',
        center: ['50%', '40%'],
        data:[
          {value:335, name:'早餐前'},
          {value:310, name:'早餐后'},
          {value:234, name:'晚餐前'},
          {value:135, name:'晚餐后'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  var myChart =echarts.init(dom);
  myChart.setOption(option);
};
// 设备数量变化
function amount(data,dom,vm) {
  var option = {
    color: ['#3398DB'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'直接访问',
        type:'bar',
        barWidth: '60%',
        data:[10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };
  var myChart =echarts.init(dom);
  myChart.setOption(option);
};
// 设备激活变化
function actived(data,dom,vm) {
  var option = {
    color: ['#3398DB'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'直接访问',
        type:'bar',
        barWidth: '60%',
        data:[10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };
  var myChart =echarts.init(dom);
  myChart.setOption(option);
};
// 依据传入配置生成折线图
// 参数说明:
function creatLinchart (dom, containerDom, options) {
  let option = {
    title: {
      text: options.yData.length > 0 ? '' : '暂无数据',
      left: 'center'
    },
    color: ['#79ADF8'],
    xAxis: {
        type: 'category',
        data: options.xData,
        axisLine: {
          symbol: ['none', 'arrow']
        }
    },
    yAxis: {
        type: 'value',
        name: options.unit,
        axisLine: {
          symbol: ['none', 'arrow']
        }
    },
    series: [{
        data: options.yData,
        itemStyle: {normal: {areaStyle: {type: 'default'}}},
        type: 'line',
        smooth: true
    }]
  };
  var myChart = echarts.init(dom);
  myChart.setOption(option);
  window.onresize = function (){
    resizeChartContainer(dom, containerDom);
    myChart.resize();
  }
}
function resizeChartContainer (dom, containerDom) {
  dom.style.width = containerDom.innerWidth+'px';
}
export default {
  deviceDetail:deviceDetail,
  suger:suger,
  status:status,
  amount:amount,
  actived:actived,
  creatLinchart
}
