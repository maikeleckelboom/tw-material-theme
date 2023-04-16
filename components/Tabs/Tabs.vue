<script lang="ts" setup>
interface Props {
  modelValue?: string
}

const props = defineProps<Props>()

const {modelValue} = toRefs(props)
</script>


<template>
  <div class="flex flex-row w-full gap-4 p-4 border border-outline-variant rounded-2xl"
       data-component="Tabs">
    <slot></slot>
  </div>
</template>
