<script lang="ts" setup>
import {TonalPalette} from "@material/material-color-utilities"
import {tonesFromPalette} from "~/modules/theme/runtime/utils/tonesFromPalette"
import chroma from "chroma-js"
import {ComputedRef} from "vue"

const {palette} = defineProps<{
  palette: TonalPalette
}>()

const {public: {theme: {options: {tones}}}} = useRuntimeConfig()

const tonalPalette = computed(
    () => tonesFromPalette(palette, tones)
) as ComputedRef<Record<number, string>>

const contrastHex = (hex: string) => chroma(hex).luminance() > 0.45 ? '#121212' : '#F7F7F7'
</script>

<template>
  <div class="grid grid-flow-col-dense">
    <div v-for="([tone, color]) in Object.entries(tonalPalette)"
         :style="{backgroundColor: color, color: contrastHex(color)}"
         class="grid aspect-square items-center justify-center palette min-w-[40px]">
      <span class="tabular-nums	text-sm">{{ tone }}</span>
    </div>
  </div>
</template>

<style lang="postcss">
.palette:first-child {
  @apply rounded-tl-xl rounded-bl-xl;
}

.palette:last-child {
  @apply rounded-tr-xl rounded-br-xl;
}
</style>
