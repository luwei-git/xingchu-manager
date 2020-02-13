<template>
    <div class="selectModelPage" :style="{width:selectModelWidth, float:selectFloat, margin: selectModelMargin}">
        <div class="title">{{selectTitle}}</div>
        <div class="selectBody por">
            <input type="text" :value="selectValue" readonly :disabled="selectModelDisabled" :placeholder="selectPlacholder || '请选择'" @click="showList">
            <div class="selectIcon poart" v-show="selectIconShow || true" :style="{backgroundColor: selectIconBgColor || '#79ADF8'}" @click="showList">
                <!-- 三角形 -->
                <div class="triangle"></div>
            </div>
            <ul class="list tal poalt" v-if="listShow">
                <li class="chooseLi" v-for="(item, index) in selectList" :key="index" @click="chooseLi(item)">{{item.name}}</li>
                <li class="tac" v-if="!selectList || selectList.length == 0"></li>
                <li class="tac" v-if="!selectList || selectList.length == 0">暂无数据</li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .selectModelPage{
        margin-bottom: 15px;
        .title{
            margin-bottom: 5px;
        }
        .selectBody {
            input{
                height: 30px;
                width: 100%;
                border-radius: 3px;
                border: 1px solid #C1C7D3;
                padding-left: 10px;
                box-sizing: border-box;
            }
            input::-webkit-input-placeholder{
                color: #9A9A9A;
            }
            .selectIcon{
                width: 30px;
                height: 30px;
                .triangle{
                    width: 0;
                    height: 0;
                    border: 3px solid #fff;
                    transform: rotate(45deg);
                    margin-left: 12px;
                    margin-top: 10px;
                    border-left-color: transparent;
                    border-top-color: transparent;
                }
            }
            .list{
                background-color: #fff;
                width: 100%;
                height: 90px;
                margin-top: 5px;
                border: 1px solid #C1C7D3;
                overflow-y: scroll;
                top: 30px;
                z-index: 101;
                cursor: pointer;
                li{
                    height: 30px;
                    padding-left: 20px;
                    line-height: 30px;
                    // border-bottom: 1px solid #C1C7D3;
                    box-sizing: border-box;
                }
                li.chooseLi:hover{
                    background-color: #ccc;
                }
            }
        }
    }
</style>
<script>
export default {
    data () {
        return {
            listShow: false
        }
    },
    methods: {
        showList () {
            this.listShow = !this.listShow;
        },
        chooseLi (value) {
            this.listShow = false;
            this.$emit('selectChoose', value);
        }
    },
    props: ['selectTitle', 'selectValue', 'selectModelWidth', 'selectList', 'selectModelDisabled', 'selectPlacholder', 'selectFloat', 'selectIconShow', 'selectIconBgColor', 'selectModelMargin']
}
</script>
