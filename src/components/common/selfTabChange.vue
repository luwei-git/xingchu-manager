<template>
    <div class="selfTabChange boxborb">
        <ul class="h100 clearfloat fl">
            <li class="fl h100" v-if="tabTitle">{{tabTitle ? tabTitle + ' :' : ''}}</li>
            <li class="fl h100" v-for="(item, index) in tabDate" :key="index" @click="changeTab(item, index)">
                <span :style="{backgroundColor:selectedIndex == index ? tabBg || '#267BF7' : '#fff',color:selectedIndex == index ? '#fff' : '#000'}">
                    {{item}}
                </span>
            </li>
        </ul>
        <datePickerModel
            v-if="dateModelIsShow || false"
            :defaultTime='startTime'
            :datePickerTitle="''"
            :datePickerWidth="'120px'"
            :datePickerFloat="'left'"
            :datePickerMargin="'0 20px 0'"
            v-on:chooseDate="setStartTime"
            ref="startPicker">
        </datePickerModel>
        <div v-if="dateModelIsShow || false" class="fl wordModel"><p class="top"></p><p class="word">至</p></div>
        <datePickerModel
            v-if="dateModelIsShow || false"
            :defaultTime='endTime'
            :datePickerTitle="''"
            :datePickerWidth="'120px'"
            :datePickerFloat="'left'"
            :datePickerMargin="'0 20px 0'"
            v-on:chooseDate="setEndTime"
            ref="endPicker">
        </datePickerModel>
        <div class="searchModel" v-if="dateModelIsShow || false">
            <div class="search fl tac cursorPointer" @click="search">查询</div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .selfTabChange{
        width: 100%;
        height: 62px;
        padding-left: 20px;
    }
    .selfTabChange li{
        // min-width: 100px;
        line-height: 62px;
        cursor: pointer;
    }
    .selfTabChange li:nth-child(1){
        margin-right: 10px;
    }
    .selfTabChange li span{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 30px;
        border-radius: 15px;
    }
    .wordModel{
        line-height: 68px;
    }
    .searchModel .search, .searchModel .reset{
        margin-top: 8px;
    }
</style>
<script>
import datePickerModel from './formComponents/datePickerModel';
import {formatDate} from '../../utils/formatDate'
export default {
    name:'selfTabChange',
    data () {
        return {
            selectedIndex: 0,
            startTime: '',
            endTime: ''
        }
    },
    methods: {
        changeTab (item, index) {
            this.selectedIndex = index;
            this.startTime = '';
            this.endTime = '';
            if (this.dateModelIsShow) {
                this.$refs.startPicker.timeValue = '';
                this.$refs.endPicker.timeValue = '';
            }
            this.clickCallback(item, index);
        },
        setStartTime (value) {
            if (!!value) {
                this.startTime = formatDate.getFormatDate(value, 'YYYY-MM-DD') + ' 00:00:00'; 
            } else {
                this.startTime = '';
            }
        },
        setEndTime (value) {
            if (!!value) {
                this.endTime = formatDate.getFormatDate(value, 'YYYY-MM-DD') + ' 23:59:59'; 
            } else {
                this.endTime = '';
            }
        },
        search () {
            if (this.searchCallBack) {
                if (this.startTime == '') {
                    this.$message('请选择开始时间');
                } else if (this.endTime == '') {
                    this.$message('请选择结束时间');
                } else {
                    this.selectedIndex = -1;                    
                    this.searchCallBack({startTime: this.startTime, endTime: this.endTime});
                }
            }
        }
    },
    components: {
        datePickerModel
    },
    props: ['tabBg', 'tabTitle', 'tabDate', 'clickCallback', 'dateModelIsShow', 'searchCallBack']
}
</script>
