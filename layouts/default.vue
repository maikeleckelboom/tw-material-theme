<script lang="ts" setup>
const viewport = useViewport()
const isViewportMediumOrHigher = computed(() => viewport.isGreaterThan("xs"))
const store = useSideSheetStore()
const {open} = store, {isOpened} = storeToRefs(store)
</script>

<template>
  <div
      class="flex flex-row overflow-hidden scrollbar h-[100dvh] w-[100dvw] bg-background text-on-background"
  >
    <NavigationRailDrawer v-if="isViewportMediumOrHigher"/>
    <NavigationBar v-else/>
    <div class="flex flex-col px-4 w-full">
      <Search class="mt-4" v-on:open="open"/>
      <slot/>
    </div>
    <SideSheet class="flex justify-self-end"/>
    <SideSheetScrim/>
    <DialogWrapper/>
  </div>
</template>
