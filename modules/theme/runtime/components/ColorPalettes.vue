<script lang="ts" setup>
import {humanize} from "../utils/humanize";
import {TonalPalette} from "@material/material-color-utilities";
import {keyColorKeys} from "~/modules/theme/runtime/plugin";
import {utilizeTonalPalette} from "~/modules/theme/runtime/utils/utilizeTonalPalette";

// todo: Change to inject ?
const props = defineProps<{
  palettes: Record<keyof typeof keyColorKeys, TonalPalette>
}>()

const {palettes} = toRefs(props)
</script>

<template>
  <div>
    <div v-for="(palette, name) in palettes" :key="name">
      <p class="mt-2 mb-1 text-md font-medium">
        {{ humanize(name) }}
      </p>
      <ColorPalette :palette="palette"/>
    </div>
  </div>
</template>

<style lang="postcss">
.palette:nth-child(13n + 1) {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.palette:nth-child(13n + 1) {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.palette:nth-child(13n + 13) {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}
</style>
