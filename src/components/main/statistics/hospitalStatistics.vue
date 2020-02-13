<template>
    <div class="hospitalStatisticsPage">
        <div class="contentTitleBottom">
            <!-- 医院数据统计 -->
            <div class="statisticList">
                <ul class="w100">
                    <li class="fl w25 h100 tac" v-bind:style="{ background: item.color }" v-for="(item, index) in hospitalStatistic" :key="index">
                        <div class="bottom"><span>{{item.sum}}</span></div>
                        <div class="top"><i :class="item.class"></i>{{item.name}}({{item.unit}})</div>
                    </li>
                </ul>
            </div>
            <div class="contentStyle">
                <!-- tab页切换 -->
                <eleTabChange :tabList="tabList"></eleTabChange>
                <selfTabChange :tabDate="tabDate1" :tabTitle="'时间选择'" :clickCallback="getOrgStatisticByTime"></selfTabChange>
                <!-- 折线图 -->
                <div class="hospitalStatisticLineChart"></div>
                <div class="cutOffRule"></div>
                <!-- 第一个表格 -->
                <eleTable :tableData="orgStatisticData" :tableHeaderData="tableHeaderData1"></eleTable>
                <pagination
                    :total="pagenationTotal1"
                    :pageSize="tableColumnSize"
                    :currentChangeCallback="currentChangeCallback1"
                    v-on:paginationSizeChange="paginationSizeChange"
                    ref="pagination1">
                </pagination>
                <div class="cutOffRule"></div>
                <!-- 第二个表格 -->
                <selfTabChange :tabDate="tabDate2" :tabTitle="'时间选择'" :clickCallback="getEveryHospitalStatistic" :dateModelIsShow="true" :searchCallBack="searchCallBack"></selfTabChange>
                <eleTable :tableData="everyHospitalData" :tableHeaderData="tableHeaderData2" :callbackObj="callbackObj"></eleTable>
                <pagination
                    :total="pagenationTotal2"
                    :pageSize="tableColumnSize2"
                    :currentChangeCallback="currentChangeCallback2"
                    v-on:paginationSizeChange="paginationSizeChange2"
                    ref="pagination2">
                </pagination>
            </div>
        </div>
    </div>
