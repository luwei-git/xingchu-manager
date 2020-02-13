<template>
    <el-table
    :data="tableData"
    style="width: 100%">
            <div  v-for="(item, index) in tableHeaderData" :key="index" >
                <el-table-column
                    v-if="!item.isButton"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    :align="item.align || 'center'">
                </el-table-column>
                <el-table-column
                    v-if="item.isButton"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    :align="item.align || 'center'">
                        <template slot-scope="scope">
                            <el-button
                            type="text"
                            size="small"
                            v-for="(ite, ind) in scope.row[item.prop]"
                            :disabled="(scope.row[item.prop][ind]).disabled || false"
                            :key="ind"
                            @click="callBack(scope.row, scope.$index, item.prop, ind)">
                            {{(scope.row[item.prop][ind]).name}}
                            </el-button>
                        </template>
                </el-table-column>
            </div>
  </el-table>
</template>
<style>
    .has-gutter th{
        border-top: 1px solid #ebeef5;
    }
</style>
<script>
export default {
    name: 'eleTable',
    data () {
        return {
            
        }
    },
    methods: {
        callBack (row, index, prop, ind) {
            if (this.callbackObj) {
                (this.callbackObj[prop][ind])(row, index);
            }
        }
    },
    //callbackObj , 对象 , key为表格prop , value为回调列表
    props: ['tableData', 'tableHeaderData', 'callbackObj']
}
</script>
