<template>
  <div class="isMargin">
    <div class="top-title-common"><h3>开发 > 基本配置</h3></div>
    <div class="basic">
      <div class="basic-content">
        <div class="basic-info">

        </div>
        <div class="basic-info">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'basic'
  }
</script>

<style lang="less" scoped>
.basic{
  height: auto;
  overflow: hidden;
  background: white;
  margin-top:16px;
  .basic-content{
    margin: 16px;
    .basic-info {
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
