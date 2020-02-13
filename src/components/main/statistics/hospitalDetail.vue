<template>
    <div class="hospitalStatisticsPage">
        <div class="contentTitleBottom">
            <div v-if="!!hospitalName" class="hosptalName">医院名称: {{hospitalName}}</div>
            <div class="contentStyle">
                <!-- 医院数据统计 -->
                <div class="statisticList">
                    <ul class="w100">
                        <li class="fl w25 h100 tac" v-for="(item, index) in hospitalStatistic" :key="index">
                            <div class="bottom"><span>{{item.sum}}</span>{{item.unit}}</div>
                            <div class="top">{{item.name}}</div>
                        </li>
                    </ul>
                </div>
                <div class="cutOffRule"></div>
                <!-- tab页切换 -->
                <eleTabChange :tabList="tabList"></eleTabChange>
                <selfTabChange :tabDate="tabDate1" :tabTitle="'时间选择'" :clickCallback="getHospitalStatisticByTime"></selfTabChange>
                <!-- 折线图 -->
                <div class="hospitalStatisticLineChart"></div>
                <div class="cutOffRule"></div>
                <!-- 第一个表格 -->
                <eleTable :tableData="orgStatisticData" :tableHeaderData="tableHeaderData1"></eleTable>
                <pagination></pagination>
                <div class="cutOffRule"></div>
                <!-- 第二个表格 -->
                <selfTabChange :tabDate="tabDate2" :tabTitle="'时间选择'" :clickCallback="getEveryHospitalStatistic"  :dateModelIsShow="true" :searchCallBack="searchCallBack"></selfTabChange>
                <eleTable :tableData="everyHospitalData" :tableHeaderData="tableHeaderDataHospitalStatistic2"></eleTable>
                <pagination
                    ref="pagination2"
                    :total="pagenationTotal2" 
                    :pageSize="tableColumnSize"
                    :currentChangeCallback="currentChangeCallback2"
                    v-on:paginationSizeChange="paginationSizeChange">
                </pagination>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .hosptalName{
        padding-left: 60px;
        margin-bottom: 10px;
        font-size: 18px;
    }
    .statisticList ul{
        height: 100px;
        line-height: 40px;
        padding-top: 20px;
        font-size: 18px;
    }
    .statisticList li span{
        color: #267bf7;
    }
    .hospitalStatisticLineChart{
        height: 500px;
    }
