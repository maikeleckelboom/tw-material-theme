<script lang="ts" setup>
import {TonalPalette} from "@material/material-color-utilities"
import {SchemeProps} from "~/modules/theme/runtime/plugin"

const {palettes} = defineProps<{
  palettes: Record<keyof SchemeProps, TonalPalette>
}>()
</script>

<template>
  <div>
    <div v-for="(palette, name) in palettes" :key="name">
      <p class="mt-2 mb-1 font-medium text-md">
        {{ humanize(name) }}
      </p>
      <ColorPalette :palette="palette"/>
    </div>
  </div>
</template>

