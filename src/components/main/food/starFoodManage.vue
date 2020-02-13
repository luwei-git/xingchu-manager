<template>
  <div>
    <div class="top-title-common"><h3>菜品管理 > 星厨菜管理</h3></div>
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
          <img :src="scope.row.pic" alt="" style="width: 0.8rem;height: 0.8rem">
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价(元)">
      </el-table-column>
      <el-table-column
        prop="calorie"
        label="卡路里">
      </el-table-column>
      <el-table-column
        prop="mainFood"
        label="主菜">
      </el-table-column>
      <el-table-column
        prop="normalFoods"
        label="配菜">
        <template slot-scope="scope">
          <div v-for="item in scope.row.normalFoods">
            <label>{{item.food}}</label>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="desc"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onEditClick(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="onEditClick(scope.$index, scope.row)">下架</el-button>
          <el-button type="text" size="small" @click="onEditClick(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" :append-to-body="true" style="width: 80%; margin-top: 0.2rem">
      <el-form :model="form" :label-position="labelPosition" label-width="0.8rem">
        <el-form-item label="名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            name="filedata"
            :limit="uploadLimit"
            accept="image/jpeg,image/png"
            :onError="uploadError"
            :file-list="fileList"
            :onSuccess="uploadSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <el-button>请选择文件</el-button>
            <img width="100%" :visible.sync="form.dialogVisible" :src="form.imageUrl" alt="">
          </el-upload>
        </el-form-item>
        <el-form-item label="主菜">
          <el-select v-model="form.mainFoodsValue" placeholder="请选择">
            <el-option
              v-for="item in mainFoods"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配菜">
          <el-transfer
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入菜名"
            v-model="form.normalFoodsValue"
            :data="normalFoods"
            :titles="['Source', 'Target']"
          >
          </el-transfer>
        </el-form-item>
        <el-form-item label="描述信息">
          <el-input v-model="form.desc" autocomplete="off"></el-input>
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

  export default {
    name: 'distribute-recode',
    data() {

      return {
        tableData: [{
          name: '星厨牛肉',
          pic: 'https://f11.baidu.com/it/u=1337323803,3409185307&fm=72',
          calorie: 200,
          price: 100.00,
          mainFood: '特色牛肉',
          normalFoods: [
            {
              'food': '芹菜'
            },
            {
              'food': '辣椒'
            }
          ],
          desc: "星厨特色牛肉",
          status: "已上架"
        }, {
          name: '星厨牛肉',
          pic: 'https://f11.baidu.com/it/u=1337323803,3409185307&fm=72',
          calorie: 200,
          price: 100.00,
          mainFood: '特色牛肉',
          normalFoods: [
            {
              'food': '芹菜'
            },
            {
              'food': '辣椒'
            }
          ],
          desc: "星厨特色牛肉",
          status: "已上架"
        }, {
          name: '星厨牛肉',
          pic: 'https://f11.baidu.com/it/u=1337323803,3409185307&fm=72',
          calorie: 200,
          price: 100.00,
          mainFood: '特色牛肉',
          normalFoods: [
            {
              'food': '芹菜'
            },
            {
              'food': '辣椒'
            }
          ],
          desc: "星厨特色牛肉",
          status: "已上架"
        }, {
          name: '星厨牛肉',
          pic: 'https://f11.baidu.com/it/u=1337323803,3409185307&fm=72',
          calorie: 200,
          price: 100.00,
          mainFood: '特色牛肉',
          normalFoods: [
            {
              'food': '芹菜'
            },
            {
              'food': '辣椒'
            }
          ],
          desc: "星厨特色牛肉",
          status: "已上架"
        }],
        dialogFormVisible: false,
        editName:'',
        labelPosition: "right",
        isAdd: false,
        formTitle:'',

        form: {
          name:'',
          number:'',
          imageUrl: '',
          nameMan:'',
          codeMan:'',
          email:'',
          dialogVisible: false
        },
        uploadLimit: 1,
        fileList: [],
        uploadUrl: API_ROOT.API_ROOT + "/common/v1/uploadImg",//上传地址


        mainFoods: [{
          value: '主菜牛肉1',
          label: '主菜牛肉1'
        }, {
          value: '主菜牛肉2',
          label: '主菜牛肉2'
        }, {
          value: '主菜牛肉3',
          label: '主菜牛肉3'
        }, {
          value: '主菜牛肉4',
          label: '主菜牛肉4'
        }, {
          value: '主菜牛肉5',
          label: '主菜牛肉5'
        }],
        mainFoodsValue: '',

        normalFoods: [
          {
            label: '青菜',
            value: 'v1',
            key: 0,
          }, {
            label: '大白菜',
            value: 'v2',
            key: 1,
          }, {
            label: '黄瓜',
            value: 'v3',
            key: 2,
          }, {
            label: '西红柿',
            value: 'v4',
            key: 3,
          }, {
            label: '青椒',
            value: 'v5',
            key: 4,
          },{
            label: '孜然',
            value: 'v6',
            key: 5,
          }
        ],
        normalFoodsValue: [

        ],

      }
    },
    methods:{
      onEditClick: function(index, row){
        console.log(index + "--" + row);
        this.formTitle = "编辑";
        this.editName = row.name;
        this.isAdd = false;
        this.dialogFormVisible = true;
      },
      onAddClick: function () {
        this.formTitle = "添加";
        this.editName = '';
        this.isAdd = true;
        this.dialogFormVisible = true;
      },
      onFormConfirmClick: function () {
        this.dialogFormVisible = false;
        if(this.isAdd){
          let food = {name: this.editName, mainFoodCount: 0, totalFoodCount: 0}
          this.tableData.push(food);
        }else{

        }
      },
      uploadError (response, file, fileList) {
        this.$message('上传失败，请重试');
      },
      // 上传成功后的回调
      uploadSuccess (response, file, fileList) {
        console.log(response);
        this.form.imageUrl = response.data;
        let dom = document.querySelector('.el-upload');
        dom.style.display = 'none';
      },
      // 删除上传
      handleRemove(file, fileList) {
        let dom = document.querySelector('.el-upload');
        dom.style.display = 'inline-block';
        this.form.imageUrl = '';
      },
      // 预览
      handlePictureCardPreview(file) {
        this.form.dialogVisible = true;
      },

      filterMethod(query, item) {
        console.log(item);
        console.log(JSON.stringify(item))
        return item.label.indexOf(query) > -1;
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
