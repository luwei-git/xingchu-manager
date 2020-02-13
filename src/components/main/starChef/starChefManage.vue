<template>
  <div>
    <div class="top-title-common"><h3>星厨管理</h3></div>
    <el-button type="primary" style="float: right; margin: 0.2rem 30% 0.2rem 0" @click="onAddClick">新增</el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 70%; margin-top: 0.2rem">
      <el-table-column
        prop="nickname"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="sexString"
        label="性别"
        width="50">
      </el-table-column>
      <el-table-column
        prop="typeString"
        label="是否星厨"
        width="130">
      </el-table-column>
      <el-table-column
        prop="headimgurl"
        label="头像"
        width="130">
        <template slot-scope="scope">
          <img :src="getFullImageUrl(scope.row.headimgurl)" alt="" style="width: 0.8rem;height: 0.8rem">
        </template>
      </el-table-column>
      <el-table-column
        prop="videoUrl"
        label="介绍视频">
      </el-table-column>
      <el-table-column
        prop="info"
        label="星厨介绍"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="collocationImgUrl"
        label="搭配笔记图片"
        width="130"
      >
        <template slot-scope="scope">
          <img :src="getFullImageUrl(scope.row.collocationImgUrl)" alt="" style="width: 0.8rem;height: 0.8rem">
        </template>
      </el-table-column>
      <el-table-column
        prop="collocationInfo"
        label="搭配笔记描述"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onEditClick(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="onEditClick(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      @current-change="currentChange"
      style="float: right; margin-right: 30%"
    >
    </el-pagination>

    <div style="margin-top: 0.2rem; display: none">
      <label style="font-size: 0.14rem; margin-right: 0.2rem;">首页星厨</label>
      <el-select v-model="homeStarChef" placeholder="请选择星厨">
        <el-option
          v-for="item in starChef"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 0.2rem;">确定</el-button>
    </div>

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" :append-to-body="true"
               style="width: 60%; margin-top: 0.2rem">
      <el-form :model="form" :label-position="labelPosition" label-width="1.2rem">
        <el-form-item label="姓名">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否为星厨">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            name="filedata"
            :limit="1"
            accept="image/jpeg,image/png"
            :onError="uploadError"
            :file-list="fileList"
            :onSuccess="uploadSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <el-button>请选择文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="介绍视频">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            name="filedata"
            :limit="1"
            accept=".mp4"
            :onError="uploadError"
            :file-list="fileList"
            :onSuccess="uploadSuccessForVideo"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemoveForVideo">
            <el-button>请选择文件</el-button>
            <img width="100%" :visible.sync="form.dialogVisible" :src="form.videoUrl" alt="">
          </el-upload>
        </el-form-item>
        <el-form-item label="搭配笔记图片">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            name="filedata"
            :limit="1"
            accept="image/jpeg,image/png"
            :onError="uploadError"
            :file-list="fileList"
            :onSuccess="uploadSuccessForCollocationImg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handlerRemoveForCollectionImg">
            <el-button>请选择文件</el-button>
            <img width="100%" :visible.sync="form.dialogVisible" :src="form.collocationImgUrl" alt="">
          </el-upload>
        </el-form-item>
        <el-form-item label="搭配笔记描述">
          <el-input v-model="form.collocationInfo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="厨师简介">
          <el-input v-model="form.info" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onFormConfirmClick()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import API_ROOT from "../../../api";
  import IMAGE_ROOT from "../../../api"
  import {chefModel} from "../../../api/chefModel";

  export default {
    name: 'starChefManage',
    data() {
      return {
        tableData:[],
        dialogFormVisible: false,
        editName: '',
        labelPosition: "right",
        isAdd: false,
        formTitle: '',
        form: {
          id: '',
          nickname: '',
          headimgurl: '',
          sex: 1,
          info: '',
          likes: 0,
          type: 2,
          videoUrl: '',
          collocationImgUrl: '',
          collocationInfo: '',
          remark: '',
        },

        fileList: [],
        uploadUrl: API_ROOT.API_ROOT + "/common/v1/uploadImg?type=1",//上传地址

        starChef: [{
          value: '星厨James',
          label: '星厨James'
        }, {
          value: '星厨Able',
          label: '星厨Able'
        }, {
          value: '星厨Tom',
          label: '星厨Tom'
        }],

        starFood: [{
          value: '星厨菜特色牛肉',
          label: '星厨菜特色牛肉'
        }, {
          value: '星厨菜特色牛排',
          label: '星厨菜特色牛排'
        }, {
          value: '星厨菜特色牛扒',
          label: '星厨菜特色牛扒'
        }],

        homeStarChef: '',

        totalCount: 100,
        currentPage: 1,
        pageSize: 10,
      }
    },
    methods: {
      onEditClick: function (index, row) {
        console.log(index + "--" + row);
        this.formTitle = "编辑星厨";
        this.isAdd = false;
        this.form = {
          id: row.id,
          nickname: row.nickname,
          headimgurl: row.headimgurl,
          sex: row.sex,
          info: row.info,
          likes: row.likes,
          type: row.type,
          videoUrl: row.videoUrl,
          collocationImgUrl: row.collocationImgUrl,
          collocationInfo: row.collocationInfo,
          remark: row.remark,
        }
        this.dialogFormVisible = true;
      },
      onAddClick: function () {
        this.formTitle = "添加星厨";
        this.isAdd = true;
        this.dialogFormVisible = true;
      },
      onFormConfirmClick: function () {
        this.dialogFormVisible = false;
        let starChef = this.form;
        if (this.isAdd) {
          chefModel.add(starChef.nickname, starChef.sex, starChef.type, starChef.headimgurl, starChef.info,
            starChef.videoUrl, starChef.collocationImgUrl, starChef.collocationInfo, starChef.likes, starChef.remark,
            res =>{
              this.currentPage = 1;
              this.pagedQueryList();
            }, error => {

            }
          )
        } else {
          chefModel.updateById(starChef.id, starChef.nickname, starChef.sex, starChef.type, starChef.headimgurl, starChef.info,
            starChef.videoUrl, starChef.collocationImgUrl, starChef.collocationInfo, starChef.likes, starChef.remark,
            res =>{
              this.currentPage = 1;
              this.pagedQueryList();
            }, error => {

            }
          )
        }
      },

      uploadError(response, file, fileList) {
        this.$message('上传失败，请重试');
      },
      // 上传成功后的回调
      uploadSuccess(response, file, fileList) {
        console.log(response);
        this.form.headimgurl = response.data;
      },
      uploadSuccessForVideo(response, file, fileList){
        console.log(response);
        this.form.videoUrl = response.data;
      },
      uploadSuccessForCollocationImg(response, file, fileList){
        console.log(response)
        this.form.collocationImgUrl = response.data;
      },
      // 删除上传
      handleRemove(file, fileList) {
        this.form.headimgurl = '';
      },
      handleRemoveForVideo(file, fileList) {
        this.form.videoUrl = '';
      },
      handlerRemoveForCollectionImg(file, fileList){
        this.form.collocationImgUrl = '';
      },
      // 预览
      handlePictureCardPreview(file) {
        this.form.dialogVisible = true;
      },
      currentChange(page){
        this.currentPage = page
        this.pagedQueryList()
      },
      pagedQueryList(){
        chefModel.pagedQueryList(this.currentPage, this.pageSize, null, res => {
          console.log(JSON.stringify(res.data.data.items))
          let items = res.data.data.items;
          console.log("item-->" + items);
          this.tableData = [];
          items.forEach(item => {
            item.typeString = (item.type == 1) ? "是" : "否"
            item.sexString = (item.sex == 2) ? "女" : "男"
            this.tableData.push(item)
            // this.totalPage = res.data.data.totalPage
            this.totalCount = res.data.data.totalNum;
          });
          this.tableData = items;
        }, fail => {

        })
      },
      getFullImageUrl(url){
        return IMAGE_ROOT.IMAGE_ROOT + url;
      },
    },

    created() {
      this.pagedQueryList()
    }
  }
</script>

<style lang="less" scoped>
</style>
