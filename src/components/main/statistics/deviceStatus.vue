<template>
  <div>
    <div class="top-title-common"><h3>统计 > 设备概括</h3></div>
    <div class="device-status">
      <div class="device-content">
        <tree-grid :columns="columns" :request-url="$route.path" :tree-structure="true" :data-source="dataSource"></tree-grid>
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
    name: 'device-status',
    data () {
      return {
        currentPage:1,
        pagesize:15,
        columns: [
          {
            text: '所属机构',
            dataIndex: 'name'
          },
          {
            text: '设备数量',
            dataIndex: 'age'
          },
          {
            text: '累计设备数量',
            dataIndex: 'sex'
          },
          {
            text: '设备占比',
            dataIndex: 'a'
          },
          {
            text: '激活数量',
            dataIndex: 'b'
          },
          {
            text: '累计激活数量',
            dataIndex: 'c'
          },
          {
            text: '激活率',
            dataIndex: 'id'
          },
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
.device-status{
  margin-top: 16px;
  background: white;
  height: auto;
  overflow: hidden;
  width: 100%;
  .device-content{
    height: auto;
    overflow: hidden;
    margin:16px;
  }
}
</style>
