<template>
  <el-container class="bunga-container">
    <el-header>
      <div class="logo">
        <img :src="logo" width="200" />
      </div>
      <div class="navigation">
        <div>
          <Menu v-show="layout_type" mode="horizontal" :routes="premissionStore.getFrontAsideRouters" />
        </div>
        <div class="toolbar">
          <el-space>
            <el-switch
              v-model="layout_type"
              inline-prompt
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              active-text="前往后台"
              inactive-text="前往前台" />
            <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          </el-space>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" v-show="!layout_type">
        <div class="navigation">
          <Menu :routes="premissionStore.getBackAsideRouters" :collapse="isFold" />
        </div>
        <div class="unfold-btn">
          <el-icon @click="isFold = !isFold">
            <Fold v-show="!isFold" />
            <Expand v-show="isFold" />
          </el-icon>
        </div>
      </el-aside>
      <el-container>
        <el-main><RouterView /></el-main>
        <el-footer>&copy;版权所有 泼猴信息技术（上海）有限公司</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePermissionStore } from '@/store/modules/premission';
import Menu from './components/Menu.vue';
import logo from '@/assets/logo.png';

const premissionStore = usePermissionStore();

const layout_type = ref<boolean>(true);
const isFold = ref<boolean>(false);
</script>

<style lang="scss" scoped>
@include b(container);

.el-container {
  width: 100%;
  height: 100%;

  .el-main {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .el-menu {
    border: 0;
  }

  .el-header {
    border-bottom: 1px solid #eee;
    display: flex;

    .logo {
      width: 200px;
    }
    .navigation {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .toolbar {
        display: flex;
        justify-content: end;
        align-items: center;
      }
    }
  }
  .el-aside {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-right: 1px solid #eee;
    overflow-x: hidden;

    .navigation {
      flex: 1;
      height: 100%;
      overflow-y: auto;
    }
    .unfold-btn {
      border-top: 1px solid #eee;
      line-height: 40px;
      height: 40px;
      text-align: center;
    }
  }

  .el-main {
    margin: 0;
    padding: 0;
  }

  .el-footer {
    border-top: 1px solid #eee;
    height: var(--footer-height);
    line-height: var(--footer-height);
  }
}
</style>
