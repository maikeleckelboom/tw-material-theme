<script lang="ts" setup>

import {useDragPercentageStore} from "~/stores/useDragPercentageStore";

const percentageStore = useDragPercentageStore()
const {percentage} = storeToRefs(percentageStore)

watch(percentage, (v: number) => {
  // console.log('percentage received in child component', v)
  console.log('percentage', percentage.value)
})

const container = ref<HTMLElement>()
const icon = ref<HTMLElement>()
const label = ref<HTMLElement>()
const badge = ref<HTMLElement>()

const elementPositions = computed(() => {
  const containerRect = container.value?.getBoundingClientRect()
  const iconRect = icon.value?.getBoundingClientRect()
  const labelRect = label.value?.getBoundingClientRect()
  const badgeRect = badge.value?.getBoundingClientRect()
  return {
    container: containerRect,
    icon: iconRect,
    label: labelRect,
    badge: badgeRect,
  }
})

const elementPositionChart = computed(() => {
  const {container, icon, label, badge} = elementPositions.value
  return {
    container: {
      x: container?.x,
      y: container?.y,
      width: container?.width,
      height: container?.height,
    },
    icon: {
      x: icon?.x,
      y: icon?.y,
      width: icon?.width,
      height: icon?.height,
    },
    label: {
      x: label?.x,
      y: label?.y,
      width: label?.width,
      height: label?.height,
    },
    badge: {
      x: badge?.x,
      y: badge?.y,
      width: badge?.width,
      height: badge?.height,
    },
  }
})


</script>

<template>
  <div ref="container">
    <Icon ref="icon" name="mdi:triangle"/>
    <label ref="label">
      Label
    </label>
    <span ref="badge">
      1
    </span>
  </div>
</template>
