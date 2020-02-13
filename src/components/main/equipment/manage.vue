<template>
  <div class="manage">
    <div class="top-title-common"><h3>管理 > 设备管理</h3></div>
    <div class="manage-content">
      <div class="search">
        <ul class="top">
          <li>
            <el-input
              style="width:90%;"
              placeholder="请输入设备IMEI/设备SN"
              clearable>
            </el-input>
          </li>
          <li>
            <label for="">所属机构：</label>
            <el-select v-model="org" style="width: 60%" clearable placeholder="请选择">
              <el-option v-for="item in organizationList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.name"></el-option>
            </el-select>
          </li>
          <li>
            <label for="">建档时间：</label>
            <el-date-picker
              class="datetime_med"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
            <span>至</span>
            <el-date-picker
              class="datetime_med"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </li>
        </ul>
        <ul class="bottom">
          <li>
            <el-button type="primary">搜索</el-button>
          </li>
          <li>
            <el-button>清空</el-button>
          </li>
          <li>
            <el-button @click="open" style="background-color: #24bdaf;color: white;outline: none">设备分配</el-button>
          </li>
        </ul>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="所属机构"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="设备IMEI"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="设备SN">
          </el-table-column>
          <el-table-column
            prop="date"
            label="流量卡号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="硬件版本"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="软件版本">
          </el-table-column>
          <el-table-column
            prop="date"
            label="激活时间"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="manageDetail" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--分页-->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 15, 20]"
          :page-size="pagesize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="organizationList.length">
        </el-pagination>
      </div>

    </div>
    <!--设备分配-->
    <el-dialog title="设备分配" :visible.sync="dialogVisible" :append-to-body="true" width="30%"
               :close-on-click-modal="false" :before-close="handleClose">

      <label for="">所属机构：</label>
      <el-select v-model="org" style="width: 60%" clearable placeholder="请选择">
        <el-option  v-for="item in organizationList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
          {{item.itemValue}}</el-option>
      </el-select>
      <div class="uploadA">
        <label for="">文件：</label>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList3">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>

      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'manage',
    data() {
      return {
        currentPage4:1,
        pagesize:1,
        org:'1',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        fileList3: [],
        dialogVisible: false,
      // 机构列表
        organizationList:[{id:'1',name:'1'}]
      }
    },
    methods: {
      open() {
        this.dialogVisible = true
      },
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-1);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
        // this.getAllPatient(this.currentPage4,this.pagesize,this.keyNames,this.tags,this.sexs,this.typesss,this.add);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage4= val;
        // this.getAllPatient(this.currentPage4,this.pagesize,this.keyNames,this.tags,this.sexs,this.typesss,this.add);
      },
      manageDetail(){
        this.$router.push('/manage/manageDetail')
      }
    }
  }
</script>

<style lang="less" scoped>
  .uploadA{
    height: auto;
    overflow: hidden;
    width: 100%;
    margin-top: 16px;
    label{
      display: inline-block;
      float: left;
    }
    .upload-demo{
      float: left!important;
      margin-left: 33px;
    }
  }
  .manage {
    .manage-content {
      margin-top: 16px;
      background: white;
      height: auto;
      overflow: hidden;
      width: 100%;
      .search {
        height: auto;
        overflow: hidden;
        margin: 16px;
        ul.top {
          height: auto;
          overflow: hidden;
          width: 100%;
          padding-bottom: 16px;
          border-bottom: 1px solid #ececec;
          li {
            width: 28%;
            float: left;
          }
          li:nth-of-type(1) {
            width: 17%;
          }
          li:last-child {
            width: 55%;
          }
        }
        ul.bottom {
          padding: 16px 0;
          height: auto;
          overflow: hidden;
          li {
            float: left;
          }
          li:nth-of-type(1) {
            margin: 0 32px 0 66px;
          }
          li:last-child {
            float: right;
          }
        }
      }
    }
  }
</style>
