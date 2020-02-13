<template>
  <div>
    <div class="top-title-common"><h3>机器管理 > 机器管理</h3></div>
    <el-button type="primary" style="float: right; margin: 0.2rem 40% 0.2rem 0" @click="onAddClick">新增机器</el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 60%; margin-top: 0.2rem">
      <!--<el-table-column-->
        <!--prop="sortNum"-->
        <!--label="排序"-->
      <!--&gt;-->
      <!--</el-table-column>-->
      <el-table-column
        prop="name"
        label="名称"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
      >
      </el-table-column>
      <el-table-column
        prop="statusString"
        label="状态"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onEditClick(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="onManageGoodsWayClick(scope.$index, scope.row)">管理货道</el-button>
          <el-button type="text" size="small" @click="onCloneClick(scope.$index, scope.row)">克隆</el-button>
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


    <el-dialog :title="machineTitle" :visible.sync="addMachineFormVisible" :append-to-body="true"
               style="width: 60%; margin-top: 0.2rem">
      <!--<el-form :model="addMachineForm" :label-position="labelPosition" label-width="0.8rem">-->
        <!--<el-form-item label="排序">-->
          <!--<el-input v-model="addMachineForm.sortNum" autocomplete="off"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <el-form :model="addMachineForm" :label-position="labelPosition" label-width="0.8rem">
        <el-form-item label="名称">
          <el-input v-model="addMachineForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="addMachineForm" :label-position="labelPosition" label-width="0.8rem">
        <el-form-item label="地址">
          <el-input v-model="addMachineForm.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="addMachineForm" :label-position="labelPosition" label-width="0.8rem">
        <el-form-item label="经纬度">
          <el-input v-model="addMachineForm.location" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-lable>经纬度从网址标注并复制过来http://api.map.baidu.com/lbsapi/getpoint/index.html</el-lable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addMachineFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddMachineFormClick()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="管理货道" :visible.sync="goodsWayFormVisible" :append-to-body="true"
               >
      <el-button type="primary" style="float: right; margin: 0.2rem 40% 0.2rem 0" @click="onAddGoodsWayClick">新增货道</el-button>
      <el-table
        :data="goodsWayData"
        stripe
        style="width: 60%; margin-top: 0.2rem">
        <el-table-column
          prop="sortnum"
          label="货道号"
        >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="菜品"
        >
        </el-table-column>
        <el-table-column
          prop="num"
          label="存货量"
        >
        </el-table-column>

        <el-table-column
          prop="statusString"
          label="状态"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onGoodsWayEditClick(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="onGoodsWayDeleteClick(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog :title="goodsWayTitle" :visible.sync="addGoodsWayFormVisible" :append-to-body="true"
               >
      <el-form :model="addGoodsWayForm" :label-position="labelPosition" label-width="0.8rem">
        <el-form-item label="货道号">
          <el-input v-model="addGoodsWayForm.sortnum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="存货量">
          <el-input v-model="addGoodsWayForm.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="货道配菜">
          <el-select v-model="addGoodsWayForm.goodId" placeholder="请选择">
            <el-option
              v-for="item in foods"
              :key="item.menuId"
              :label="item.name"
              :value="item.menuId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGoodsWayFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddGoodsWayFormClick()">确 定</el-button>
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
  import {machineModel} from "../../../api/machineModel";
  import {goodsWayModel} from "../../../api/goodsWayModel";
  import {foodModel} from "../../../api/foodModel";

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
        goodsWayFormVisible: false,
        goodsWayData: [],
        addMachineFormVisible: false,
        addMachineForm: {
          sortNum: 1,
          name: '',
          address: '',
          latitude: 0.0,
          longitude: 0.0,
          location: ''
        },
        addGoodsWayForm:{
          sortnum: null,
          name: '',
          num: 10,
          remark: '',
        },

        addGoodsWayFormVisible: false,
        storeId: '',
        foods: [],
        deleteType: 0,
        editType: 0, // 0 add, 1 edit
        goodsWayTitle: '新增货道'
      }
    },
    methods: {
      onEditClick: function (index, row) {
        console.log(index + "--" + JSON.stringify(row));
        this.editIndex = index;
        this.machineTitle = "编辑机器";
        this.dialogFormVisible = true;
        this.addMachineForm = row;
        this.editType = 1;
        this.addMachineFormVisible = true;

      },
      onCloneClick: function (index, row) {
        // console.log(index + "--" + JSON.stringify(row));
        // this.editIndex = index;
        // this.formTitle = "克隆机器";
        // this.form.itemValue = row.itemValue;
        // this.form.itemSort = row.itemSort;
        // this.isAdd = false;
        // this.dialogFormVisible = true;
      },

      onManageGoodsWayClick: function (index, row) {
        console.log(index + "--" + JSON.stringify(row));
        this.goodsWayFormVisible = true;
        this.storeId = row.id;
        this.pageQueryGoodsWay();
      },

      onAddGoodsWayClick: function (index, row) {
        this.editType = 0;
        this.goodsWayTitle = '新增货道';
        this.addGoodsWayFormVisible = true;
      },

      onAddGoodsWayFormClick: function () {
        var remark = '';
        for(var i=0;i<this.foods.length;i++){
          if(this.foods[i].menuId == this.addGoodsWayForm.goodId){
            remark = this.foods[i].name;
            break;
          }
        }
        if(this.editType == 0){
          goodsWayModel.add(this.addGoodsWayForm.sortnum, this.storeId, this.addGoodsWayForm.num, this.addGoodsWayForm.goodId, remark, res=>{
            this.addGoodsWayFormVisible = false;
            this.pageQueryGoodsWay();
          }, res=>{

          })
        }else{
          goodsWayModel.updateById(this.addGoodsWayForm.id, this.addGoodsWayForm.sortnum, this.storeId, this.addGoodsWayForm.num, this.addGoodsWayForm.goodId, remark, res=>{
            this.addGoodsWayFormVisible = false;
            this.pageQueryGoodsWay();
          }, res=>{

          })
        }
      },
      onGoodsWayEditClick: function (index, row) {
        this.addGoodsWayFormVisible = true;
        this.addGoodsWayForm = row;
        this.editIndex = index;
        this.editType = 1;
        this.goodsWayTitle = '编辑货道';
        this.addGoodsWayFormVisible = true;
        // goodsWayModel.updateById(row.id, )
      },

      pageQueryGoodsWay: function () {
        goodsWayModel.pagedQueryList(1, 200, this.storeId, res => {
          console.log("goodsWay--" + JSON.stringify(res));
          let items = res.data.data.items;
          this.goodsWayData=[];
          items.forEach(item => {
            item.statusString = (item.status == 1) ? "正常" : "异常"
            this.goodsWayData.push(item)
          });
        }, res => {

        })
      },

      onGoodsWayDeleteClick: function (index, row) {
        this.deleteType = 1;
        this.editIndex = index;
        this.deleteText = "确认删除[" + row.sortnum + "]该货道吗?"
        this.deleteDialogFormVisible = true;
      },

      onDeleteClick: function (index, row) {
        this.deleteType = 0;
        this.editIndex = index;
        this.deleteText = "确认删除[" + this.tableData[this.editIndex].name + "]该机器吗?"
        this.deleteDialogFormVisible = true;
      },
      onAddClick: function () {
        // var index = 1;
        // if (this.tableData.length > 0) {
        //   index = this.tableData[this.tableData.length - 1].sortNum + 1;
        // }
        // this.addMachineForm.sortNum = index;
        this.machineTitle = "添加机器";
        this.editType = 0;
        this.addMachineFormVisible = true;
      },
      onAddMachineFormClick: function () {
        let data = this.addMachineForm;
        if (data.name == '') {
          this.$message('机器名称不能为空');
          return;
        }
        if (data.address == '') {
          this.$message('地址不能为空');
          return;
        }
        if (data.location == '') {
          this.$message('经纬度不能为空');
          return;
        }
        let longitude = data.location.split(",")[0];
        let latitude = data.location.split(",")[1];
        if(this.editType == 0){
          machineModel.add(data.name, data.sortNum, data.address, latitude, longitude, res => {
            this.addMachineFormVisible = false;
            this.queryList();
          }, fail => {

          })
        }else{
          machineModel.updateById(data.id, data.name, data.sortNum, data.address, latitude, longitude, res => {
            this.addMachineFormVisible = false;
            this.queryList();
          }, fail => {

          })
        }

      },
      onConfirmDeleteClick: function () {
        this.deleteDialogFormVisible = false;
        if(this.deleteType == 0){
          machineModel.deleteById(this.tableData[this.editIndex].id, res=>{
            this.queryList();
          }, res=>{

          })
        }else{
          goodsWayModel.deleteById(this.goodsWayData[this.editIndex].id, res=>{
            this.pageQueryGoodsWay();
          }, res=>{

          })
        }
      },
      queryList: function () {
        machineModel.pagedQueryList(1, 10, res => {
          console.log(JSON.stringify(res))
          let items = res.data.data.items;
          this.tableData = [];
          items.forEach(item => {
            item.statusString = (item.status == 1) ? "正常" : "异常"
            item.location = item.longitude + "," + item.latitude;
            this.tableData.push(item)
          });
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
      getFoods(){
        foodModel.pagedQueryList(1, 200, res => {
            console.log(JSON.stringify(res.data.data.items))
            this.foods = res.data.data.items;
          },
          fail => {

          }
        )
      },
    },
    created() {
      this.queryList()
      this.getFoods();
    }
  }
</script>

<style lang="less" scoped>
</style>
