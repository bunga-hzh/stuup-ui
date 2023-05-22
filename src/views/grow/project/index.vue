<template>
  <Row :gap="[10, 10]" style="margin: 10px">
    <Column :md="24" :lg="6">
      <LeftTree />
    </Column>
    <Column :md="24" :lg="18">
      <RightTable />
    </Column>
  </Row>
</template>

<script setup lang="ts">
import LeftTree from './components/LeftTree.vue';
import RightTable from './components/RightTable.vue';
</script>
