<template>
    <div class="main">
      <div class="register">
        <div class="company_name">掌护云 · 开放平台</div>
        <div class="content">
            <div class="header">
              <div class="left fl">新用户注册</div>
              <div class="right fr">已有掌护开放平台账号？<span class="tologin cursorPointer" @click="toLogin">立即登录</span></div>
            </div>
            <ul class="step">
              <li v-for="(i,index) in contentList" :class="index == tabId ? 'special' : ''">
                <a>
                  <span v-if="index < tabId" class="had">{{i.id}}</span>
                  <span v-else-if="index == tabId" class="active">{{i.id}}</span>
                  <span v-else>{{i.id}}</span>
                  <i>{{i.name}}</i>
                </a>
                <div v-if="index == 2"></div>
                <div v-else class="line">&nbsp;</div>
              </li>
            </ul>
            <div class="contentInfo" v-if="tabId==0">
              <el-button class="btnSend" :disabled="disabled" @click="getCode">{{getCodeText}}</el-button>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="ruleForm.phone" class="phoneNumber" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                  <el-input v-model="ruleForm.code" placeholder="请输入手机验证码"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="ruleForm.password" placeholder="请输入6-20位密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="rePassword">
                  <el-input type="password" v-model="ruleForm.rePassword" placeholder="请确认密码"></el-input>
                </el-form-item>
                <!--<el-form-item>
                  <el-checkbox v-model="checked">我同意并遵守</el-checkbox>
                  <span class="protocol">《掌护开放平台服务协议》</span>
                </el-form-item>-->
                <el-form-item class="btnAll">
                  <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
                  <!--<el-button @click="resetForm">取消</el-button>-->
                </el-form-item>
              </el-form>
            </div>
            <div class="contentInfo contentInfoSpecial" v-if="tabId==1">
              <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm" enctype="multipart/form-data">
                <p class="title">企业信息登记</p>
                <el-form-item label="企业名称" prop="name">
                  <el-input v-model="ruleForm2.name" placeholder="请输入企业名称"></el-input>
                </el-form-item>
                <el-form-item label="执照注册号" prop="number">
                  <el-input v-model="ruleForm2.number" placeholder="请输入15位营业执照注册号或18位的统一社会信用代码"></el-input>
                </el-form-item>
                <el-form-item label="营业执照" prop="imageUrl">
                  <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    name="filedata"
                    :limit="num"
                    accept="image/jpeg,image/png"
                    :onError="uploadError"
                    :file-list="fileList"
                    :onSuccess="uploadSuccess"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <el-button>请选择文件</el-button>
                    <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                  </el-upload>
                  <el-dialog :visible.sync="ruleForm2.dialogVisible">
                    <img width="100%" :src="ruleForm2.imageUrl" alt="">
                  </el-dialog>
                </el-form-item>
                <p  class="title">管理员信息登记</p>
                <el-form-item label="账号" prop="codeMan">
                  <el-input v-model="ruleForm2.codeMan" placeholder="请输入6-20位账号，不能全为数字"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="nameMan">
                  <el-input v-model="ruleForm2.nameMan" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="ruleForm2.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item class="btnAll">
                  <el-button @click="goBack">上一步</el-button>
                  <el-button type="primary" @click="submitFormTwo('ruleForm2')">下一步</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="contentSpeical" v-if="tabId==2">
              <img class="imgSpecial" :src="ruleForm2.imageUrl"/>
              <div class="contentForm">
                <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                  <p class="title">企业信息</p>
                  <el-form-item label="企业名称：">
                    {{ruleForm2.name}}
                  </el-form-item>
                  <el-form-item label="执照注册号：">
                    {{ruleForm2.number}}
                  </el-form-item>
                  <p  class="title">管理员信息</p>
                  <el-form-item label="邮箱：">
                    {{ruleForm2.email}}
                  </el-form-item>
                  <el-form-item label="账号：">
                    {{ruleForm2.codeMan}}
                  </el-form-item>
                  <el-form-item label="姓名：">
                    {{ruleForm2.nameMan}}
                  </el-form-item>
                  <p class="info">信息确认提交后，掌护云开放平台将在1-5个工作日内完成审核。</p>
                  <el-form-item class="btnAll">
                    <el-button @click="goBack">上一步</el-button>
                    <el-button type="primary" @click="submitAll">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
      </div>
      <copyRight></copyRight>
      <el-dialog
        title="提示"
        :visible.sync="dialogSubmitSuccessVisible"
        width="30%"
        :append-to-body="true"
        @close="onDialogConfirmBtnClick"
        @closed="toLogin">
        <span>信息提交成功，掌护云开放平台将在1-5个工作日内完成审核。</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onDialogConfirmBtnClick">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import {userModel} from "../../api/userApi"
  import {commonModel as commonApi, commonModel} from "../../api/commonApi"
  import API_ROOT from "../../api/index"
    export default {
      name: 'register',
      data () {
        //空格
        var validateTrim = (rule, value, callback) => {
          if (value.trim() === '') {
            callback(new Error('请输入内容'));
          } else {
            callback();
          }
        }
        var validatePass = (rule, value, callback) => {
          let reg =/\s/;
          if (value.trim()=== '') {
            callback(new Error('请输入密码'));
          } else if(reg.test(value)){
            callback(new Error('不能含有空格'));
          } else {
            if (this.ruleForm.rePassword !== '') {
              this.$refs.ruleForm.validateField('rePassword');
            }
            callback();
          }
        }
        var validatePass2 = (rule, value, callback) => {
          let reg =/\s/;
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.password) {
            callback(new Error('两次输入密码不一致!'));
          }else if(reg.test(value)){
            callback(new Error('不能含有空格'));
          } else {
            callback();
          }
        }
        var validateEmail = (rule, value, callback) => {
          var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
          if(value.trim() === ''){
            callback(new Error('请输入内容'));
          }else if(!reg.test(value)){
            callback(new Error('邮箱格式不正确'));
          }else{
            callback();
          }
        }
        var validateAccount = (rule, value, callback) => {
          if(!isNaN(value)){
            callback(new Error('帐号不能全为数字'));
          } else if (!/^[A-Za-z0-9_]+$/.test(value)) {
            callback(new Error('账号由英文数字和下划线组成'));
          } else{
            callback();
          }
        }
        return {
          dialogVisible:false,
          msg: '注册页',
          /*checked: false,*/
          contentList:[
            {id:1,name:'基本信息'},
            {id:2,name:'信息登记'},
            {id:3,name:'信息确认'}
          ],
          tabId: 0,
          getCodeText:'发送验证码',
          disabled:false,
          validCode:'',//服务端返回验证码
          uploadUrl: API_ROOT.API_ROOT + "/common/v1/uploadImg",//上传地址
          time:60,
          ruleForm: {
            phone: '',
            code:'',
            password:'',
            rePassword:''
          },
          //fileList:[],
          fileList: [],
          ruleForm2:{
            name:'',
            number:'',
            imageUrl: '',
            nameMan:'',
            codeMan:'',
            email:'',
            dialogVisible: false
          },
          /*ruleForm2:{
            name:'深圳市双平泰管理有限公司',
            number:'154751572154212654552154',
            imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536402671536&di=d59591833ba18c28de46dfbb8b2db45d&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D333415870%2C2779108163%26fm%3D214%26gp%3D0.jpg',
            nameMan:'user',
            codeMan:'asdfsfe',
            email:'123@qq.com',
            dialogVisible: false
          },*/
          rules: {
            phone: [
              { required: true, message: '作为登录账号，请填写未在掌护公众平台注册的手机号', trigger: 'blur' },
              { pattern: /^[1][3-9][0-9]{9}$/, message: '请输入正确的手机号码', trigger: 'blur'},
              { validator: validateTrim, trigger: 'blur' },
            ],
            code:[
              { required: true, message: '请填写短信中的6位验证码', trigger: 'blur' },
              { validator: validateTrim, trigger: 'blur' },
            ],
            password:[
              { required: true, message: '请输入密码', trigger: 'blur' },
              { validator: validatePass, trigger: 'blur' },
              { validator: validateTrim, trigger: 'blur' },
              { min: 6, max: 20, message: '字母、数字或者英文符号，最短6位，最长20位', trigger: 'blur' }
            ],
            rePassword:[
              { required: true, message: '请再次输入密码', trigger: 'blur' },
              { validator: validatePass2, trigger: 'blur' },
              { validator: validateTrim, trigger: 'blur' },
              { min: 6, max: 20, message: '字母、数字或者英文符号，最短6位，最长20位', trigger: 'blur' }
            ],
            name:[
              { required: true, message: '请输入企业名称', trigger: 'blur' },
              { validator: validateTrim, trigger: 'blur' },
            ],
            number:[
              { required: true, message: '请输入营业执照号', trigger: 'blur' },
              { validator: validateTrim, trigger: 'blur' },
              { min: 15, max: 18, message: '长度在 15 到 18 个字符', trigger: 'blur' }
            ],
            imageUrl:[
              { required: true, message: '请上传营业执照'}
            ],
            nameMan:[
              { required: true, message: '请输入姓名', trigger: 'blur' },
              { validator: validateTrim, trigger: 'blur' },
              { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
            ],
            codeMan:[
              { required: true, message: '请输入账号', trigger: 'blur' },
              { validator: validateAccount, message: "帐号不能全为数字，请输入字母及数字下划线组合", trigger: 'blur'},
              { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
            ],
            email:[
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              { validator: validateTrim, trigger: 'blur' },
              { validator: validateEmail, trigger: 'blur' }
            ],
          },
          num: 1,
          dialogSubmitSuccessVisible: false,
        }
      },
      methods:{
        goBack(){
          this.tabId = this.tabId - 1
        },
        // 上传成功后的回调
        uploadSuccess (response, file, fileList) {
          console.log(response);
          this.ruleForm2.imageUrl = response.data;

          let dom = document.querySelector('.el-upload');
          dom.style.display = 'none';
        },
        // 上传错误
        uploadError (response, file, fileList) {
          this.$message('上传失败，请重试');
        },
        // 删除上传
        handleRemove(file, fileList) {
          let dom = document.querySelector('.el-upload');
          dom.style.display = 'inline-block';
          this.ruleForm2.imageUrl = '';
        },
        handlePictureCardPreview(file) {
          this.ruleForm2.dialogVisible = true;
        },
        getCode:function(){
          let vm = this;
          if((/^1[3-9]\d{9}$/.test(vm.ruleForm.phone))){
            vm.disabled = true
            if(vm.time>0){
              var t =setInterval(function(){
                vm.time--;
                vm.getCodeText = vm.time+"s秒后重试";
                if(vm.time <= 0){
                  vm.disabled = false
                  clearInterval(t);
                  vm.time=10;
                  vm.getCodeText="重新获取";
                }
              },1000);
              commonModel.sendCode(vm.ruleForm.phone, function(res){
                if(res.data.data){
                  vm.$message('发送验证码成功');
                  vm.validCode = res.data.data;
                }else{
                  vm.$message('发送验证码失败');
                }
              }, function(res){
                vm.$message(res.data.errMsg);
              })
            }
          }
        },
        toLogin(){
          this.$router.push('/')
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              commonApi.chcekCode(this.ruleForm.phone, this.ruleForm.code, (res) => {
                this.tabId = 1
              }, (res) => {
                this.$message(res.data.errMsg);
              });
            } else {
              return false;
            }
          });
        },
        submitFormTwo(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid && this.ruleForm2.imageUrl!=='') {
              this.tabId = 2
            } else {
              return false;
            }
          });
        },
        /*resetForm() {
          this.ruleForm = {}
          this.ruleForm2 = {}
          this.toLogin();
        },*/
        submitAll(){
          var _this = this;
          userModel.register(this.ruleForm.phone, this.ruleForm.password, this.ruleForm2.name,
            this.ruleForm2.number, this.ruleForm2.imageUrl, this.ruleForm2.nameMan,
            this.ruleForm2.codeMan, this.ruleForm2.email, function(res){
              _this.dialogSubmitSuccessVisible = true;
          }, function (res) {
            _this.$message(res.data.errMsg);
          })
        },
        onDialogConfirmBtnClick: function(){
          this.dialogSubmitSuccessVisible = false;
        }
      }
    }
