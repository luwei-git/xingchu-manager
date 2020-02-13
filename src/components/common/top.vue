<template>
  <div class="topNav">
    <!-- <div> -->
      <p class="topLeft">
        <img class="loginLog fl" src="../../assets/images/login/logo.png" alt="">
        <span>星厨</span>
      </p>
      <!--<breadcrumbs v-show="breadcrumbsIsShow" :firstText="text1" :secondText="text2"></breadcrumbs>-->
      <p class="topRight">
        <span @click="goOut" class="nikeName">{{nickname}}&nbsp;</span>
        <img class="fr" src="../../assets/images/login/head_pic.png" alt="">
        <!-- <span class="fr" @click="showResetPwdDialog">重置密码</span> -->
      </p>
      <ul class="opertate" v-show="isShow">
          <li @click="showResetPwdDialog"><i class="resetPwd"></i>重置密码</li>
          <li @click="goLogin"><i class="out"></i>退出</li>
      </ul>
      <!-- <img v-if="isShow" @click="goLogin" src="../../assets/images/login/top_pic_down_bg .png" class="goOut"/> -->
      <resetPasswordDialog
        v-if="resetPasswordDialogShow"
        v-on:resetPasswordDialogCancel="resetPasswordDialogCancel"
        v-on:resetPasswordDialogConfirm="resetPasswordDialogConfirm">
      </resetPasswordDialog>
    </div>
  <!-- </div> -->
</template>

<script>
  import {userModel} from "../../api/userApi";
  import breadcrumbs from './breadcrumbs';
  import resetPasswordDialog from '../dialogs/resetPasswordDialog';
  import {Cookie} from '../../utils/cookie';
  import eventBus from '../../utils/eventBus';
  export default {
    name: 'top',
    data(){
      return{
        isShow:false,
        nickname: '',
        breadcrumbsIsShow: false,
        text1: '',
        text2: '',
        resetPasswordDialogShow: false
      }
    },
    methods:{
      goOut(){
        let that = this
        document.addEventListener('click', function (e) {
          if (e.target.className == 'nikeName') {
            that.isShow = !that.isShow;
          } else {
            that.isShow = false;
          }
        })
      },
      goLogin() {
        this.isShow = false
        this.$router.push({
          path: '/',
        })
      },
      /**
       * 查询当前用户信息
       */
      queryCurrentUser(){
        // const _this = this;
        // userModel.queryCurrentUser(function(res){
        //   _this.nickname = res.data.data.nickname;
        // }, function(res){
        //   _this.$message(res.data.errMsg);
        // });
      },
      showResetPwdDialog () {
          this.resetPasswordDialogShow = true;
      },
      resetPasswordDialogCancel () {
          this.resetPasswordDialogShow = false;
      },
      resetPasswordDialogConfirm (value) {
            this.resetPasswordDialogShow = false;
            userModel.resetPwd({userId: Cookie.get(Cookie.userIdKey), password: value}, res => {
                this.$message('重置密码成功');
                this.resetPasswordDialogShow = false;
            }, err => {
                this.$message(err.data.errMsg);
            })
      }
    },
    mounted(){
      this.queryCurrentUser();
      eventBus.$on('setBreadcrumbs', (text1, text2) => {
        this.text1 = text1;
        this.text2 = text2;
      });
    },
    components: {
      breadcrumbs,
      resetPasswordDialog
    },
    watch: {
      '$route'(value) {
          if (value.path == '/homePageHospital') {
            this.breadcrumbsIsShow = false;
          } else {
            this.breadcrumbsIsShow = true;
          }
      }
    }
  }
</script>

<style lang="less" scoped>
  .topNav {
    height: 72px;
    width: 100%;
    z-index: 999;
    position: fixed;
    top: 0;
    background-color: #fff;
    // box-shadow: 0 2px 2px 0 rgba(129, 156, 173, .1);
    .goOut {
      position: absolute;
      right: 0;
      top: 58px;
      cursor: pointer;
    }
    .topLeft {
      float: left;
      width: 200px;
      height: 100%;
      background-color: rgb(57, 71, 108);
      img{
        margin-top: 16px;
        margin-left: 10px;
      }
      span {
        float: left;
        color: #fff;
        line-height: 72px;
        font-size: 0.16rem;
        margin-left: 10px;
        font-weight: bold;
      }
    }
    .topRight {
      float: right;
      height: 72px;
      img {
        margin-top: 13px;
        margin-right: 20px;
      }
      .nikeName {
        float: right;
        margin-top: 27px;
        margin-right: 20px;
        color: #8b9eba;
        font-size: 15px;
        cursor: pointer;
      }
      .nikeName:after {
        content: "";
        background-image: url("../../assets/images/topNav/top_name_down_but.png");
        background-size: 10px;
        background-repeat: no-repeat;
        height: 10px;
        display: inline-block;
        width: 10px;
        margin-top: 5px;
      }
    }
    .opertate{
        width: 1rem;
        position: absolute;
        background-color: #fff;
        right: 10px;
        bottom: -35px;
        text-align: left;
        border: 1px solid #e0e0e0;
        border-radius: 2px;
        color: #8b9eba;
        li{
            padding-left: 0.3rem;
            position: relative;
            height: 0.25rem;
            line-height: 0.25rem;
            border-bottom: 1px solid #e0e0e0;
            cursor: pointer;
        }
        i.resetPwd, i.out{
            width: 0.14rem;
            height: 0.14rem;
            position: absolute;
            left: 10px;
            top: 5px;
        }
        i.resetPwd{
            background: url('../../assets/images/topNav/resetPwd.png') no-repeat;
            background-size: cover;
        }
        i.out{
            background: url('../../assets/images/topNav/goOut.png') no-repeat;
            background-size: cover;
        }
    }
  }
</style>
