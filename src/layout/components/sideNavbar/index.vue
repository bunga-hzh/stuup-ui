<template>
  <div class="side-warpper" :class="{ shrink: isCollapse }">
    <div class="shrink-warpper">
      <Button
        text
        size="large"
        type="primary"
        @click="isCollapse = !isCollapse"
        :icon="isCollapse ? AnglesRight : AnglesLeft" />
    </div>
    <div class="side">
      <Menu :reduced="isCollapse" style="border-right: 0">
        <v-menu-item :routes="[]" />
      </Menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VMenuItem from '@/layout/components/VMenuItem/index.vue';
import { AnglesLeft, AnglesRight } from '@vexip-ui/icons';
// import { usePermissionStore } from '@/store/modules/premission';

// const premissionStore = usePermissionStore();
const isCollapse = ref<boolean>(false);
</script>

<style lang="scss" scoped>
.side-warpper {
  width: var(--side-width);
  height: 100%;
  transition: width 0.6s;
  display: flex;
  flex-direction: column;

  .shrink-warpper {
    --shrink-warpper-height: 40px;
    height: var(--shrink-warpper-height);
    line-height: var(--shrink-warpper-height);
    text-align: center;
    border: 1px solid #eee;
  }

  .side {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    @import '@/styles/scroll-bar.scss';
  }
}
.shrink {
  width: 64px !important;
}
</style>
