<template>
  <div>
    <div class="top-title-common"><h3>统计 > 血糖数据</h3></div>
    <div class="surgeData">
      <div class="surge-content">
        <ul class="top">
          <li>
            <el-input
              style="width:90%;"
              placeholder="请输入设备IMEI"
              clearable>
            </el-input>
          </li>
          <li>
            <label for="">时间点：</label>
            <el-select v-model="org" style="width:75%;" clearable placeholder="请选择">
              <el-option v-for="item in organizationList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.name"></el-option>
            </el-select>
          </li>
          <li>
            <label for="">所属机构：</label>
            <el-select v-model="org" style="width:75%;" clearable placeholder="请选择">
              <el-option v-for="item in organizationList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.name"></el-option>
            </el-select>
          </li>
        </ul>
        <ul class="top-two">
          <li>
            <label for="">测量时间：</label>
            <el-date-picker
              style="width:40%;"
              class="datetime_med"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
            <span>至</span>
            <el-date-picker
              style="width:40%;"
              class="datetime_med"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </li>
          <li>
            <label for="">上传时间：</label>
            <el-date-picker
              style="width:40%;"
              class="datetime_med"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
            <span>至</span>
            <el-date-picker
              style="width:40%;"
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
        </ul>
        <tree-grid :columns="columns" :tree-structure="true" :request-url="$route.path" :data-source="dataSource"></tree-grid>
      </div>
      <!--分页-->
      <div class="block">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="pagesize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataSource.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import TreeGrid from '../../common/treeTable/vue/TreeGrid'

  export default {
    name: 'surge-data',
    data() {
      return {
        org: 1,
        organizationList: [{id: 1, name: '1'}],
        currentPage: 1,
        pagesize: 1,
        columns: [
          {
            text: '所属机构',
            dataIndex: 'name'
          },
          {
            text: '测量次数',
            dataIndex: 'age'
          },
          {
            text: '累计测量数量',
            dataIndex: 'sex'
          },
          {
            text: '测量占比',
            dataIndex: 'a'
          }
        ],
        dataSource: [
          {
            id: 1,
            // parentId: 0,
            name: '测试1',
            age: 18,
            sex: '7',
            children: [
              {
                id: 2,
                // parentId: 1,
                name: '测试2',
                age: 22,
                sex: '7'
              }
            ]
          },
          {
            id: 3,
            // parentId: 0,
            name: '测试3',
            age: 23,
            sex: '13',
            children: [
              {
                id: 4,
                // parentId: 3,
                name: '测试4',
                age: 22,
                sex: '5'
              },
              {
                id: 5,
                // parentId: 3,
                name: '测试5',
                age: 25,
                sex: '7'
              },
              {
                id: 6,
                // parentId: 3,
                name: '测试6',
                age: 7,
                sex: '7',
                children: [
                  {
                    id: 7,
                    // parentId: 6,
                    name: '测试7',
                    age: 27,
                    sex: '7'
                  }
                ]
              }
            ]
          },
          {
            id: 18,
            // parentId: 0,
            name: '测试8',
            age: 18,
            sex: '77'
          }
        ]
      }
    },
    components: {
      TreeGrid
    }
  }
</script>

<style lang="less" scoped>
  .surgeData {
    margin-top: 16px;
    background: white;
    height: auto;
    overflow: hidden;
    width: 100%;
    .surge-content {
      height: auto;
      overflow: hidden;
      margin: 16px;
      ul{
        height: auto;
        overflow: hidden;
        width: 100%;
        li{
          float: left;
        }
      }
      ul.top {
        padding-bottom: 16px;
        li {
          width: 30%;
        }
      }
      ul.top-two{
        li{
          width: 50%;
        }
      }
      ul.bottom {
        padding: 16px 0;
        li:nth-of-type(1) {
          margin: 0 32px 0 66px;
        }
      }

    }
  }
</style>
