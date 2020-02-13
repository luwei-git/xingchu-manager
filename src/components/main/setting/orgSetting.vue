<template>
  <div class="org-setting">
    <div class="top-title-common"><h3>设置 > 机构设置</h3></div>
    <el-radio-group v-model="tabPosition" style="margin-top: 30px; width: 100%;">
      <el-radio-button label="detail">详情</el-radio-button>
      <el-radio-button label="user">用户</el-radio-button>
      <org-detail v-show="tabPosition === 'detail'" class="org-detail"></org-detail>
      <org-user v-show="tabPosition === 'user'"></org-user>
    </el-radio-group>
  </div>
</template>

<script>
  import ElForm from "element-ui/packages/form/src/form";
  import ElButton from "element-ui/packages/button/src/button";
  import orgDetail from "./orgDetail";
  import orgUser from "./orgUser";
  import {Cookie} from "../../../utils/cookie";
  import {orgModel} from "../../../api/orgApi";
  export default {
    components: {
      ElButton,
      ElForm,
      orgDetail,
      orgUser,
    },
    name: 'org-setting',
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },

        tabPosition: 'detail', //顶部详情或用户position，默认选中详情

      };
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  .org-setting {
    height: auto;
    overflow: hidden;
    width: 100%;
  }
  .org-detail{
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .org-user{
    width: 100%;
    height: auto;
    overflow: hidden;
  }
</style>
