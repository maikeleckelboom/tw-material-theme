<script lang="ts" setup>
import {TonalPalette} from "@material/material-color-utilities"
import {tonesFromPalette} from "~/modules/theme/runtime/utils/tonesFromPalette"
import chroma from "chroma-js"
import {Ref} from "vue"

const props = defineProps<{
  palette: TonalPalette
  name?: string
}>()

const {palette, name} = toRefs(props)

const tones = computed(() => {
  const {public: {theme: {options: {tones}}}} = useRuntimeConfig()
  return tones
})

const tonalPalette = computed(
    () => tonesFromPalette(palette.value, tones.value)
) as Ref<Record<number, string>>

const contrastHex = (hex: string) => chroma(hex).luminance() > 0.45 ? '#121212' : '#F7F7F7'
</script>

<template>
  <div class="relative grid grid-flow-col-dense overflow-hidden rounded-lg h-12">
    <div v-for="([tone, color]) in Object.entries(tonalPalette)"
         :style="{backgroundColor: color, color: contrastHex(color)}"
         class="grid items-center justify-center h-full first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg">
      <span class="tabular-nums	text-sm">{{ tone }}</span>
    </div>
  </div>
</template>
