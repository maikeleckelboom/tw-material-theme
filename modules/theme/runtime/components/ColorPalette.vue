<script lang="ts" setup>
import {TonalPalette} from "@material/material-color-utilities";
import {utilizeTonalPalette} from "~/modules/theme/runtime/utils/utilizeTonalPalette";
import chroma from "chroma-js";

const props = defineProps<{
  palette: TonalPalette
}>()

const tones = reactive([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100])
const palette = computed(() => utilizeTonalPalette(props.palette, {tones}))

const contrastHex = (hex: string) => chroma(hex).luminance() > 0.45 ? '#121212' : '#F7F7F7'
</script>

<template>
  <div class="grid grid-cols-[repeat(13,_1fr)]" dir="rtl">
    <div v-for="([tone, color]) in Object.entries(palette)"
         :style="{backgroundColor: color, color: contrastHex(color)}"
         class="grid aspect-square items-center justify-center palette min-w-[40px]">
      <span class="tabular-nums	text-sm">{{ tone }}</span>
    </div>
  </div>
</template>
