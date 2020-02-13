<template>
    <div class="dialogHeader poalt">
        <div class="fl">{{headerTitle}}</div>
        <div class="fr close tac cursorPointer" @click="cancel">×</div>
    </div>
</template>
<style lang="less" scoped>
    .dialogHeader{
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        color: #fff;
        box-sizing: border-box;
        background-color: #79ADF8;
        .close{
            width: 40px;
            height: 40px;
            font-size: 26px;
            background-color: #5192EE;
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
    methods: {
        
    },
    props: ['headerTitle', 'cancel']
}
</script>
