<script lang="ts" setup>
import {tv} from "tailwind-variants"

const searchView = tv({
  variants: {},
  slots: {
    base: [
      'w-full',
      'h-full',
      'bg-surface-container',
      'absolute',
      'inset-0',
      'z-20',
    ]
  }
})

const {base} = searchView()
</script>

<template>
  <div :class="base()" data-component="SearchView">

  </div>
</template>
