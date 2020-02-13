<template>
  <div>
    <div class="top-title-common"><h3>菜品管理 > 类别管理</h3></div>
    <el-button type="primary" style="float: right; margin: 0.2rem 40% 0.2rem 0" @click="onAddClick">新增类别</el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 60%; margin-top: 0.2rem">
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mainFoodCount"
        label="主菜数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="totalFoodCount"
        label="总菜数量">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onEditClick(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" :append-to-body="true" style="width: 60%; margin-top: 0.2rem">
      <el-form :model="form" :label-position="labelPosition" label-width="0.8rem">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="editName" autocomplete="off"></el-input>
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
  export default {
    name: 'distribute-recode',
    data() {
      return {
        tableData: [{
          name: '肉类',
          mainFoodCount: 10,
          totalFoodCount: 20
        }, {
          name: '鲜蔬',
          mainFoodCount: 20,
          totalFoodCount: 30
        }, {
          name: '坚果',
          mainFoodCount: 40,
          totalFoodCount: 60
        }, {
          name: '酱料调味',
          mainFoodCount: 10,
          totalFoodCount: 100
        }],
        dialogFormVisible: false,
        editName:'',
        labelPosition: "right",
        isAdd: false,
        formTitle:'',
      }
    },
    methods:{
      onEditClick: function(index, row){
        console.log(index + "--" + row);
        this.formTitle = "编辑分类名称";
        this.editName = row.name;
        this.isAdd = false;
        this.dialogFormVisible = true;
      },
      onAddClick: function () {
        this.formTitle = "添加分类名称";
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
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
