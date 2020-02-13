<template>
    <div class="main">
      <div class="login">
        <p class="header">
          <img class="loginLog" src="../../assets/images/login/logo.png" alt="">
          <span class="projectTitle" href="">掌护云 · 开放平台</span>
        </p>
        <div class="accountNum">
          <p class="accountNumLogin">账号登录</p>
          <input type="text" v-model="account" placeholder="请输入帐号/手机号" class="account"/>
          <input type="password" v-model="Pw" placeholder="请输入密码" class="pass" @keyup.enter="logSuccess"/>
          <el-checkbox v-model="checked" class="check">记住账号</el-checkbox>
          <span class="tips">{{Tips}}</span>
          <div class="buttons" @click="logSuccess">登 录</div>
          <div class="register tar"><span>还没注册？点击&nbsp;</span><span class="cursorPointer" @click="register">注册</span></div>
        </div>
      </div>
    </div>
</template>

<script>
    import {userModel} from '../../api/userApi';
    import {Cookie} from '../../utils/cookie'
    import {validateEmptyString, validatePassword} from '../../utils/validate'
    export default {
      name: 'login',
      data () {
        return {
          msg: '登录页',
          Tips:'',
          account:'',
          Pw:'',
          checked:true
        }
      },
      //页面加载调用获取cookie值
      mounted(){
        this.account = Cookie.get(Cookie.accountKey);
      },
      methods:{
        register(){
          this.$router.push('/register')
        },
        //登录
        logSuccess(){
          var vm = this;
          vm.Tips = '';
          if(validateEmptyString(this.account)){
            this.Tips = '请输入帐号/手机号'
          }else if(validateEmptyString(this.Pw)){
            this.Tips = '请输入密码'
          }else if(!validatePassword(this.Pw)){
            this.Tips = '请输入6-16位密码'
          }else{
            userModel.login(this.account, this.Pw, function(res){
              Cookie.set(Cookie.tokenKey, res.data.data.token);
              Cookie.set(Cookie.refreshTokenKey, res.data.data.refreshToken);
              Cookie.set(Cookie.organIdKey, res.data.data.user.organId);
              Cookie.set(Cookie.userIdKey, res.data.data.user.userId);
              sessionStorage.setItem('menuCodeList', JSON.stringify(res.data.data.resources.menuResourceList));
              if (vm.checked) {
                Cookie.set(Cookie.accountKey, vm.account);
              }else {
                //清空Cookie
                Cookie.remove(Cookie.accountKey);
              }
              vm.$router.push('/homePageHospital');
            }, function(res){
              vm.$message(res.data.errMsg);
            });
          }
        },
      },
    }
</script>

<style lang="less" scoped type="text/less">
  @white: white;
  .main{
    position: relative;
    background: url("../../assets/images/login/login.jpg") no-repeat;
    background-size: cover;
    .login{
      height: 420px;
      width: 426px;
      position: absolute;
      top: 50%;
      right: 10%;
      transform: translateY(-50%);
      background: @white;
      border-radius: 8px;
      .header{
        height: auto;
        overflow: hidden;
        width: 100%;
        padding-bottom: 10px;
        background-color: #458DF3;
        .loginLog{
          height: 30px;
          float: left;
          margin: 20px 0 0 20px;
        }
        .projectTitle{
          float: left;
          color: @white;
          font-size: 0.2rem;
          font-weight: bold;
          margin: 22px 0 0 10px;
        }
      }
      .accountNum{
        padding: 36px 51px;
        .accountNumLogin{
          margin-left: 17px;
          font-size: 0.15rem;
        }
        .buttons{
          color: white;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
          margin: 44px auto 0;
          width: 300px;
          height: 40px;
          font-size: .15rem;
          background-color: #267bf7;
          border-radius: 4px;
        }
        .check{
          cursor: pointer;
          width: 16px;
          height: 16px;
          margin-top: 12px;
          vertical-align: middle;
          margin-left: 17px;
        }
        span{
          color: #41454b;
          font-size: 14px;
          display: inline-block;
          margin-top: 12px;
          vertical-align: middle;

        }
        .tips{
          position: absolute;
          color: #ff6372;
          font-size: 16px;
          width: 300px;
          margin: 43px auto 0;
        }
        .account{
          outline: none;
          margin: 30px auto 0;
          width: 300px;
          height: 40px;
          background-color: #ffffff;
          border-radius: 4px;
          border: solid 1px rgba(206, 206, 206, 0.7);
          padding-left: 11px;
          box-sizing: border-box;
          display: block;
        }
        .pass{
          padding-left: 11px;
          box-sizing: border-box;
          outline: none;
          margin: 20px auto 0;
          display: block;
          width: 300px;
          height: 40px;
          background-color: #ffffff;
          border-radius: 4px;
          border: solid 1px rgba(206, 206, 206, 0.7);
        }
        .register{
          padding-right: 11px;
          span:nth-of-type(2),span:nth-of-type(4){
            a{
              color: #398bf7;
              cursor: pointer;
              text-decoration: none;
            }
            color: #398bf7;
            cursor: pointer;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1240px) {
    .main {
      .login{
        height: 420px;
        width: 426px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
