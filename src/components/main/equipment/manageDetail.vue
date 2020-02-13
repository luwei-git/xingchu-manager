<template>
  <div class="isMargin">
    <div class="top-title-common"><h3>设备 > 设备管理 > 设备详情</h3></div>
    <div class="manage-detail">
      <div class="manage-content">
        <el-button style="position: absolute;right: 50px; top:-5px;" @click="goback" type="primary" size="small"> 返 回 </el-button>
        <div class="basic-info">
          <p>基本信息</p>
          <ul>
            <li><label for="">所属机构：</label><span>双平泰医疗科技有限公司</span></li>
            <li><label for="">设备IMEI：</label><span>864214018247496</span></li>
            <li><label for="">设备SN：</label><span>s2861708001082</span></li>
            <li><label for="">流量卡号：</label><span>89860116709010309548</span></li>
            <li><label for="">硬件版本：</label><span>s286</span></li>
            <li><label for="">软件版本：</label><span>S286_19B1_99_V1.1.5.738</span></li>
            <li><label for="">激活时间：</label><span>2017-05-17 18:07:18</span></li>
          </ul>
        </div>
        <div class="life-track basic-info">
          <p>生命轨迹</p>
          <el-steps class="life-line" align-center>
            <el-step title="激活"></el-step>
            <el-step title="出货"></el-step>
            <el-step title="备案"></el-step>
          </el-steps>
        </div>
        <div class="basic-info">
          <p>测量数据</p>
          <ul>
            <li>共测量1234次</li>
            <li>今日测量22次</li>
          </ul>
        </div>
        <div class="devic-de">
          <chart :params="params1"></chart>
        </div>
        <div class="chart-su">
          <chart :params="params"></chart>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
  import baseMixin from '../../../components/mixin/BaseMixin'
  export default {
    mixins:[baseMixin],
    name: 'manage-detail',
    data(){
      return{
        params1:{
          name:'',
          data:{},
          style:{},
          list:["最近一个月","最近三个月","最近六个月"],
          class:'deviceDetail',
          random:0
        },
        params:{
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
  .manage-detail {
    background: white;
    height: auto;
    overflow: hidden;
    width: 100%;
    margin-top: 16px;
    .manage-content {
      margin: 16px;
      .devic-de,.chart-su{
        height: 300px!important;
        border: 1px solid #f1f1f1;
        margin-bottom: 16px;
      }
      .basic-info {
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
      .life-track {
        .life-line {
          margin-top: 34px;
        }
      }
    }
  }
</style>
