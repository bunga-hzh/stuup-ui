<template>
  <div id="app-header">
    <div class="logo">
      <img :src="logo" alt="Logo" />
    </div>
    <div class="navbar">
      <Navbar />
    </div>
    <div class="navs">
      <Space size="small" align="center">
        <Avatar circle src="https://www.vexipui.com/qmhc.jpg" :size="50"></Avatar>
        <Dropdown>
          <Button text type="primary" :icon="ChevronDown">张三</Button>
          <template #drop>
            <DropdownList>
              <DropdownItem>个人中心</DropdownItem>
              <DropdownItem>退出登入</DropdownItem>
            </DropdownList>
          </template>
        </Dropdown>
      </Space>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png';
import { ChevronDown } from '@vexip-ui/icons';
import Navbar from './components/navbar/index.vue';
</script>

<style scoped lang="scss">
#app-header {
  height: var(--header-height);
  border: 1px solid #eee;
  display: flex;

  .logo {
    width: 240px;
    height: 100%;
    display: flex;

    > img {
      width: 194px;
      height: 38px;
      display: block;
      margin: auto;
    }
  }

  .navbar {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .navs {
    flex: 1;
    padding: 0 10px;
    display: flex;
    justify-content: end;
    align-items: center;
  }
}
</style>
