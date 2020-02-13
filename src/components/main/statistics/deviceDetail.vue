<template>
  <div class="isMargin">
    <div class="top-title-common"><h3>统计 > 设备概括 > 详情</h3></div>
    <div class="device-detail">
      <div class="device-content">
        <div class="status-all">
          <p><span>当前设备激活情况</span></p>
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
        <div class="status-all">
          <p><span>设备激活变化</span></p>
          <div class="status">
            <chart :params="params2"></chart>
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
    name: 'device-detail',
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
        params2:{
          name:'',
          data:{},
          style:{},
          list:["最近一个月","最近三个月","最近六个月"],
          class:'actived',
          random:0
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .device-detail {
    height: auto;
    overflow: hidden;
    width: 100%;
    background: white;
    margin-top: 16px;
    .device-content {
      margin: 16px;
      height: auto;
      overflow: hidden;
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
