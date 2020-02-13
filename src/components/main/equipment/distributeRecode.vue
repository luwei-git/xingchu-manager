<template>
    <div>
      <div class="top-title-common"><h3>管理 > 分配记录</h3></div>
      <div class="distribute-content">
        <div class="search">
          <ul class="top">
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
            <li>
              <el-button type="primary">搜索</el-button>
            </li>
            <li>
              <el-button>清空</el-button>
            </li>
          </ul>
          <el-table
            :data="recodeData"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="所属机构">
            </el-table-column>
            <el-table-column
              prop="name"
              label="上传文件">
            </el-table-column>
            <el-table-column
              prop="address"
              label="结果文件">
            </el-table-column>
            <el-table-column
              prop="date"
              label="操作时间">
            </el-table-column>
          </el-table>
        </div>

        <!--分页-->
        <div class="block">
          <el-pagination

            :current-page="currentPage"
            :page-sizes="[10, 15, 20]"
            :page-size="pagesize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="organizationList.length">
          </el-pagination>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
      name: 'distribute-recode',
      data() {
        return {
          currentPage:1,
          pagesize:10,
          organizationList:[{id:'1',name:'1'}],
          org:'1',
          recodeData:[]
          }
      }
    }
</script>

<style lang="less" scoped>
.distribute-content{
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
      margin-bottom: 16px;
      li {
        float: left;
      }
      li:nth-of-type(1){
        width: 26%;
      }
      li:nth-of-type(2){
        width: 55%;
      }
      li:nth-of-type(3){
        margin-left: 30px;
      }
      li:last-child{
        margin-left: 16px;
      }
    }
  }
}
</style>
