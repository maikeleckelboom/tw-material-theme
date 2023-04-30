<script lang="ts" setup>

import {tv} from "tailwind-variants";

const props = withDefaults(defineProps<{
  type?: 'standard' | 'inset'
}>(), {
  type: 'standard'
})

const dividerTv = tv({
  base: [
    'border-t',
    'border-outline-variant',
    'my-[8px]',
  ],
  variants: {
    type: {
      standard: 'w-full',
      inset: 'w-[calc(100%_-_32px)] ml-[16px]',
    },
  },
  defaultVariants: {},
})

const dividerClasses = computed(() => dividerTv(props))
</script>

<template>
  <div :class="dividerClasses">
    <slot/>
  </div>
</template>