</template>
<script>
import chartModel from '../../../assets/js/chart'
import eleTable from '../../common/eleTable'
import eleTabChange from '../../common/eleTabChange'
import selfTabChange from '../../common/selfTabChange'
import pagination from '../../common/pagination'
import {tableHeaderData1, tableHeaderData2} from '../../../config/hospitalStatistics'
import {hospitalStatisticModel} from '../../../api/hospitalStatistic'
import {formatDate} from '../../../utils/formatDate'
import eventBus from '../../../utils/eventBus'
export default {
    name:'hospitalStatistics',
    data () {
        return {
            hospitalStatistic:[
                {type: 'hospitalCount', name: '医院', sum: '', unit: '个', color: '#79ADF8',class: 'hospital_icon'},
                {type: 'userCount', name: '医护', sum: '', unit: '个', color: '#F3B88C',class: 'care_icon'},
                {type: 'customerCount', name: '患者人数', sum: '', unit: '人', color: '#AC94E0',class: 'patient_icon'},
                {type: 'testCount', name: '血糖测量数据', sum: '', unit: '次', color: '#71DEBF',class: 'suger_icon'}
            ],
            // 机构数据统计
            orgStatisticData: [],
            tableHeaderData1:[],
            tableHeaderData2:[],
            // 每个医院数据统计
            everyHospitalData: [],
            tabList: [
                {label:'新增患者', name:'0'},
                {label:'总患者', name:'1'},
                {label:'新增血糖数据', name:'2'},
                {label:'总测量数据', name:'3'},
            ],
            tabDate1: ['天', '月度', '季度'],
            tabDate2: ['昨天', '最近7天', '最近30天', '最近90天'],
            yData: [],
            xData: [],
            eleTabCurrentIndex1: 0, // ele tab 切换当前选中index
            selfTabCurrentIndex: 0, // self tab 切换当前选中index
            initFlag: true, // 初进页面初始化折线图flag
            tableColumnSize: 10,
            tableColumnSize2: 10, // 本页表格展示条数 , 分页条数和请求数据pageSize都用此数据
            currentPage: 1, // 表格1数据当前页
            pagenationTotal1: 0, // 表格1数据总条数
            currentPage2: 1, // 表格2数据当前页
            pagenationTotal2: 0, // 表格2数据总条数
            selfTabCurrentIndex2: 0,
            callbackObj: {hospitalName: [this.eleTableClickCallback]},
            searchTime: {} // 搜索时间缓存 , 用于搜索时的分页切换
        }
    },
    methods: {
        // 获取机构数据统计
        getOrgStatistic () {
            hospitalStatisticModel.getOrganizitionStatistic({}, res => {
                if (res.data.data.length > 0) {
                    this.hospitalStatistic.forEach(item => {
                        item.sum = res.data.data[0][item.type] || 0;
                    });
                }
            });
        },
        // 按时间类型获取机构折线图数据统计
        getOrgStatisticByTime (item, index) {
            this.currentPage1 = 1; // 切换自定义tab标签重置当前请求页
            if (this.$refs.pagination1) {
                this.$refs.pagination1.currentPage = 1;
            }
            this.selfTabCurrentIndex = index;
            let tempObj = (index == 0 ? formatDate.getDays(30) : (index == 1 ? formatDate.getMoths(12): formatDate.getQuarters(8)));
            let data = {...tempObj, type: index+1};
            // 折线图需要数据: 单位 , y轴数值 , x轴类目数组
            hospitalStatisticModel.getOrgStatisticByTime(data, res => {
                this.handleOrgData(res.data.data);
                this.getLineChart(this.eleTabCurrentIndex1);
            })
            // currentPage是否要置为1?
            this.getOrgStatisticTablePagenation(item, index);
        },
        // 按照时间获取机构表格分页统计数据
        getOrgStatisticTablePagenation (item, index) {
            let tempObj = (index == 0 ? formatDate.getDays(30) : (index == 1 ? formatDate.getMoths(12): formatDate.getQuarters(8)));
            let data = {...tempObj, type: index+1, pageSize: this.tableColumnSize, currentPage: this.currentPage};
            hospitalStatisticModel.getOrgStatisticPagenation (data, res => {
                this.orgStatisticData = res.data.data.items;
                this.pagenationTotal1 = res.data.data.totalNum;
            })
        },
        // 按照天数获取机构下各个医院的表格分页数据统计
        getEveryHospitalStatistic (item, index) {
            if (this.selfTabCurrentIndex2 != index) {
                this.selfTabCurrentIndex2 = index;
                this.currentPage2 = 1; // 切换自定义tab标签重置当前请求页
                if (this.$refs.pagination2) {
                    this.$refs.pagination2.currentPage = 1;
                }
            }
            let tempObj = [1, 7, 30, 90];
            let timeObj = formatDate.getDays(tempObj[index]);
            let data = {...timeObj, type: 1, pageSize: this.tableColumnSize2, currentPage: this.currentPage2};
            this.getHospitalStatisticPagenation(data);
        },
        getHospitalStatisticPagenation (data) {
            hospitalStatisticModel.getHospitalStatisticPagenation(data, res => {
                this.everyHospitalData = [];
                if (!!res.data.data.items && res.data.data.items.length > 0) {
                    res.data.data.items.forEach(item => {
                        item.hospitalName = [{name: item.hospitalName, disabled: false}];
                        this.everyHospitalData.push(item);
                    });
                }
                this.pagenationTotal2 = res.data.data.totalNum;
            });
        },
        searchCallBack (timeObj) {
            this.currentPage2 = 1;
            this.$refs.pagination2.currentPage = 1;
            this.searchTime = timeObj;
            this.selfTabCurrentIndex2 = -1;
            let data = {...timeObj, type: 1, pageSize: this.tableColumnSize2, currentPage: this.currentPage2};
            this.getHospitalStatisticPagenation(data);
        },
        // 根据后台字段名获取折线图坐标轴轴数据
        getLineChartAxisData (string, data) {
            let tempArr = [];
            return tempArr = data.map(item => {
                return item[string];
            });
        },
        // 机构折线图部分统计数据处理
        handleOrgData (data) {
            this.yData = [];
            this.xData = [];
            this.yData.push(this.getLineChartAxisData('customerCount', data));
            this.yData.push(this.getLineChartAxisData('totalCustomerCount', data));
            this.yData.push(this.getLineChartAxisData('testCount', data));
            this.yData.push(this.getLineChartAxisData('totalTestCount', data));
            this.xData = this.getLineChartAxisData('title', data);
            if (this.initFlag) {
                this.initFlag = false;
                this.getLineChart(0);
            }
        },
        // element tab切换回调
        eleTabChangeCallBack (index) {
            this.eleTabCurrentIndex1 = index;
            this.getLineChart(index);
        },
        // 生成折线图
        getLineChart (index) {
            //var arr = [1,4,6,0.7,45,8,2,12,30,22,34,12,14,1,4,6,0.7,45,8,2,12,30,22,34,12,14,20,19,6];  测试数据
            let lineChartDom = document.getElementsByClassName('hospitalStatisticLineChart')[0];
            let containerDom = document.getElementsByClassName('contentStyle')[0];
            let options = {
                xData: this.xData,
                yData: this.yData[index]
                //yData: arr
            }
            chartModel.creatLinchart(lineChartDom, containerDom, options);
        },
        // 第二个表格回调
        eleTableClickCallback (row, index) {
            this.$router.push({path: '/hospitalDetail', query: {hospitalId: row.hospitalId, hospitalName: row.hospitalName}});
        },
        // 第一个分页当前也发生变化回调 , 包括点击上一页和下一页和去人按钮
        currentChangeCallback1 (currentPage) {
            this.currentPage = currentPage;
            this.getOrgStatisticTablePagenation('天',this.selfTabCurrentIndex);
        },
        // 第二个分页当前也发生变化回调 , 包括点击上一页和下一页和去人按钮
        currentChangeCallback2 (currentPage) {
            this.currentPage2 = currentPage;
            if (this.selfTabCurrentIndex2 != -1) { // 当不是-1时是tab切换时的分页 , 是-1时是搜索时的分页
                this.getEveryHospitalStatistic('天',this.selfTabCurrentIndex2);
            } else {
                let data = {...this.searchTime, type: 1, pageSize: this.tableColumnSize2, currentPage: this.currentPage2};
                this.getHospitalStatisticPagenation(data);
            }
        },
        paginationSizeChange (size) {
            this.tableColumnSize = size;
            this.getOrgStatisticTablePagenation('天',this.selfTabCurrentIndex);
        },
        // 切换分页显示条数回调
        paginationSizeChange2 (size) {
            this.tableColumnSize2 = size;
            this.getEveryHospitalStatistic('天',this.selfTabCurrentIndex2);
        }
    },
    created () {
        this.tableHeaderData1 = tableHeaderData1;
        this.tableHeaderData2 = tableHeaderData2;
        eventBus.$emit('setBreadcrumbs', '统计', '医院统计');
        this.getOrgStatistic();
        // 组件默认返回列表项item , 所以初始化先传一个默认的 天
        this.getOrgStatisticByTime('天', 0);
        // 初始化表格数据
        this.getOrgStatisticTablePagenation('天', 0);
        this.getEveryHospitalStatistic('天', 0);
    },
    components: {
        eleTable,
        eleTabChange,
        selfTabChange,
        pagination
    }
}
</script>
<style scoped lang="less" type="text/less">
  .statisticList ul{
    height: 120px;
    line-height: 40px;
    color: white;
    margin-bottom: 0.35rem;
    li{
      width: 23%;
      margin: 0 1%;
      border-radius: 6px;
      .bottom{
        margin-top: 20px;
        span{
          font-size: 35px;
        }
      }
      .top{
        font-size: 16px;
        i{
          background: url("../../../assets/images/login/icon.png") no-repeat;
          height: 17px;
          width: 16px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
        }
        i.hospital_icon{
          background-position: -34px 0px;
        }
        i.care_icon{
          background-position: -34px -85px;
        }
        i.patient_icon{
          background-position: -34px -16px;
        }
        i.suger_icon{
          background-position: -33px -33px;
        }
      }
    }
    li:first-child{
        margin-left: 1.5%;
    }
    li:last-child{
        margin-right: 0;
    }
  }
  .hospitalStatisticLineChart{
    height: 500px;
  }
</style>
