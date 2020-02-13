<template>
  <div>
    <div class="top-title-common"><h3>菜品管理 > 类别管理</h3></div>
    <el-button type="primary" style="float: right; margin: 0.2rem 40% 0.2rem 0" @click="onAddClick">新增类别</el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 60%; margin-top: 0.2rem">
      <el-table-column
        prop="itemSort"
        label="排序"
      >
      </el-table-column>
      <el-table-column
        prop="itemValue"
        label="名称"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
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
      style="float: right; margin-right: 40%"
    >
    </el-pagination>


    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" :append-to-body="true"
               style="width: 60%; margin-top: 0.2rem">
      <el-form :model="form" :label-position="labelPosition" label-width="0.8rem">
        <el-form-item label="分类名称">
          <el-input v-model="form.itemValue" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" :label-position="labelPosition" label-width="0.8rem">
        <el-form-item label="排序">
          <el-input v-model="form.itemSort" autocomplete="off"></el-input>
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
  import {dictionaryModel} from "../../../api/dictionaryModel";

  export default {
    name: 'distribute-recode',
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        deleteDialogFormVisible: false,
        editName: '',
        labelPosition: "right",
        isAdd: false,
        formTitle: '',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        editIndex: 0,
        form: {
          itemValue: '',
          itemSort: 0
        },
        deleteText: '',
      }
    },
    methods: {
      onEditClick: function (index, row) {
        console.log(index + "--" + JSON.stringify(row));
        this.editIndex = index;
        this.formTitle = "编辑分类名称";
        this.form.itemValue = row.itemValue;
        this.form.itemSort = row.itemSort;
        this.isAdd = false;
        this.dialogFormVisible = true;
      },
      onDeleteClick: function (index, row) {
        this.editIndex = index;
        this.deleteText = "确认删除[" + this.tableData[this.editIndex].itemValue + "]该分类吗?"
        this.deleteDialogFormVisible = true;
      },
      onAddClick: function () {
        var index = 1;
        if(this.tableData.length >0){
          index = this.tableData[this.tableData.length -1].itemSort + 1;
        }
        this.form.itemSort = index;
        this.form.itemValue = '';
        this.formTitle = "添加分类名称";
        this.isAdd = true;
        this.dialogFormVisible = true;
      },
      onFormConfirmClick: function () {
        this.dialogFormVisible = false;
        if (this.isAdd) {
          dictionaryModel.addItem(this.form.itemSort, this.form.itemValue, this.form.itemSort,
            dictionaryModel.TYPE_CODE_FOOD_CATEGORY, '', res => {
              this.currentPage = 1;
              this.pagedQueryListForItem();
            }, res => {

            });
        } else {
          let data = this.tableData[this.editIndex];
          dictionaryModel.editItem(data.itemId, data.itemKey, this.form.itemValue, this.form.itemSort,
            dictionaryModel.TYPE_CODE_FOOD_CATEGORY, null, res => {
              this.currentPage = 1;
              this.pagedQueryListForItem();
            }, res => {

            })
        }
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
      queryList: function () {
        dictionaryModel.pagedQueryListForType(1, 10, dictionaryModel.TYPE_CODE_FOOD_CATEGORY, res => {
          console.log(JSON.stringify(res))
          if (res.data.data.items.length == 0) {
            console.log("empty!");
            dictionaryModel.addType(dictionaryModel.TYPE_CODE_FOOD_CATEGORY,
              dictionaryModel.TYPE_NAME_FOOD_CATEGORY,
              dictionaryModel.TYPE_SORT_FOOD_CATEGORY, res => {
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
        dictionaryModel.pagedQueryListForItem(this.currentPage, this.pageSize, dictionaryModel.TYPE_CODE_FOOD_CATEGORY, res => {
          console.log("pagedQueryListForItem==>" + JSON.stringify(res))
          this.tableData = res.data.data.items;
          this.totalCount = res.data.data.totalNum;
        }, res => {

        })
      },

      currentChange(page) {
        console.log("currentChange-->" + page)
        this.currentPage = page
        this.pagedQueryListForItem()
      },
    },
    created() {
      this.queryList()
    }
  }
</script>

<style lang="less" scoped>
</style>
