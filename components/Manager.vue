<script lang="ts" setup>
const onExport = () => {
  console.log("Export");
};

const onImport = () => {
  console.log("Import");
};
</script>

<template>
  <button
    class="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium leading-5 text-on-surface-variant bg-surface-level-1 hover:bg-surface-level-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
    v-on:click="onExport"
  >
    <Icon name="ic:outline-file-download" />
    Export
  </button>
  <button
    class="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium leading-5 text-on-surface-variant bg-surface-level-1 hover:bg-surface-level-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
    v-on:click="onImport"
  >
    <Icon name="ic:outline-file-upload" />
    Import
  </button>
</template>
