<template>
    <div class="datePickerModelPage" :style="{width:datePickerWidth, float:datePickerFloat, margin: datePickerMargin}">
        <div :class="{title: !!datePickerTitle, fl: true, noTitle: !datePickerTitle}">{{datePickerTitle}}</div>
        <div class="datePickerBody">
            <el-date-picker
                v-model="timeValue"
                type="date"
                @change="chooseDate"
                placeholder="选择日期">
            </el-date-picker>
        </div>
    </div>
</template>
<style>
    .datePickerBody .el-input__inner{
        height: 30px;
        line-height: 30px;
        padding-right: 0;
    }
    .datePickerBody .el-date-editor.el-input, .datePickerBody .el-date-editor.el-input__inner{
        width: 100%;
    }
    .datePickerBody .el-input__icon{
        line-height: 30px;
    }
</style>

<style lang="less" scoped>
    .datePickerModelPage{
        margin-bottom: 15px;
        .title{
            margin-bottom: 5px;
        }
        .noTitle{
            width: 100%;
            height: 19.45px;
        }
    }
</style>
<script>
export default {
    name: 'datePickerModel',
    data () {
        return{
            timeValue: ''
        }
    },
    methods: {
        chooseDate (value) {
            this.$emit('chooseDate', value);
        }  
    },
    created () {
        if (this.defaultTime) {
            this.timeValue = this.defaultTime;
        }
    },
    props: ['defaultTime', 'datePickerTitle', 'datePickerWidth', 'datePickerFloat', 'datePickerMargin']
}
</script>
