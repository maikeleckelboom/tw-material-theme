<script lang="ts" setup>
import {tv} from "tailwind-variants"

interface Props {
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
})

const indicator = tv({
  base: [
    'z-0',
    'content',
    'left-[calc(50%_-_32px)]',
    'mx-auto',
    'absolute',
    'overflow-hidden',
    'pointer-events-none',
    'bg-secondary-container',
    'opacity-0',
    'transition-all',
    'duration-200',
    'rounded-full',

    'top-0',
    'w-full',
    'h-full',
    'max-w-[64px]',
    'max-h-[32px]',
    '@[150px]:max-h-full',
    '@[150px]:max-w-full',
    '@[150px]:left-0',
    '@[150px]:transition-all',

    // on root not after

  ],
  variants: {
    active: {
      true: [
        'opacity-[0.60]',
        'scale-100',
        'hover:opacity-[0.80]',
      ],
      false: [
        'opacity-0',
        'scale-50',
        'hover:scale-100',
        'hover:opacity-[0.40]',
      ],
    },
  }
});

const indicatorClass = computed(() => indicator({
  class: '',
  active: props.active,
}))

</script>

<template>
  <div v-ripple
       :class="indicatorClass"
       data-component="ActiveIndicator">
    <slot/>
  </div>
</template>
