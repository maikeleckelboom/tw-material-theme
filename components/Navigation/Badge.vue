<script lang="ts" setup>
import {cva} from "class-variance-authority";
import {storeToRefs} from "pinia";
import {useDragPercentageStore} from "~/stores/useDragPercentageStore";

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
  'px-[1px] py-[1px]',
  'rounded-[28px]',
  'tabular-nums',
  'z-10',
  'text-label-medium',
  'leading-tight',
  'min-w-[16px]',
  'tracking-wide',
  'flex',
  'h-fit',
  'w-auto',
  'p-[4px]',
  'items-center',
  'justify-center',
]) as (p: Props) => string)(props))

const {percentage} = storeToRefs(useDragPercentageStore())
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
