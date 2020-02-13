<template>
    <div class="tabBox w100">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
    </div>
</template>
<style>
    .tabBox{
        padding-left: 20px;
    }
</style>
<script>
export default {
    name: 'eleTabChange',
    data () {
        return {
            activeName: '0'
        }
    },
    methods: {
        handleClick(tab) {
            this.$parent.eleTabChangeCallBack(tab.index)
        }
    },
    props: ['tabList']
}
</script>
