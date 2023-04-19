<script lang="ts" setup>
import {cva} from "class-variance-authority";

/**
 * Small badge
 * Large badge
 * Large badge with max characters
 */
interface Props {
  type?: 'small' | 'large' | 'large-max'
  value?: string | number
  parent?: 'drawer' | 'rail'
}


const props = withDefaults(defineProps<Props>(), {
  type: 'large',
})

const classes = computedEager(() => (cva([
  'px-[2px] py-[2px]',
  'rounded-[28px]',
  'tabular-nums',
  'z-10',
  'text-label-small',
  'leading-tight',
  'min-w-[24px]',
  'tracking-wide',

  'flex',
  'items-center',
  'justify-center',
], {
  variants: {
    parent: {
      drawer: [
        'z-10',
        'flex',
        'h-fit',
        'w-fit',
        'items-center',
        'justify-center',
        'relative',
      ],
      rail: [
        'bg-error',
        'text-on-error',
        'absolute',
        'right-0',
        'top-0',
        'left-auto',
        'text-end',
        'transform',
      ],
    }
  }
}) as (p: Props) => string)(props))
</script>

<template>
  <span :class="classes"
        class="badge"
        data-component="Badge">
    <slot name="badge" v-bind="{value}">
      {{ value }}
    </slot>
  </span>
</template>
