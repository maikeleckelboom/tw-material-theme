<script lang="ts" setup>
const tab = ref<string>("Appetizers");
const items = ref<string[]>(['Appetizers', 'Entrees', 'Deserts', 'Cocktails', 'Wine', 'Beer'])
</script>

<template>
  <div class="flex w-full flex-row my-8" data-component="Tabs">
    <div v-for="item in items" :key="item"
         class="flex flex-1 cursor-pointer items-center justify-center text-center h-[58px] border-thin border-outline-variant">
      {{ item }}
    </div>
  </div>
</template>
