<template>
  <div class="leftNav">
    <div class="siderbar-wrapper" :style="{width: this.isCollapsed?'64px':'200px'}">
      <el-menu
        background-color="#39476C"

        text-color="#fff"
        active-text-color="#78ADF9"
        class="menu-wrapper"
        :router="true"
        :unique-opened="true"
        :collapse="isCollapsed"
        :default-active="'/'+$route.path.split('/')[1]">
        <template v-for="(item, index) in sider_menu_data">
          <el-menu-item class="menu-item" v-if="!item.children" :index="item.resourceUrl" :key="index">
            <i :class="item.resourceIcon"></i>
            <span slot="title">{{item.resourceName}}</span>
          </el-menu-item>
          <el-submenu v-else :index="item.resourceUrl">
            <template slot="title">
              <i :class="item.resourceIcon"></i>
              <span slot="title">{{item.resourceName}}</span>
            </template>
            <el-menu-item class="menu-item" v-for="(sub_item, sub_index) in item.children" :index="sub_item.resourceUrl" :key="sub_index">
              <span slot="title" style="margin-left:12px;">{{sub_item.resourceName}}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="content-wrapper" ref="content-wrapper" :style="{left: this.isCollapsed?'64px':'200px'}">
      <div class="content">
        <router-view></router-view>

      </div>
    </div>
  </div>

</template>

<script>
  import {Cookie} from '../../utils/cookie'
  import {menusData} from "../../config/menusData";
  export default {
    name: 'leftNav',
    data() {
      return {
        sider_menu_data: [],
        isCollapsed: false
      }
    },
    methods: {

    },
    created () {
      this.sider_menu_data = menusData;
    },
    watch: {

    }
  }
</script>

<style lang="less" type="text/less">
  @import '../../assets/css/variable';
  .siderbar-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: @siderbarWidth;
    z-index: 11;
    transition: all 0.3s ease-in-out;
    .logo-wrapper {
      height: 40px;
      line-height: 40px;
      padding: 16px 0;
      text-align: center;
      font-size: 24px;
      color: #ffffff;
    }

    .menu-wrapper {
      position: absolute;
      top: 72px;
      bottom: 0;
      width: 100%;
      border-right: none;
      transition: all 0.3s ease-in-out;

      &:not(.el-menu--collapse) {
        overflow-y: auto;
        overflow-x: hidden;
      }

      i {
        color: rgb(139, 158, 186);
      }

      .menu-item {
        &.is-active, &:hover {
          background-color: rgba(38,123,247,.1)!important;
          color: white!important;
          i {
            color: #267bf7!important;
          }
        }
      }

      .el-submenu__title:hover {
        color: white!important;
        background-color: rgba(38,123,247,.1)!important;
        i {
          color: #267bf7!important;
        }
      }

      .el-submenu, .el-menu-item {
        width: 100%;
      }
    }
  }

  .topbar-wrapper {
    position: fixed;
    left: @siderbarWidth;
    right: 0;
    top: 0;
    heihgt: @topbarHeight;
    line-height: @topbarHeight;
    padding: 0 24px 0 0;
    background-color: @topbarBackgroundColor;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    transition: all 0.3s ease-in-out;
    z-index: 12;

    .menu-collapse-wrapper {
      height: 100%;
      width: 48px;
      text-align: center;
      cursor: pointer;

      i {
        transition: all 0.3s ease-in-out;
      }
    }

    .title {
      height: 100%;
      font-weight: bold;
    }

    .menu-list {
      .menu-item {
        position: relative;
        float: left;
        padding: 0 15px;
        min-width: 45px;
        height: 48px;
        text-align: center;
        font-size: 0px;

        &:hover {
          cursor: pointer;
          background-color: rgba(38,123,247,.1)!important;
          /*color: #267bf7!important;*/
        }

        .icon {
          vertical-align: middle;
          font-size: 24px;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          margin-left: 4px;
          font-size: 16px;
        }
      }
    }
  }

  .content-wrapper {
    position: fixed;
    left: @siderbarWidth;
    right: 0;
    top: @topbarHeight;
    bottom: @footerHeight;
    padding: 16px;
    overflow: auto;
    transition: all 0.3s ease-in-out;
    .content {
      position: relative;
      width: 100%;
      min-width: 700px;
      height: 100%;
    }
  }
  // 侧边栏选中状态文字和背景颜色
  .siderbar-wrapper .menu-wrapper .menu-item.is-active, .siderbar-wrapper .menu-wrapper .menu-item:hover{
    color: #78ADF9!important;
    background-color: #29375A !important;
  }
</style>
