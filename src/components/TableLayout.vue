<template>
  <div class="table-layout">
    <section class="search">
      <div class="search-form">
        <ConfigProvider :props="providedProps">
          <!-- 搜索区域 -->
          <slot name="search"></slot>
        </ConfigProvider>
      </div>
      <div class="search-btn">
        <!-- 搜索缩按钮区域 -->
        <slot name="searchBtn"></slot>
      </div>
    </section>
    <section class="toolbar">
      <div class="toolbar-left">
        <!-- 表格工具栏左侧 -->
        <slot name="toolbarLeft"></slot>
      </div>
      <div class="toolbar-right">
        <!-- 表格工具栏右侧 -->
        <slot name="toolbarRight"></slot>
      </div>
    </section>
    <section class="table-content">
      <!-- 表格区域 -->
      <slot name="table"></slot>
    </section>
    <section class="pagination">
      <!-- 分页区域 -->
      <slot name="page"></slot>
    </section>
  </div>
</template>

<script setup lang="ts">
const providedProps = {
  default: { clearable: true },
  formItem: {
    sm: 24,
    md: 12,
    xl: 8,
  },
};
</script>

<style scoped lang="scss">
.table-layout {
  .search,
  .toolbar,
  .table-content,
  .pagination {
    padding: 10px;
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    &-form {
      flex: 1;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
    &-btn {
      width: 100px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left {
      flex: 1;
      display: flex;
      justify-content: start;
      align-items: center;
    }
    &-right {
      flex: 1;
      display: flex;
      justify-content: end;
      align-items: center;
    }
  }

  .pagination {
    text-align: right;
  }
}
</style>
