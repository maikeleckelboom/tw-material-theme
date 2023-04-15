<script lang="ts" setup>
import {cva} from "class-variance-authority";

const props = defineProps<{
  inset?: boolean
}>()

const dividerVariants = cva([
  'border-t',
  'border-outline-variant',
], {
  variants: {
    inset: {
      true: 'mx-[24px]',
      false: 'border-outset',
    }
  },
  defaultVariants: {},
})

const dividerClasses = computed(() => dividerVariants(props))
</script>

<template>
  <div :class="dividerClasses">
    <slot/>
  </div>
</template>
