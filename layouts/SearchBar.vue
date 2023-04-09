<script lang="ts" setup>

</script>

<template>
  <div
      class="relative flex overflow-hidden rounded-2xl px-4 py-2 text-sm bg-surface-level-1 border-thin border-surface-level-2"
      data-name="search-bar">
    <Icon class="h-6 w-6" name="ic:round-search"/>
    <input
        class="border-none bg-transparent focus:outline-none focus:border-transparent"
        placeholder="Search" type="text"/>
    <Icon class="h-6 w-6 cursor-pointer" name="ic:outline-account-circle"/>
  </div>
</template>
