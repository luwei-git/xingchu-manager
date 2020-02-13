<template>
  <div class="isMargin">
    <div class="top-title-common"><h3>设置 > 机构设置 > 新增机构</h3></div>
    <div class="add-org">
      <el-button style="position: absolute;right: 50px; top:16px;" @click="goback" type="primary" size="small"> 返 回 </el-button>
      <div class="content-org">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" class="demo-ruleForm">
          <p class="title">机构信息</p>
          <el-form-item label="上级机构：" prop="region">
            <el-select v-model="ruleForm.region" style="width: 70%" placeholder="请选择上级机构">
              <el-option label="1" value="shanghai"></el-option>
              <el-option label="2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构名称：" prop="nameMan">
            <el-input v-model="ruleForm.nameMan" placeholder="请输入机构名称" style="width: 70%"></el-input>
          </el-form-item>
          <p class="title">管理员信息登记</p>
          <el-form-item label="姓名：" prop="nameMan">
            <el-input v-model="ruleForm.nameMan" placeholder="请输入姓名" style="width: 70%"></el-input>
          </el-form-item>
          <el-form-item label="账号：" prop="codeMan">
            <el-input v-model="ruleForm.codeMan" placeholder="请输入6-20位账号" style="width: 70%"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="请输入6-8位密码" style="width: 70%"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="rePassword">
            <el-input type="password" v-model="ruleForm.rePassword" placeholder="请确认密码" style="width: 70%"></el-input>
          </el-form-item>
          <p class="title">企业信息登记</p>
          <el-form-item label="企业名称：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入企业名称" style="width: 70%"></el-input>
          </el-form-item>
          <el-form-item label="执照注册号：" prop="number">
            <el-input v-model="ruleForm.number" placeholder="请输入15位营业执照注册号/18位的统一社会信用代码" style="width: 70%"></el-input>
          </el-form-item>
          <el-form-item label="营业执照：" prop="">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :onError="uploadError"
              :file-list="fileList"
              :onSuccess="uploadSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="ruleForm.dialogVisible">
              <img width="100%" :src="ruleForm.imageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item class="btnAll">
            <el-button>取消</el-button>
            <el-button type="primary" @click="submitOrg('ruleForm')">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'add-org',
    data() {
      return {
        fileList:[],
        ruleForm: {
          name: '',
          number: '',
          imageUrl: '',
          nameMan: '',
          codeMan: '',
          dialogVisible: false
        },
        rules: {}
      }
    },
    methods:{
      goback(){
        this.$router.push('/'+this.$route.path.split('/')[1])
      },
      // 上传成功后的回调
      uploadSuccess (response, file, fileList) {
        this.ruleForm2.imageUrl = file.url;
        this.fileList = fileList
      },
      // 上传错误
      uploadError (response, file, fileList) {
        this.$message('上传失败，请重试！');
      },
      //照片上传
      handleRemove(file, fileList) {
      },
      handlePictureCardPreview(file) {
        this.ruleForm2.imageUrl = file.url;
        this.ruleForm2.dialogVisible = true;
      },
      submitOrg(){

      }
    }
  }
</script>

<style lang="less" scoped>
  .add-org {
    margin-top: 16px;
    height: auto;
    overflow: hidden;
    background: white;
    position: relative;
    width: 100%;
    .content-org {
      margin: 16px auto;
      height: auto;
      overflow: hidden;
      width: 50%;
      p{
        font-size: 16px;
        color: #398bf7;
        margin: 10px 0 12px;
      }
    }
  }
</style>
