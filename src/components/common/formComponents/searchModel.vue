<template>
    <div class="searchModelPage" :style="{width:searchModelWidth, float:searchFloat, margin: searchModelMargin}">
        <div :class="{title: !!searchTitle, noTitle: !searchTitle}">{{searchTitle}}</div>
        <div class="searchBody por">
            <input type="text" v-model="searchValue" :disabled="searchModelDisabled" :placeholder="searchPlacholder || '请选择'">
            <div class="searchIcon poart cursorPointer" v-show="searchIconShow || true" :style="{backgroundColor: searchIconBgColor || '#79ADF8'}" @click="search">
                <div class="icon"></div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .searchModelPage{
        margin-bottom: 15px;
        .title{
            margin-bottom: 5px;
        }
        .noTitle{
            width: 100%;
            height: 19.45px;
        }
        .searchBody {
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
            .searchIcon{
                width: 30px;
                height: 30px;
                .icon{
                    width: 17px;
                    height: 17px;
                    background: url('../../../assets/images/login/icon.png') no-repeat;
                    background-position: -151px 0;
                    margin-left: 7px;
                    margin-top: 7px;
                }
            }
        }
    }
</style>
<script>
export default {
    data () {
        return {
            searchValue: ''
        }
    },
    methods: {
        search () {
            this.$emit('searchClick', this.searchValue);
        }  
    },
    props: ['searchTitle', 'searchModelWidth', 'searchModelDisabled', 'searchPlacholder', 'searchFloat', 'searchIconShow', 'searchIconBgColor', 'searchModelMargin']
}
</script>
