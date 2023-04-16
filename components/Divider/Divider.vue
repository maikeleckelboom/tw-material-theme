<script lang="ts" setup>
import {cva} from "class-variance-authority"

const props = withDefaults(defineProps<{
  type?: 'standard' | 'inset'
}>(), {
  type: 'standard'
})

const dividerVariants = cva([
  'border-t',
  'border-outline-variant',
  'my-[8px]',
], {
  variants: {
    type: {
      standard: 'w-full',
      inset: 'w-[calc(100%_-_32px)] ml-[16px]',
    },
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
