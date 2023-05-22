<template>
  <Card v-bind="$attrs" style="margin: 16px">
    <template v-for="(value, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </Card>
</template>
