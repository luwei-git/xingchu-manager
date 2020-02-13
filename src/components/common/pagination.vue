<template>
    <div class="paginationBox" v-show="total * 1 > 0">
        <el-pagination
        class="fr"
        background
        layout="sizes, total, prev, pager, next, jumper, slot"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        :current-page="currentPage"
        prev-text="上一页"
        next-text="下一页"
        @current-change="currentChange"
        @size-change="sizeChange"
        :page-size="pageSize || 10">
            <span class="confirm tac">GO</span>
        </el-pagination>
    </div>
</template>
<style>
    .paginationBox{
        width: 100%;
        height: 65px;
        padding-top: 16px;
        padding-right: 100px;
        box-sizing: border-box;
    }
    .paginationBox .confirm{
        display: inline-block;
        margin-left: 20px;
        cursor: pointer;
        height: 28px;
        background-color: #409EFF;
        color: #fff;
        border-radius: 3px;
    }
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev{
        background-color: #409EFF;
        color: #fff;
        padding: 0 10px;
    }
    .el-pagination.is-background .btn-prev:disabled,
    .el-pagination.is-background .btn-next:disabled{
        background-color: #A8CAFC;
        color: #fff;
        padding: 0 10px;
    }
</style>
<script>
export default {
    name:'pagination',
    data () {
        return {
            currentPage:1
        }
    },
    methods: {
        currentChange (currentPage) {
            this.currentPage = currentPage;
            if (this.currentChangeCallback) {
                this.currentChangeCallback(currentPage);
            } else {
                return;
            }
        },
        sizeChange (size) {
            this.$emit('paginationSizeChange', size);
        }
    },
    props: ['total', 'pageSize', 'currentChangeCallback']
}
</script>
