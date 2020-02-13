<template>
  <div class="org-user">
    <div class="manage">
      <p style="border-bottom: 1px solid #f1f1f1; padding-bottom: 20px; margin-top: 15px"><span>管理员信息</span>
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="dialogModifyAdminFormVisible = true"
                   style="float: right">
          修改
        </el-button>
      </p>
      <ul style="padding-left: 40px;">
        <li><label>姓名：<span style="font-weight: bold">{{adminName}}</span></label></li>
        <li><label>账号：<span style="font-weight: bold">{{adminAccount}}</span></label></li>
        <li><label>手机号：<span style="font-weight: bold">{{adminPhone}}</span></label></li>
      </ul>
    </div>
    <div class="operator">
      <p><span>用户管理</span>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="dialogAddUserVisible = true">新增
        </el-button>
      </p>
      <el-table
        :data="manList"
        border
        style="width: 100%"
        :max-height="tableHeight"
      >
        <el-table-column
          prop="nickname"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="account"
          label="账号">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onOptionBtnClick(scope.row)"
            >
              {{scope.row.status === '启用' ? '禁用' : '启用'}}
            </el-button>
            <el-button type="text" size="small" @click="onDeleteBtnClick(scope.row)">
              删除
            </el-button>
            <el-button type="text" size="small" @click="onResetPasswordClick(scope.row)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :pageSize="pageSize"
        :currentChangeCallback="currentChangeCallback1">
      </pagination>
    </div>

    <el-dialog title="修改管理员信息" :visible.sync="dialogModifyAdminFormVisible" :append-to-body="true" width="40%"
      @close="onModifyAdminClosed">
      <el-form :model="modifyAdminForm" :rules="rules" ref="modifyAdminForm" style="width: 300px;">
        <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
          <el-input v-model="modifyAdminForm.name" placeholder="请输入姓名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="帐号:" prop="account" placeholder="请输入6-20位账号" :label-width="formLabelWidth">
          <label>{{adminAccount}}</label>
        </el-form-item>
        <el-form-item label="手机号:" :label-width="formLabelWidth">
          <label>{{modifyAdminForm.phone}}</label>
          <el-button type="text" size="small" @click="newPhoneVisible = !newPhoneVisible" style="margin-left: 10px">修改
          </el-button>
        </el-form-item>
        <el-form-item label="新手机号:" prop="newPhone" :label-width="formLabelWidth" v-show="newPhoneVisible">
          <el-input v-model="modifyAdminForm.newPhone" placeholder="请输入手机号" auto-complete="off" prop="phone"></el-input>
          <el-button type="primary" size="mini" @click="getCode()" :disabled="disabled">{{getCodeText}}</el-button>
        </el-form-item>
        <el-form-item label="验证码:" prop="validCode" :label-width="formLabelWidth" v-show="newPhoneVisible">
          <el-input v-model="modifyAdminForm.validCode" placeholder="请输入手机验证码" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyAdminFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onModifyAdminClick">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增用户" :visible.sync="dialogAddUserVisible" :append-to-body="true" width="40%"
               @close="onAddUserDialogClosed">
      <el-form :model="addUserForm" :rules="rules" ref="addUserForm" style="width: 400px;" class="demo-ruleForm">
        <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addUserForm.name" placeholder="请输入姓名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="帐号:" prop="account" :label-width="formLabelWidth">
          <el-input v-model="addUserForm.account" placeholder="请输入6-20位账号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password" :label-width="formLabelWidth">
          <el-input type="password" v-model="addUserForm.password" placeholder="请输入6-20位密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="rePassword" :label-width="formLabelWidth">
          <el-input type="password" v-model="addUserForm.rePassword" placeholder="请确认密码" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddUserClick">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="optionConfirmDialogVisible"
      width="30%"
      :append-to-body="true"
    >
      <span>{{optionMsg}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="optionConfirmDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onOptionConfirmBtnClick">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="dialogModifyPasswordVisible" :append-to-body="true" width="40%"
               @close="onModifyPasswordDialogClosed">
      <el-form :model="modifyPasswordForm" :rules="rules" ref="modifyPasswordForm" style="width: 400px;">
        <el-form-item label="密码:" prop="password" :label-width="formLabelWidth">
          <el-input type="password" v-model="modifyPasswordForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="rePassword2" :label-width="formLabelWidth">
          <el-input type="password" v-model="modifyPasswordForm.rePassword2" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyPasswordVisible = false">取 消</el-button>
        <el-button type="primary" @click="onResetPasswordConfirmClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ElForm from "element-ui/packages/form/src/form";
  import ElButton from "element-ui/packages/button/src/button";
  import {userModel} from "../../../api/userApi"
  import {orgModel} from "../../../api/orgApi";
  import {Cookie} from "../../../utils/cookie";
  import {commonModel} from "../../../api/commonApi";
  import pagination from '../../common/pagination'

  export default {
    methods: {
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{name: '算得上是'}]);
        }
        if (node.level > 1) return resolve([]);

        setTimeout(() => {
          const data = [{
            name: '对对对',
            leaf: true
          }, {
            name: '撒啊啊'
          }];

          resolve(data);
        }, 500);
      },

      addOrg() {
        this.$router.push('/orgSetting/addOrg')
      },

      /**
       * 获取验证码
       */
      getCode: function () {
        let vm = this;
        if (!(/^1[34578]\d{9}$/.test(vm.modifyAdminForm.newPhone))) {
          this.$message('请输入正确手机号码');
        } else {
          vm.disabled = true
          if (vm.time > 0) {
            var t = setInterval(function () {
              vm.time--;
              vm.getCodeText = vm.time + "s秒后重试";
              if (vm.time <= 0) {
                vm.disabled = false
                clearInterval(t);
                vm.time = 10;
                vm.getCodeText = "重新获取";
              }
            }, 1000);
          }
          commonModel.sendCode(vm.modifyAdminForm.newPhone, function (res) {
            vm.$message("发送验证码成功");
          }, function (res) {
            vm.$message(res.data.errMsg);
          });
        }
      },

      /**
       * 修改管理员信息
       */
      onModifyAdminClick: function () {
        let phone;
        let code;
        if (this.newPhoneVisible) {
          if (!(/^1[34578]\d{9}$/.test(this.modifyAdminForm.newPhone))) {
            this.$message('请输入正确手机号码');
            return;
          }
          if (this.modifyAdminForm.validCode.trim() === "") {
            this.$message('验证码不能为空');
            return;
          }
          phone = this.modifyAdminForm.newPhone;
          code = this.modifyAdminForm.validCode;
        } else {
          phone = null;
          code = null;
        }
        if(this.modifyAdminForm.name.trim() === ''){
          return;
        }
        const _this = this;
        userModel.updateAdminInfo(Cookie.get(Cookie.userIdKey), phone, code, this.modifyAdminForm.name, function (res) {
          _this.dialogModifyAdminFormVisible = false;
          _this.queryCurrentUser();
        }, function (res) {
          _this.$message(res.data.errMsg);
        });
      },

      /**
       * 点击添加用户
       */
      onAddUserClick:function(){
        this.$refs['addUserForm'].validate((valid) => {
          if (valid) {
            userModel.addUser(this.addUserForm.name,
              this.addUserForm.account, this.addUserForm.password, () => {
                this.queryUserList();
                this.dialogAddUserVisible = false
                this.addUserForm.name = "";
                this.addUserForm.account = "";
                this.addUserForm.password = "";
                this.addUserForm.rePassword = "";
              }, (res) =>{
                this.$message(res.data.errMsg);
              })
          } else {
            return false;
          }
        });
      },

      /**
       * 查询用户列表
       */
      queryUserList:function(){
        const _this = this;
        userModel.queryList(this.currentPage, this.pageSize, function (res) {
          _this.manList = res.data.data.items.map(item => {
            item.status = item.status == 1 ? '启用': '停用';
            return item;
          });
          _this.total = res.data.data.totalNum;
        }, function (res) {
          _this.$message(res.data.errMsg);
        })
      },
      onOptionBtnClick: function (row) {
        if(row.status === "启用"){
          this.optionMsg='确定禁用该用户吗？'
          this.currentOptionUserId = row.userId;
          this.optionConfirmDialogVisible = true;
        }else{
          const _this = this;
          userModel.startUser(row.userId, function(res){
            _this.$message("启用用户成功");
            _this.queryUserList();
          }, function(res){
            _this.$message(res.data.errMsg);
          })
        }
      },

      /**
       * 点击重设密码操作
       * @param row
       */
      onResetPasswordClick: function(row){
        this.currentOptionUserId = row.userId;
        this.dialogModifyPasswordVisible = true;
      },

      /**
       * 点击删除操作
       * @param row
       */
      onDeleteBtnClick: function (row) {
        this.optionMsg='确认删除该用户吗？';
        this.currentOptionUserId = row.userId;
        this.optionConfirmDialogVisible = true;
      },

      /**
       * 点击确认操作
       */
      onOptionConfirmBtnClick: function () {
        const _this = this;
        if(this.optionMsg === "确定禁用该用户吗？"){ //禁用用户操作
          userModel.stopUser(this.currentOptionUserId, function(res){
            _this.queryUserList();
            _this.optionConfirmDialogVisible = false;
          }, function (res) {
            _this.$message(res.data.errMsg);
            _this.optionConfirmDialogVisible = false;
          })
        }else if(this.optionMsg === "确认删除该用户吗？"){ //删除用户操作
          userModel.deleteUser(this.currentOptionUserId, function(res){
            _this.queryUserList();
            _this.optionConfirmDialogVisible = false;
          }, function (res) {
            _this.$message(res.data.errMsg);
            _this.optionConfirmDialogVisible = false;
          })
        }
      },

      /**
       * 确认重置密码
       */
      onResetPasswordConfirmClick: function(){
        const _this = this;
        this.$refs['modifyPasswordForm'].validate((valid) => {
          if(valid){
            userModel.resetPwd(this.currentOptionUserId, this.modifyPasswordForm.password, function (res) {
              _this.$message("重置密码成功");
              _this.dialogModifyPasswordVisible = false;
            }, function (res) {
              _this.$message(res.data.errMsg);
              _this.dialogModifyPasswordVisible = false;
            })
          }
        });
      },

      /**
       * 查询当前用户信息
       */
      queryCurrentUser(){
        const _this = this;
        userModel.queryCurrentUser(function(res){
          _this.adminName = res.data.data.nickname;
          _this.adminAccount = res.data.data.account;
          _this.adminPhone = res.data.data.phone;
          _this.modifyAdminForm.account = res.data.data.account;
          _this.modifyAdminForm.name = res.data.data.nickname;
          _this.modifyAdminForm.phone = res.data.data.phone;
        }, function(res){
          _this.$message(res.data.errMsg);
        });
      },

      /**
       * 用户列表分页回调事件
       */
      currentChangeCallback1: function(currentPage){
        this.currentPage = currentPage;
        this.queryUserList();
      },

      /**
       * 校验输入内容trim后是否为空字符串
       */
      validateTrim: function(rule, value, callback){
        if (value.trim() === '') {
          callback(new Error('请输入内容'));
        } else {
          callback();
        }
      },

      /**
       * 校验添加用户RePassword
       */
      validatePassword: function(rule, value, callback){
        let reg =/\s/;
        if (value.trim() === '') {
          callback(new Error('请再次输入密码'));
        } else if(reg.test(value)){
          callback(new Error('不能含有空格'));
        } else {
          callback();
        }
      },

      /**
       * 校验添加用户RePassword
       */
      validateRePassword: function(rule, value, callback){
        let reg =/\s/;
        if (value.trim() === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.addUserForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else if(reg.test(value)){
          callback(new Error('不能含有空格'));
        } else {
          callback();
        }
      },

      /**
       * 校验修改指定用户RePassword
       */
      validateRePassword2: function(rule, value, callback){
        let reg =/\s/;
        if (value.trim() === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.modifyPasswordForm.password) {
          callback(new Error('两次输入密码不一致!'));
        }else if(reg.test(value)){
          callback(new Error('不能含有空格'));
        } else {
          callback();
        }
      },

      /**
       * 校验手机号
       */
      validatePhone: function(rule, value, callback){
        if(this.newPhoneVisible){
          if (!(/^1[34578]\d{9}$/.test(value))) {
            callback(new Error('请输入正确手机号码'));
            return;
          }
        }
        callback();
      },

      /**
       * 校验验证码
       */
      validateCode: (rule, value, callback) => {
        if(this.newPhoneVisible){
          if (value.trim() === '') {
            callback(new Error('请输入验证码'));
            return;
          }
        }
        callback();
      },

      /**
       * 修改管理员dialog关闭回调，清除数据
       */
      onModifyAdminClosed: function(){
        console.log("onModifyAdminClosed..");
        this.$refs.modifyAdminForm.resetFields();
      },

      /**
       * 添加用户dialog关闭回调，清除数据
       */
      onAddUserDialogClosed: function(){
        this.$refs.addUserForm.resetFields();
      },

      /**
       * 修改密码dialog关闭回调，清除数据
       */
      onModifyPasswordDialogClosed: function(){
        this.$refs.modifyPasswordForm.resetFields();
      }
    },

    components: {
      ElButton,
      ElForm
    },
    name: 'org-setting',
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        // manList: [{nickname: 'sss', accounts: 'sss', status: 1}, {name: 'sss', code: 'sss', status: 1}, {
        //   name: 'sss',
        //   code: 'sss',
        //   status: 1
        // }],
        tableHeight: 400,
        manList: [],
        manNumber: 3,
        orgList: {},

        adminName: '',
        adminAccount: '',
        adminPhone: '',

        tabPosition: 'detail', //顶部详情或用户position，默认选中详情
        formLabelWidth: '100px', //表单宽度

        dialogModifyAdminFormVisible: false, //修改管理员dialog是否显示标志
        modifyAdminForm: {  //修改管理员信息表单
          name: '',
          account: '',
          phone: '',
          newPhone: '',
          validCode: '',
        },
        getCodeText: '获取验证码',
        disabled: false,
        time: 60,
        newPhoneVisible: false,  //修改管理员手机号时，新手机号显示隐藏标志

        dialogAddUserVisible: false, //添加用户dialog是否显示标志
        addUserForm: {  //添加用户表单
          name: '',
          account: '',
          password: '',
          rePassword: '',
          disabled: false,
          time: 60,
          getCodeText: '获取验证码',
        },

        optionConfirmDialogVisible: false, //删除或禁用用户dialog显示隐藏标志
        optionMsg: "", //操作提示文案，确认删除或确认禁用

        dialogModifyPasswordVisible: false, //修改用户密码dialog显示隐藏标志
        modifyPasswordForm: {
          password: '',
          rePassword2: '',
        },
        currentOptionUserId: '', //当前操作用户id
        rules: {
          name:[
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { validator: this.validateTrim, trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          account:[
            { required: true, message: '请输入账号', trigger: 'blur' },
            { validator: this.validateTrim, trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: this.validatePassword, trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          rePassword:[
            { required: true, message: '请确认密码', trigger: 'blur' },
            { validator: this.validateRePassword, trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          rePassword2:[
            { required: true, message: '请确认密码', trigger: 'blur' },
            { validator: this.validateRePassword2, trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          newPhone:[
            { validator: this.validatePhone, trigger: 'blur' }
          ],
          validCode:[
            { validator: this.validateCode, trigger: 'blur' }
          ]
        },
        currentPage: 1,
        pageSize: 5,
        total: 5,
      };
    },
    //页面加载调用获取cookie值
    created() {
      const _this = this;
      this.queryUserList();

      this.queryCurrentUser();

      orgModel.queryByOrganId(Cookie.get(Cookie.organIdKey), function (res) {
        _this.adminAccount = res.data.data.account;
      }, function (res) {
        _this.$message(res.data.errMsg);
      })
    },
    components: {
      pagination
    }
  }
</script>

<style lang="less" scoped>
  .org-user {
    height: auto;
    overflow: hidden;
    width: 100%;
    p {
      margin-bottom: 10px;
      span {
        font-size: 16px;
        margin-right: 10px;
      }
      em {
        margin-left: 10px;
      }
    }
    ul {
      height: auto;
      overflow: hidden;
      li {
        line-height: 36px;
        label {
          font-size: 14px;
        }
      }
    }
    .detail {
      padding-bottom: 16px;
      li {
      }
    }
    .manage {
      background: white;
      padding: 10px 10px 10px 10px;
      width: 70%;
      margin-top: 15px;
    }
    .operator {
      background: white;
      padding: 10px 10px 10px 10px;
      width: 70%;
      margin-top: 15px;
    }
  }
</style>
