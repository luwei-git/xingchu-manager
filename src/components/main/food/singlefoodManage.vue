<template>
  <div>
    <div class="top-title-common"><h3>菜品管理 > 单菜管理</h3></div>
    <el-button type="primary" style="float: right; margin: 0.2rem 30% 0.2rem 0" @click="onAddClick">新增</el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 70%; margin-top: 0.2rem">
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pic"
        label="图片"
        width="180">
        <template slot-scope="scope">
          <img :src="getFullImageUrl(scope.row.menuUrl)" alt="" style="width: 0.8rem;height: 0.8rem">
        </template>
      </el-table-column>
      <el-table-column
        prop="money"
        label="单价(元)">
      </el-table-column>
      <el-table-column
        prop="calorie"
        label="卡路里">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="类别">
      </el-table-column>
      <el-table-column
        prop="typeString"
        label="是否星厨菜">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="statusString"
        label="状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onEditClick(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="onDeleteClick(scope.$index, scope.row)">删除</el-button>
          <!--<el-button type="text" size="small" @click="onEditClick(scope.$index, scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      @current-change="currentChange"
      style="float: right; margin-right: 30%"
      :current-page="currentPage"
      >
    </el-pagination>

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" :append-to-body="true"
               style="width: 80%; margin-top: 0.2rem" @close="onDialogClose">
      <el-form :model="form" :label-position="labelPosition" label-width="1.0rem">
        <el-form-item label="名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片">
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
            <!--<img width="100%" :visible.sync="form.dialogVisible" :src="getFullImageUrl(form.imageUrl)" alt="">-->
          </el-upload>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="form.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="卡路里">
          <el-input v-model="form.calorie" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="初始likes">
          <el-input v-model="form.likes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="form.tag" placeholder="请选择">
            <el-option
              v-for="item in category"
              :key="item.itemValue"
              :label="item.itemValue"
              :value="item.itemValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为星厨菜">
          <el-radio-group v-model="form.type">
            <el-radio :label="3">否</el-radio>
            <el-radio :label="2">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="配菜" v-if="form.type==2">
          <el-transfer
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入菜名"
            v-model="value"
            :data="normalFoods"
            :titles="['未选配菜', '已选配菜']"
          >
          </el-transfer>
        </el-form-item>
        <el-form-item label="所属星厨" v-if="form.type==2">
          <el-select v-model="form.createUserId" placeholder="请选择">
            <el-option
              v-for="item in starChefs"
              :key="item.id"
              :label="item.nickname"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述信息">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onFormConfirmClick">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="deleteDialogFormVisible"
      width="30%"
      :append-to-body="true">
      <span>{{deleteText}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirmDeleteClick()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import API_ROOT from "../../../api";
  import IMAGE_ROOT from "../../../api"
  import {foodModel} from "../../../api/foodModel";
  import {dictionaryModel} from "../../../api/dictionaryModel";
  import {chefModel} from "../../../api/chefModel";

  export default {
    name: 'distribute-recode',
    data() {
      return {
        tableData:[],
        dialogFormVisible: false,
        editName: '',
        labelPosition: "right",
        isAdd: false,
        formTitle: '',
        totalCount: 100,
        currentPage: 1,
        pageSize: 10,

        form: {
          menuId: '',
          name: '',
          money: '',
          calorie: '',
          tag: '',
          type: 1,
          remark: '',
          likes: 0,
          createUserId: null,
          menuRelations:[],
        },

        category: [],
        isMainFoodRadio: 0,
        starChefs:[],


        fileList: [],
        uploadUrl: API_ROOT.API_ROOT + "/common/v1/uploadImg?type=2",//上传地址
        lastImageUrl: '',

        deleteDialogFormVisible: false,
        normalFoods:[],
        deleteText: '',
        rightDefaultChecked:[],
        value:[],
      }
    },
    methods: {
      onEditClick: function (index, row) {
        console.log(index + "--" + JSON.stringify(row));
        this.formTitle = "编辑";
        this.editName = row.name;
        this.isAdd = false;
        this.form = {
          menuId: row.menuId,
          name: row.name,
          money: row.money,
          calorie: row.calorie,
          tag: row.tag,
          type: row.type,
          remark: row.remark,
          likes: row.likes,
          menuUrl: row.menuUrl,
          createUserId: row.createUserId,
        }
        if(row.menuRelationIds!=null && row.menuRelationIds != ""){
           this.value = row.menuRelationIds.split(",");
        }else{
          this.value = [];
        }
        console.log("form-->" + JSON.stringify(this.form))
        this.dialogFormVisible = true;
      },
      onAddClick: function () {
        this.formTitle = "新增";
        this.editName = '';
        this.isAdd = true;
        this.dialogFormVisible = true;
      },
      onDeleteClick: function (index, row) {
        this.editIndex = index;
        this.deleteText = "确认删除[" + this.tableData[this.editIndex].name + "]该菜品吗?"
        this.deleteDialogFormVisible = true;
      },
      onConfirmDeleteClick: function () {
        this.deleteDialogFormVisible = false;
        let itemId = this.tableData[this.editIndex].menuId;
        foodModel.deleteById(itemId, res => {
          this.currentPage = 1;
          this.pagedQueryList();
        }, res => {

        })
      },
      onFormConfirmClick: function () {
        this.dialogFormVisible = false;
        let food = this.form
        let menuUrl = food.menuUrl;
        let logoUrl = "";
        let createUserId = food.createUserId;
        let menuRelations = this.getMenuRelations();
        if (this.isAdd) {
          let status = 1;
          foodModel.add(food.name, food.money, food.remark, food.likes, food.type, food.tag, food.calorie, status,
            menuUrl, logoUrl, food.remark, createUserId, menuRelations, success => {
              console.log("success");
              this.currentPage = 1;
              this.pagedQueryList();
            }, fail => {
              console.log("fail");
            })
        } else {
          console.log("normalFood-->" + JSON.stringify(this.normalFoods));
          foodModel.updateById(food.menuId, food.name, food.money,
            food.detail, food.likes, food.type, food.tag, food.calorie,
            food.status, menuUrl, logoUrl, food.remark, createUserId, menuRelations, success => {
              this.currentPage = 1;
              this.pagedQueryList();
            }, fail => {
              console.log(fail)
            })
        }
      },

      getMenuRelations(){
        if(this.value == null || this.value.length == 0){
          return null;
        }else{
          let menuRelationsString = "";
          for(let i=0;i<this.value.length;i++){
            menuRelationsString += this.value[i];
            if(i!==this.value.length -1){
               menuRelationsString += ",";
            }
          }
          return menuRelationsString;
        }
      },

      uploadError(response, file, fileList) {
        this.$message('上传失败，请重试');
      },
      // 上传成功后的回调
      uploadSuccess(response, file, fileList) {
        console.log(response);
        this.form.menuUrl = response.data;
        console.log(this.form.menuUrl)
        let dom = document.querySelector('.el-upload');
        this.lastImageUrl = this.form.menuUrl;
        dom.style.display = 'none';
      },
      // 删除上传
      handleRemove(file, fileList) {
        let dom = document.querySelector('.el-upload');
        dom.style.display = 'inline-block';
        this.form.menuUrl = '';
      },
      // 预览
      handlePictureCardPreview(file) {
        this.form.dialogVisible = true;
      },
      currentChange(page){
        console.log("currentChange-->" + page)
        this.currentPage = page
        this.pagedQueryList()
      },
      pagedQueryList(){
        foodModel.pagedQueryList(this.currentPage, this.pageSize, res => {
            console.log(JSON.stringify(res.data.data.items))
            let items = res.data.data.items;
            this.tableData = [];
            items.forEach(item => {
              item.typeString = (item.type == 2) ? "是" : "否"
              item.statusString = (item.status == 1) ? "已上架": "已下架"
              this.tableData.push(item)
              // this.totalPage = res.data.data.totalPage
              this.totalCount = res.data.data.totalNum;
            });
          },
          fail => {

          }
        )
      },
      onDialogClose(){
        this.form = {}
        this.form.menuUrl = this.lastImageUrl;
        this.form.type = 1;
      },
      queryCategoryList: function () {
        dictionaryModel.queryList(dictionaryModel.TYPE_CODE_FOOD_CATEGORY, res => {
          this.category = res.data.data;
        }, res => {

        })
      },
      getFullImageUrl(url){
        return IMAGE_ROOT.IMAGE_ROOT + url;
      },
      queryStarChief(){
        chefModel.pagedQueryList(this.currentPage, 100, 1, res => {
          console.log(JSON.stringify(res.data.data.items))
          let items = res.data.data.items;
          this.starChefs = items;
        }, fail => {

        })
      },
      queryNoStarFood(){
        foodModel.queryNoStarFood(res =>{
          let items = res.data.data.items;
          items.forEach(item => {
            item.label = item.name
            item.value = item.menuId
            item.key = item.menuId
            this.normalFoods.push(item)
          });
          console.log("normalFoods-->"+JSON.stringify(this.normalFoods))
        }, fail => {

        })
      },
      filterMethod(query, item) {
        console.log(item);
        console.log(JSON.stringify(item))
        return item.name.indexOf(query) > -1;
      }

    },
    created() {
      this.pagedQueryList()
      this.queryCategoryList()
      this.queryStarChief()
      this.queryNoStarFood()
    }
  }
</script>

<style lang="less" scoped>
</style>
