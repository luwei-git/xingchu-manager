<template>
    <div class="searchModelBox">
        <div class="inputBox" v-for="(item, index) in inputListData" :key="index">
            <span>{{item.label ? item.label+ ': ' : ''}}</span>
            <el-input 
            v-model="item.value" 
            :placeholder="item.placeholder" 
            :style="{width: item.width ? item.width : '180px' , marginRight: '20px'}">
            </el-input>
        </div>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onClear">清空</el-button>
    </div>
</template>
<style>
.searchModelBox .el-input__inner,
.searchModelBox .el-button {
    height: 25px;
    line-height: 25px;
}
.searchModelBox .el-button{
    padding: 0 20px;
}
</style>

<style scoped lang='less'>
    .searchModelBox{
        height: 70px;
        padding-top: 22px;
        padding-left: 20px;
        box-sizing: border-box;
    }
    .searchModelBox .inputBox{
        display: inline-block;
    }
</style>
<script>
export default {
    data () {
        return {
        }
    },
    methods: {
        onClear () {
            this._props.inputListData.forEach(element => {
                element.value = '';
            });
            if (this.clearCallback) {
                this.clearCallback();
            }
        },
        onSearch () {
            this.searchCallback();
        }
    },
    props: ['inputListData', 'searchCallback', 'clearCallback']
}
</script>