</script>
<style lang="less" scoped type="text/less">
.protocol{
  color: #409EFF;
}
.phoneNumber{
  width: 60%;
}
.main{
  overflow: hidden;
  min-height: 100%;
  background: url("../../assets/images/login/login.jpg") no-repeat;
  background-size: cover;
  position: relative;
  .register{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    .company_name{
      width: 750px;
      height: 50px;
      margin: 0 auto;
      font-size: 24px;
      font-weight: 600;
      color: white;
    }
    .content{
      .header{
        height: 60px;
        line-height: 60px;
        padding: 0 50px;
        border-bottom: 1px solid #E5E5E5;
        .left{
          font-size: 22px;
        }
        .tologin{
          color: #277BF8;
        }
      }
      width: 750px;
      height: auto;
      background: white;
      overflow: hidden;
      margin: 0 auto;
      position: relative;
      .step{
        text-align: center;
        height: auto;
        overflow: hidden;
        width: 100%;
        .special{
          color: #3cbaFF;
        a{
          span{
            border-color: #3cbaFF;
          }
        }
        }
        li:last-child{
          background: none;
        }
        li{
          display: inline-block;
          color: #9fa4a6;
          text-align: center;
          height: 72px;
          .line{
            margin: 20px 10px 20px 10px;
            line-height: 2px;
            border-right: 80px solid #ACBCD3;
            text-align: center;
            display: inline-block;
            vertical-align: bottom;
          }

          a{
            display: inline-block;
            margin-top: 23px;
            span{
              height: 35px;
              width: 35px;
              border-radius: 32px;
              display: block;
              text-align: center;
              line-height: 35px;
              font-size: 0.15rem;
              float: left;
              background: url("../../assets/images/login/icon.png") no-repeat;
              background-position: -322px -32px;
              font-size: 20px;
              color: white;
            }
            span.active{
              background-position: -355px 0px;
            }
            span.had{
              background-position: -321px 2px;
            }
            i{
              float: left;
              line-height: 34px;
              font-size: 0.16rem;
              margin-left: 10px;
            }
          }
        }
      }

      .contentSpeical{
        position: relative;
        .contentForm{
          margin-left:100px;
          height: auto;
          overflow: hidden;
          .info{
            text-align: center;
            color: #EC9772;
          }
          .title{
            font-size: 14px;
          }
          .btnAll{
            margin-top: 25px;
            button{
              width: 150px;
            }
          }
        }
        .imgSpecial{
          position: absolute;
          right: 90px;
          height: 200px;
          width: 180px;
        }
      }
      .contentInfoSpecial{
        width: 480px!important;
        position: relative;
        .title{
          font-size: 14px;
          margin-bottom: 20px;
          color: #ACBDD2;
        }
      }
      .contentInfo{
        position: relative;
        margin-left:110px;
        width: 430px;
        height: auto;
        overflow: hidden;
        .btnSend{
          position: absolute;
          top: 0px;
          right: 2px;
          color: #409EFF;
          border-color: #409EFF;
          z-index: 999;
        }
        .btnAll{
          margin-top: 50px;
          text-align: center;
          button{
            width: 150px;
          }
        }
      }
    }
  }
}
</style>
