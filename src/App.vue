<template>
  <!--<div id="app">-->
    <!--<router-view></router-view>-->
  <!--</div>-->
  <div id="app">
    <transition name="bounce">
      <router-view></router-view>
    </transition >
    </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    width: 100%;
    /*min-width: 1000px;*/
    overflow: auto;
    position: absolute;
  }


</style>
