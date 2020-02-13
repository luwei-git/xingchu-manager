<template>
    <div class="breadcrumbsPage">
        <p class="poalt"><i class="poalt"></i><span class="cursorPointer" @click="toHome">首页</span> 》<span>{{firstText}}</span> 》<span>{{secondText}}</span></p>
    </div>
</template>
<style lang="less" scoped>
    .breadcrumbsPage{
        p{
            left: 220px;
            top: 50%;
            transform: translateY(-50%);
            padding-left: 20px;
            i{
                width: 13px;
                height: 16px;
                left:4px;
                top: 2px;
                background: url('../../assets/images/login/icon.png') no-repeat;
                background-position: -185px 0;
            }
        }
        font-size: 14px;
        margin-left: 36px;
    }
</style>
<script>
export default {
    data () {
        return{

        }
    },
    methods: {
        toHome () {
            this.$router.push('/homePageHospital');
        }  
    },
    props: ['firstText', 'secondText']
}
</script>
