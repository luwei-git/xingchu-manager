<template>
  <div class="isMargin">
    <div class="top-title-common"><h3>首页</h3></div>
    <div class="homePage">
      <div class="homePage-content">
        <div class="homePage-data">
          <p>测量数据</p>
          <ul>
            <li>共测量1234次</li>
            <li>今日测量22次</li>
          </ul>
        </div>
        <div class="status-all">
          <p><span>血糖测量情况</span></p>
          <div class="status">
            <chart :params="params"></chart>
          </div>
        </div>
        <div class="status-all">
          <p><span>设备数量变化</span></p>
          <div class="status">
            <chart :params="params1"></chart>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import baseMixin from '../../../components/mixin/BaseMixin'
  export default {
    mixins:[baseMixin],
    name: 'honePage',
    data(){
      return{
        params:{
          name:'当前设备激活情况',
          data:{},
          style:{},
          list:[],
          class:'status',
          random:0
        },
        params1:{
          name:'',
          data:{},
          style:{},
          list:["最近一个月","最近三个月","最近六个月"],
          class:'amount',
          random:0
        },
      }
    }
  }
</script>

<style lang="less" scoped>
  .homePage {
    height: auto;
    overflow: hidden;
    background: white;
    margin-top: 16px;
    .homePage-content{
      margin: 16px;
      height:auto;
      overflow: hidden;
      .homePage-data{
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
      .status-all{
        height: auto;
        overflow: hidden;
        border: 1px solid #f1f1f1;
        margin-bottom: 16px;
        border-radius: 8px;
        p{
          padding: 16px;
          span{
            border-bottom: 1px solid #f1f1f1;
            display: block;
            font-size: 16px;
            line-height: 16px;
            padding-bottom: 16px;
            padding-left: 10px;
          }
        }

        .status{
          height: 250px;
        }
      }
    }
  }
</style>
