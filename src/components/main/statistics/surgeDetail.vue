<template>
  <div class="isMargin">
    <div class="top-title-common"><h3>统计 > 血糖数据 > 详情</h3></div>
    <div class="surge-detail">
      <div class="surge-content">
        <el-button style="position: absolute;right: 50px; top:-5px;" @click="goback" type="primary" size="small"> 返 回 </el-button>
        <div class="surge-data">
          <p>测量数据</p>
          <ul>
            <li>共测量1234次</li>
            <li>今日测量22次</li>
          </ul>
        </div>
        <div class="surge-data surge-chart">
          <chart :params="params"></chart>
        </div>
        <div class="surge-chart surge-data">
          <chart :params="params1"></chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import baseMixin from '../../../components/mixin/BaseMixin'
  export default {
    mixins:[baseMixin],
    name: 'surge-detail',
    data(){
      return{
        params:{
          name:'',
          data:{},
          style:{},
          list:["最近一个月","最近三个月","最近六个月"],
          class:'amount',
          random:0
        },
        params1:{
          name:'',
          data:{},
          style:{},
          list:["最近一个月","最近三个月","最近六个月"],
          class:'suger',
          random:0
        }
      }
    },
    methods:{
      goback(){

      }
    }
  }
</script>

<style lang="less" scoped>
  .surge-detail{
    height: auto;
    overflow: hidden;
    background: white;
    margin-top: 16px;
    .surge-content{
      margin: 16px;
      height: auto;
      overflow: hidden;
      .surge-chart{
        height: 300px!important;
      }
      .surge-data{
        border: 1px solid #f1f1f1;
        height: auto;
        overflow: hidden;
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 16px;
        p {
          font-size: 16px;
          line-height: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f1f1f1;
          padding-left: 10px;
        }
        ul {
          margin-top: 10px;
          height: auto;
          overflow: hidden;
          li {
            float: left;
            width: 25%;
            line-height: 30px;
            font-size: 14px;
          }
        }
      }

    }
  }

</style>
