<template>
  <div>
    <div class="top-title-common"><h3>开发 > 开发者工具</h3></div>
    <div class="tools">
      <div class="tools-content">
        <div class="tools-info">
          <p>API文档下载</p>
        </div>
        <div class="tools-info">
          <p>SDK下载</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'develop-tools'
  }
</script>

<style lang="less" scoped>
  .tools {
    height: auto;
    overflow: hidden;
    background: white;
    margin-top: 16px;
    .tools-content {
      margin: 16px;
      .tools-info {
        border: 1px solid #f1f1f1;
        height: auto;
        overflow: hidden;
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 16px;
        p {
          font-size: 16px;
          line-height: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f1f1f1;
          padding-left: 10px;
        }
      }
    }
  }
</style>
