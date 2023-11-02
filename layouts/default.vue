<script lang="ts" setup>
import {useRailDrawerStore} from "#imports";

const viewport = useViewport()
const isViewportMediumOrHigher = computed(() => viewport.isGreaterThan("xs"))
const isSmallViewport = computed(() => viewport.isLessThan("md"))
const store = useRailDrawerStore()

const FIXED_GUTTER_SIZE: number = 16 as const

const numberOffsetLeft = computed(() => isSmallViewport.value ? 0 : store.context.width.value + FIXED_GUTTER_SIZE)
const numberOffsetBottom = computed(() => isSmallViewport.value ? store.context.width.value + FIXED_GUTTER_SIZE : 0)
</script>

<template>
  <div
      class="flex flex-row overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-surface-variant scrollbar-thumb-rounded-sm h-[100dvh] w-[100dvw] bg-background text-on-background"
  >
    <NavigationRailDrawer
        v-if="isViewportMediumOrHigher"
    />
    <NavigationBar
        v-else
    />
    <div :style="{
        paddingLeft: `${numberOffsetLeft}px`,
        paddingBottom: `${numberOffsetBottom}px`,
    }"
         class="w-full h-full overflow-x-hidden overflow-y-auto"
    >
      <slot/>
    </div>
    <SideSheet
        class="flex justify-self-end"
    />
    <Scrim/>
  </div>
</template>
