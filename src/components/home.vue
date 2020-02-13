<template>
  <div class="home">
    <topNav></topNav>
    <leftNav ref="leftNav"></leftNav>        
    <div class="specialCopy">
      <copyRight></copyRight>
    </div>
    <!-- <div class="toggle-menu"
         @click='toggleMenu'
         :style="{left: this.isCollapsed?'64px':'200px'}">
      <i :class='[{"el-icon-arrow-left":!this.isCollapsed},{"el-icon-arrow-right":this.isCollapsed}]'></i>
    </div> -->
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        isCollapsed: false
      }
    },
    methods: {
      toggleMenu() {
        this.$refs.leftNav.isCollapsed = !this.$refs.leftNav.isCollapsed
        this.isCollapsed = this.$refs.leftNav.isCollapsed;
      },
    }
  }
</script>
<style scoped>
  .specialCopy{
    color: #ececec;
    position: absolute;
    bottom: 0;
    background: #ececec;
    width: 100%;
    height: 45px;
    font-size: 0.15rem;
    padding-bottom: 6px;
  }
</style>
<style lang="less" type="text/less">
  .home {
    height: auto;
    overflow: hidden;
    min-height: 100%;
    width: 100%;
  }
  .toggle-menu {

    height: 40px;
    background: #02a8ed;
    position: absolute;
    top: 0px;
    bottom: 0;
    margin: auto;
    z-index: 1000;
    cursor: pointer;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    opacity: 0.2;
    transition: opacity .3s ease-out;

    &:hover {
      opacity: 0.8;
    }
  }
</style>