</style>
<script>
import chartModel from '../../../assets/js/chart'
import eleTable from '../../common/eleTable'
import eleTabChange from '../../common/eleTabChange'
import selfTabChange from '../../common/selfTabChange'
import pagination from '../../common/pagination'
import {tableHeaderData1, tableHeaderDataHospitalStatistic2} from '../../../config/hospitalStatistics'
import {hospitalStatisticModel} from '../../../api/hospitalStatistic'
import {formatDate} from '../../../utils/formatDate'
import eventBus from '../../../utils/eventBus'
export default {
    name:'hospitalDetail',
    data () {
        return {
            hospitalStatistic:[
                {type: 'totalDepartmentCount', name: '科室', sum: '', unit: '个'},
                {type: 'totalUserCount', name: '医护', sum: '', unit: '个'},
                {type: 'totalCustomerCount', name: '患者', sum: '', unit: '人'},
                {type: 'totalTestCount', name: '血糖测量数据', sum: '', unit: '次'}
            ],
            // 机构数据统计
            orgStatisticData: [],
            tableHeaderData1:[],
            tableHeaderDataHospitalStatistic2:[],
            // 每个医院数据统计
            everyHospitalData: [],
            tabList: [
                {label:'新增患者', name:'0'},
                {label:'总患者', name:'1'},
                {label:'新增血糖数据', name:'2'},
                {label:'总测量数据', name:'3'},
                {label:'购买设备数(个)', name:'4'},
                {label:'购买试纸数(盒)', name:'5'}
            ],
            tabDate1: ['天', '月度', '季度'],
            tabDate2: ['昨天', '最近7天', '最近30天', '最近90天'],
            yData: [],
            xData: [],
            eleTabCurrentIndex: 0, // ele tab 切换当前选中index
            initFlag: true, // 初进页面初始化折线图flag
            currentPage2: 1,
            tableColumnSize: 10,
            pagenationTotal2: 0, // 表格2数据总条数
            selfTabCurrentIndex2: 0,
            hospitalName: '',
            searchTime: {}
        }
    },
    methods: {
        // 获取机构数据统计
        getHospitalStatistic () {
            hospitalStatisticModel.getHospitalStatistic({hospitalId: this.$route.query.hospitalId}, res => {
                if (res.data.data.length > 0) {
                    this.hospitalStatistic.forEach(item => {
                        item.sum = res.data.data[0][item.type] || 0;
                    });
                }
            });
        },
        // 按时间类型获取医院折线图数据统计
        getHospitalStatisticByTime (item, index) {
            let tempObj = (index == 0 ? formatDate.getDays(30) : (index == 1 ? formatDate.getMoths(12): formatDate.getQuarters(8)));
            let data = {...tempObj, type: index+1,hospitalId: this.$route.query.hospitalId};
            // 折线图需要数据: 单位 , y轴数值 , x轴类目数组
            hospitalStatisticModel.getHospitalStatisticByTime(data, res => {
                let lineChartData = [];
                lineChartData = (lineChartData.concat(res.data.data)).reverse(); // 先concat , 不改变原数组 , 在反转
                this.handleOrgData(lineChartData);
                this.orgStatisticData = res.data.data;
                this.getLineChart(this.eleTabCurrentIndex);
            }, err => {

            })
        },
        // 按照天数获取机构下各个医院的表格数据分页统计
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
            let data = {...timeObj, type: 1, organizationId: this.$route.query.hospitalId, pageSize: this.tableColumnSize, currentPage: this.currentPage2};
            this.getHospitalStatisticPagenationByDay(data);
        },
        getHospitalStatisticPagenationByDay (data) {
            hospitalStatisticModel.getHospitalStatisticPagenationByDay(data, res => {
                this.everyHospitalData = res.data.data.items;
                this.pagenationTotal2 = res.data.data.totalNum;
            })
        },
        // 根据后台字段名获取折线图坐标轴轴数据
        getLineChartAxisData (string, data) {
            let tempArr = [];
            return tempArr = data.map(item => {
                return item[string];
            });
        },
        searchCallBack (timeObj) {
            this.currentPage2 = 1;
            this.$refs.pagination2.currentPage = 1;
            this.searchTime = timeObj;
            this.selfTabCurrentIndex2 = -1;
            let data = {...timeObj, type: 1, organizationId: this.$route.query.hospitalId, pageSize: this.tableColumnSize, currentPage: this.currentPage2};
            this.getHospitalStatisticPagenationByDay(data);
        },
        // 机构折线图部分统计数据处理
        handleOrgData (data) {
            this.yData = [];
            this.xData = [];
            this.yData.push(this.getLineChartAxisData('customerCount', data));
            this.yData.push(this.getLineChartAxisData('totalCustomerCount', data));
            this.yData.push(this.getLineChartAxisData('testCount', data));
            this.yData.push(this.getLineChartAxisData('totalTestCount', data));
            this.yData.push(this.getLineChartAxisData('saleDeviceCount', data));
            this.yData.push(this.getLineChartAxisData('salePaperCount', data));
            this.xData = this.getLineChartAxisData('title', data);
            if (this.initFlag) {
                this.initFlag = false;
                this.getLineChart(0);
            }
        },
        // element tab切换回调
        eleTabChangeCallBack (index) {
            this.eleTabCurrentIndex = index;
            this.getLineChart(index);
        },
        // 生成折线图
        getLineChart (index) {
            let lineChartDom = document.getElementsByClassName('hospitalStatisticLineChart')[0];
            let containerDom = document.getElementsByClassName('contentStyle')[0];
            let options = {
                xData: this.xData,
                yData: this.yData[index]
            }
            chartModel.creatLinchart(lineChartDom, containerDom, options);
        },
        // 第二个分页当前也发生变化回调 , 包括点击上一页和下一页和去人按钮
        currentChangeCallback2 (currentPage) {
            this.currentPage2 = currentPage;
            if (this.selfTabCurrentIndex2 != -1) { // 当不是-1时是tab切换时的分页 , 是-1时是搜索时的分页
                this.getEveryHospitalStatistic('天', this.selfTabCurrentIndex2);                
            } else {
                let data = {...this.searchTime, type: 1, organizationId: this.$route.query.hospitalId, pageSize: this.tableColumnSize, currentPage: this.currentPage2};
                this.getHospitalStatisticPagenationByDay(data);
            }
        },
        paginationSizeChange (size) {
            this.tableColumnSize = size;
            this.getEveryHospitalStatistic('天', this.selfTabCurrentIndex2);
        }
    },
    created () {
        this.tableHeaderData1 = tableHeaderData1;
        this.tableHeaderDataHospitalStatistic2 = tableHeaderDataHospitalStatistic2;
        this.getHospitalStatistic();
        eventBus.$emit('setBreadcrumbs', '统计', '医院详情');
        this.getHospitalStatisticByTime('天', 0);
        this.getEveryHospitalStatistic('天', 0);
        this.hospitalName = this.$route.query.hospitalName[0].name;
    },
    components: {
        eleTable,
        eleTabChange,
        selfTabChange,
        pagination
    }
}
</script>
