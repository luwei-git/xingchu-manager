<template>
    <div class="homePage">
        <!--<div class="top-title-common"><h3>首页</h3></div>-->
        <div class="contentTitleBottom">
            <div class="statisticList">
                <ul class="w100">
                    <li class="fl h100 tac" v-bind:style="{ background: item.color }" v-for="(item, index) in hospitalStatistic" :key="index">
                        <div class="bottom"><span>{{item.sum}}</span></div>
                        <div class="top"><i :class="item.class"></i>{{item.name}}({{item.unit}})</div>
                    </li>
                </ul>
            </div>
            <div class="contentStyle">
                <div class="cutOffRule"></div>
                <eleTable :tableData="orgStatisticData" :tableHeaderData="tableHeaderData3" :callbackObj="callbackObj"></eleTable>
                <!-- <pagination
                    :total="pagenationTotal"
                    :pageSize="tableColumnSize"
                    :currentChangeCallback="currentChangeCallback2">
                </pagination> -->
            </div>
        </div>
    </div>
</template>
<script>
import eleTable from '../../common/eleTable'
import {tableHeaderData3} from '../../../config/homePage'
import {hospitalStatisticModel} from '../../../api/hospitalStatistic'
import pagination from '../../common/pagination'
export default {
    data () {
        return {
            hospitalStatistic:[
                {type: 'hospitalCount', name: '医院', sum: '', unit: '个', color: '#79ADF8',class: 'hospital_icon'},
                {type: 'customerCount', name: '患者人数', sum: '', unit: '人', color: '#F3B88C',class: 'patient_icon'},
                {type: 'testCount', name: '血糖测量数据', sum: '', unit: '次', color: '#AC94E0',class: 'suger_icon'},
                {type: 'saleDeviceCount', name: '出售设备总数', sum: '', unit: '台', color: '#71DEBF', class: 'equipment_icon'},
                {type: 'salePaperCount', name: '出售试纸总数', sum: '', unit: '盒', color: '#FB789A', class: 'paper_icon'}
            ],
            orgStatisticData: [],
            tableHeaderData3: [],
            currentPage: 1,
            tableColumnSize: 15,
            pagenationTotal: 0,
            callbackObj: {hospitalName: [this.eleTableClickCallback]}
        }
    },
    methods: {
        // 获取机构统计
        getStatistic () {
            hospitalStatisticModel.getOrganizitionStatistic({}, res => {
                if (res.data.data.length > 0) {
                    this.hospitalStatistic.forEach(item => {
                        item.sum = res.data.data[0][item.type] || 0;
                    });
                }
            });
        },
        // 获取各个医院分页统计
        getHospitalStatistic () {
            // 后台bug , pageSize为1不起作用
            hospitalStatisticModel.getHospitalList({pageSize: this.tableColumnSize, currentPage: this.currentPage}, res => {
                res.data.data.forEach(item => {
                    item.hospitalName = [{name: item.hospitalName, disabled: false}];
                        this.orgStatisticData.push(item);
                });
            })
        },
        currentChangeCallback2 (currentPage) {
            this.currentPage = currentPage;
            this.getHospitalStatistic();
        },
        eleTableClickCallback (row, index) {
            console.log(row);
            this.$router.push({path: '/hospitalDetail', query: {hospitalId: row.hospitalId, hospitalName: row.hospitalName}});
        },
    },
    components: {
        eleTable,
        pagination
    },
    created () {
        this.tableHeaderData3 = tableHeaderData3;
        this.getStatistic();
        this.getHospitalStatistic();
    }
}
</script>
<style scoped lang="less" type="text/less">
  .statisticList ul{
    height: 120px;
    line-height: 40px;
    color: white;
    margin-bottom: 0.35rem;
  }
  .statisticList ul li{
    width: 18%;
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
      i.patient_icon{
        background-position: -34px -16px;
      }
      i.suger_icon{
        background-position: -33px -33px;
      }
      i.equipment_icon{
        background-position: -33px -50px;
      }
      i.paper_icon{
        background-position: -34px -68px;
      }
    }
  }
  .statisticList ul li:first-child{
      margin-left: 1.5%;
  }
  .statisticList ul li:last-child{
      margin-right: 0;
  }
</style>
