<template>
  <el-card style="margin: 20px">可视化报表</el-card>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
#dv-full-screen-container {
  width: 100%;
  height: 100%;
  background-color: #050a32;
  background-image: linear-gradient(135deg, #0e1d5c, #050a32 0%, 100%);
  box-shadow: 0 0 3px blue;

  .dv-border-box-11 {
    user-select: none;

    .dv-border-box-8 {
      padding: 70px 40px 40px;

      @include b(visual) {
        width: 100%;
        height: 100%;
        display: flex;
        box-sizing: border-box;
        background-color: #0e1d5c;

        @include e(left) {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1 solid #eee;
          @include e(up) {
            flex: 1;
            border: 1 solid #eee;
          }
          @include e(down) {
            flex: 1;
            border: 1 solid #eee;
          }
        }
        @include e(center) {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1 solid #eee;
        }
        @include e(right) {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1 solid #eee;
        }

        &-center {
          flex: 2;
          display: flex;
          flex-direction: column;

          &-up {
            flex: 1;
          }
          &-center {
            flex: 1;
          }
          &-down {
            flex: 2;
          }
        }
        &-right {
          flex: 1;
        }
      }
    }
  }
}
</style>
