<script lang="ts" setup>
const viewport = useViewport()
const isViewportMediumOrHigher = computed(() => viewport.isGreaterThan("xs"))
</script>

<template>
  <div
      class="flex flex-row overflow-hidden scrollbar-thin scrollbar-thumb-surface-variant scrollbar-thumb-rounded-sm h-[100dvh] w-[100dvw] bg-background text-on-background"
  >
    <NavigationRailDrawer v-if="isViewportMediumOrHigher"/>
    <NavigationBar v-else/>
    <div class="w-full">
      <slot/>
    </div>
    <SideSheet class="flex justify-self-end"/>
    <SideSheetScrim/>
    <DialogWrapper/>
  </div>
</template>
