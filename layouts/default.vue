<script lang="ts" setup>
const viewport = useViewport()
const isViewportMediumOrHigher = computed(() => viewport.isGreaterThan("xs"))
</script>

<template>
  <div
      class="flex flex-row overflow-hidden scrollbar-thin scrollbar-thumb-surface-variant scrollbar-thumb-rounded-sm h-[100dvh] w-[100dvw] bg-background text-on-background"
  >
    <NavigationRailDrawer
        v-if="isViewportMediumOrHigher"
    />
    <NavigationBar
        v-else
    />
    <slot/>
    <!--      <SideSheet/>-->
    <!--      <Transition>-->
    <!--        <div v-if="isModalAndOpened"-->
    <!--             class="fixed inset-0 backdrop-filter scrim bg-surface/80 z-20 cursor-default"-->
    <!--             v-on:click="()=>close()"/>-->
    <!--      </Transition>-->
  </div>
</template>
