<template>
    <div>
      <div class="copyRight">
        <p>上海双鲤物联网科技有限公司 <a href="http://www.miitbeian.gov.cn" target="_blank">©</a></p>
        <p></p></div>
    </div>
</template>

<script>
    export default {
        name: 'bottom-copy-right'
    }
</script>

<style lang="less" scoped>
  @white: white;
  .copyRight{
    color: #666;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    padding-bottom: 6px;
  a{
    color: #666;
    text-decoration: none;
  }
  }
</style>
