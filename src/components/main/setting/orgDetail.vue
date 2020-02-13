<template>
  <div class="container-detail">
    <div class="container-left">
      <span>企业名称：{{organName}}</span>
      <span>营业执照注册号：{{businessLicenceCode}}</span>
    </div>
    <img :src="businessLicenceUrl"/>
  </div>
</template>

<script>
  import ElForm from "element-ui/packages/form/src/form";
  import ElButton from "element-ui/packages/button/src/button";
  import {userModel} from "../../../api/userApi"
  import {orgModel} from "../../../api/orgApi"
  import {Cookie} from "../../../utils/cookie";
  export default {
    components: {
      ElButton,
      ElForm
    },
    name: 'org-setting',
    data() {
      return {
        organName: '',
        businessLicenceCode: '',
        businessLicenceUrl: '',
      };
    },
    methods: {},
    created(){
      const _this = this;
      orgModel.queryByOrganId(Cookie.get(Cookie.organIdKey), function(res){
        _this.organName = res.data.data.organName;
        _this.businessLicenceCode = res.data.data.businessLicenceCode;
        _this.businessLicenceUrl = res.data.data.businessLicenceUrl;
      }, function(res){
        _this.$message(res.data.errMsg);
      })
    }
  }
</script>

<style lang="less" scoped>
  .container-detail {
    width: 100%;
    height: auto;
    overflow: hidden;
    text-align: start;
    padding-left: 30px;
  }

  .container-left {
    display: inline-block;
    width: 30%;
    height: auto;
  }

  .container-company-info {
    width: 100%;
    height: 30px;
  }

  span {
    display: block;
    width: 100%;
    height: 50px;
    color: #2d2f33;
    font-size: 20px;
  }

  img{
    width: 100px;
    height: auto;
  }

</style>
