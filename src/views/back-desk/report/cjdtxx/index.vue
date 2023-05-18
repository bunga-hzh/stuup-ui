<template>
  <Row>
    <Column :md="24" :lg="8">
      <base-card>
        <Item />
      </base-card>
    </Column>
    <Column :md="24" :lg="16">
      <base-card>
        <Record />
      </base-card>
    </Column>
  </Row>
</template>

<script setup lang="ts">
import Item from './componnets/Item.vue';
import Record from './componnets/Record.vue';
</script>

<style scoped lang="scss"></style>
