<script lang="ts" setup>

</script>

<template>
  <div
      class="overflow-x-hidden scrollbar-thin scrollbar-thumb-surface-variant scrollbar-thumb-rounded-sm h-[100dvh] w-[100dvw] bg-background text-on-background"
  >
    <div class="flex">
      <div class="rail h-screen bg-surface-level-2 p-2">
        <FormColorMode/>

      </div>
      <slot/>
    </div>
  </div>
</template>
