<template>
    <div class="dialogFooter poalb boxborb">
        <div class="buttonBox clearfix">
            <span class="cancel fl tac cursorPointer" @click="cancel">{{cancelText || "取消"}}</span>
            <span class="confirm fl tac cursorPointer" @click="confirm">{{confirmText || "确认"}}</span>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .dialogFooter{
        width: 100%;
        height: 60px;
        padding-top: 15px;
        background-color: #F3F6FD;
        .buttonBox{
            width: 200px;
            margin: 0 auto;
            color: #fff;
            .cancel, .confirm{
                display: block;
                width: 80px;
                height: 30px;
                line-height: 30px;
                border-radius: 2px;
            }
            .cancel{
                background-color: #98A5B6;
                margin-right: 40px;
            }
            .confirm{
                background-color: #79ADF8;
            }
        }
    }
</style>
<script>
export default {
    name: '',
    data () {
        return{

        }
    },
    props: ['cancelText', 'confirmText', 'cancel', 'confirm']
}
</script>
