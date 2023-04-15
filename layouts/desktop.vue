<script lang="ts" setup>
const { state, toggle } = useSideSheet();

</script>

<template>
  <div
    class="relative overflow-hidden h-[100dvh] w-[100dvw] bg-background text-on-background"
  >
    <div>
      <slot />
    </div>
  </div>
</template>
