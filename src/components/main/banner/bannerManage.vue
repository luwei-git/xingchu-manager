<template>
  <div>
    <div class="top-title-common"><h3>Banner管理</h3></div>
    <el-button type="primary" style="float: right; margin: 0.2rem 30% 0.2rem 0" @click="onAddClick">新增</el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 70%; margin-top: 0.2rem">
      <el-table-column
        prop="order"
        label="排序"
        width="180">
      </el-table-column>
      <el-table-column
        prop="imageUrl"
        label="图片"
        width="180">
        <template slot-scope="scope">
          <img :src="getFullImageUrl(scope.row.imageUrl)" alt="" style="width: 0.8rem;height: 0.8rem">
        </template>
      </el-table-column>
      <el-table-column
        prop="jumpTypeString"
        label="跳转类型">
      </el-table-column>
      <el-table-column
        prop="sourceName"
        label="资源地址">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onEditClick(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="onDeleteClick(scope.$index, scope.row)">删除</el-button>
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


    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" :append-to-body="true"
               style="width: 60%; margin-top: 0.2rem">
      <el-form :model="form" :label-position="labelPosition" label-width="0.8rem">
        <el-form-item label="排序">
          <el-input v-model="form.order" autocomplete="off"></el-input>
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
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转类型">
          <el-radio-group v-model="form.jumpType">
            <el-radio :label="0">星厨</el-radio>
            <el-radio :label="1">星厨菜</el-radio>
            <el-radio :label="2">H5页面</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="星厨" v-if="form.jumpType==0">
          <el-select v-model="form.sourceId" placeholder="请选择星厨">
            <el-option
              v-for="item in starChef"
              :key="item.id"
              :label="item.nickname"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="星厨菜" v-if="form.jumpType==1">
          <el-select v-model="form.sourceIdForFood" placeholder="请选择星厨菜">
            <el-option
              v-for="item in starFood"
              :key="item.menuId"
              :label="item.name"
              :value="item.menuId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="HTML地址" v-if="form.jumpType==2">
          <el-input v-model="form.sourceNameForH5" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onFormConfirmClick()">确 定</el-button>
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
  import {dictionaryModel} from "../../../api/dictionaryModel";
  import {foodModel} from "../../../api/foodModel";
  import {chefModel} from "../../../api/chefModel";

  export default {
    name: 'bannerManage',
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        editName: '',
        labelPosition: "right",
        isAdd: false,
        formTitle: '',
        form: {
          'itemId': '',
          'order': 1,
          'imageUrl': '',
          'jumpType': 0,
          'sourceId': '',
          'sourceIdForFood': '',
          'sourceName': '',
          'sourceNameForStarChef': '',
          'sourceNameForStarFood': '',
          'sourceNameForH5': '',
        },

        uploadLimit: 1,
        fileList: [],
        uploadUrl: API_ROOT.API_ROOT + "/common/v1/uploadImg?type=2",//上传地址

        starChef: [],

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
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,

        editIndex: 0,
        deleteDialogFormVisible: false,
        deleteText: '',
        sourceSplitChar: '#||#',
      }
    },
    methods: {
      onEditClick: function (index, row) {
        console.log(index + "--" + row);
        this.formTitle = "编辑";
        this.isAdd = false;
        this.dialogFormVisible = true;
        this.form = {
          itemId: row.itemId,
          order: row.order,
          imageUrl: row.imageUrl,
          jumpType: row.jumpType,
          sourceId: row.sourceId,
          sourceIdForFood: row.sourceIdForFood,
          sourceName: row.sourceName,
          sourceNameForStarChef: row.sourceNameForStarChef,
          sourceNameForStarFood: row.sourceNameForStarFood,
          sourceNameForH5: row.sourceNameForH5,
        }
      },
      onAddClick: function () {
        this.formTitle = "添加";
        this.isAdd = true;
        this.dialogFormVisible = true;
        this.form.order = this.tableData.length + 1;
        this.form.itemValue = '';
      },
      onFormConfirmClick: function () {
        this.dialogFormVisible = false;
        var sourceUrl = '';
        if (this.form.jumpType == 0) {
          var nickname = '';
          this.starChef.forEach(item => {
            if (item.id == this.form.sourceId) {
              nickname = item.nickname;
            }
          })
          sourceUrl = nickname + this.sourceSplitChar + this.form.sourceId;
        } else if (this.form.jumpType == 1) {
          console.log("this.form.sourceIdForFood="+this.form.sourceIdForFood);
          var foodName = '';
          this.starFood.forEach(item => {
            if (item.menuId == this.form.sourceIdForFood) {
              foodName = item.name;
            }
          })
          sourceUrl = foodName + this.sourceSplitChar + this.form.sourceIdForFood;
        } else {
          sourceUrl = this.form.sourceNameForH5;
        }
        if (this.isAdd) {
          // dictionaryModel.deleteItem('9420daf0e313435f8f8695a4316d62e4')
          dictionaryModel.addItem(this.form.jumpType, this.form.imageUrl, this.form.order, dictionaryModel.TYPE_CODE_BANNER, sourceUrl,
            res => {
              this.currentPage = 1;
              this.pagedQueryListForItem();
            },
            error => {

            }
          )
        } else {
          dictionaryModel.editItem(this.form.itemId, this.form.jumpType, this.form.imageUrl, this.form.order, dictionaryModel.TYPE_CODE_BANNER, sourceUrl,
            res => {
              this.currentPage = 1;
              this.pagedQueryListForItem();
            }, res => {

            })
        }
      },

      onDeleteClick(index, row) {
        this.editIndex = index;
        this.deleteText = "确认删除该banner吗?"
        this.deleteDialogFormVisible = true;
      },

      uploadError(response, file, fileList) {
        this.$message('上传失败，请重试');
      },
      // 上传成功后的回调
      uploadSuccess(response, file, fileList) {
        console.log(response);
        this.form.imageUrl = response.data;
        console.log(this.form.imageUrl)
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
      queryList: function () {
        dictionaryModel.pagedQueryListForType(1, 10, dictionaryModel.TYPE_CODE_BANNER, res => {
          console.log(JSON.stringify(res))
          if (res.data.data.items.length == 0) {
            console.log("empty!");
            dictionaryModel.addType(dictionaryModel.TYPE_CODE_BANNER,
              dictionaryModel.TYPE_NAME_BANNER,
              dictionaryModel.TYPE_SORT_BANNER, res => {
                console.log(JSON.stringify(res))
                this.pagedQueryListForItem();
              }, res => {

              })
          } else {
            this.pagedQueryListForItem();
          }
        }, res => {

        })
      },
      pagedQueryListForItem: function () {
        dictionaryModel.pagedQueryListForItem(this.currentPage, this.pageSize, dictionaryModel.TYPE_CODE_BANNER, res => {
          let items = res.data.data.items;
          this.tableData = [];
          items.forEach(item => {
            item.order = item.itemSort;
            item.imageUrl = item.itemValue;
            item.jumpType = item.itemKey;
            if (item.itemKey == 0) {
              item.sourceNameForStarChef = item.description.split(this.sourceSplitChar)[0];
              item.sourceId = item.description.split(this.sourceSplitChar)[1];
              item.jumpTypeString = "星厨";
              item.sourceName = item.sourceNameForStarChef;
            } else if (item.itemKey == 1) {
              item.sourceNameForStarFood = item.description.split(this.sourceSplitChar)[0];
              item.sourceIdForFood = item.description.split(this.sourceSplitChar)[1];
              item.jumpTypeString = "星厨菜";
              item.sourceName = item.sourceNameForStarFood;
            } else {
              item.sourceNameForH5 = item.description;
              item.jumpTypeString = "活动HTML地址";
              item.sourceName = item.description;
            }
            this.tableData.push(item)
            this.totalCount = res.data.data.totalNum;
          })
        }, res => {

        })
      },
      currentChange(page) {
        console.log("currentChange-->" + page)
        this.currentPage = page
        this.pagedQueryListForItem()
      },
      getFullImageUrl(url) {
        return IMAGE_ROOT.IMAGE_ROOT + url;
      },
      getStarFood() {
        foodModel.pagedQueryListForStarFood(res => {
            console.log(JSON.stringify(res.data.data.items))
            let items = res.data.data.items;
            this.starFood = [];
            this.starFood = items;
          },
          fail => {

          }
        )
      },
      queryStarChief() {
        chefModel.pagedQueryList(this.currentPage, 100, 1, res => {
          console.log(JSON.stringify(res.data.data.items))
          let items = res.data.data.items;
          this.starChef = items;
        }, fail => {

        })
      },
      onConfirmDeleteClick: function () {
        this.deleteDialogFormVisible = false;
        let itemId = this.tableData[this.editIndex].itemId;
        dictionaryModel.deleteItem(itemId, res => {
          this.currentPage = 1;
          this.pagedQueryListForItem();
        }, res => {

        })
      },
    },
    created() {
      this.queryList()
      this.getStarFood()
      this.queryStarChief()
    }
  }
</script>

<style lang="less" scoped>
</style>
