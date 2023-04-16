<script lang="ts" setup>
interface Props {
  value?: string
}

const props = defineProps<Props>()

const {value} = toRefs(props)


</script>

<template>
  <div data-component="Tab">
    <slot></slot>
  </div>
</template>
