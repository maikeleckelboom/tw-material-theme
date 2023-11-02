<script lang="ts" setup>
import {usePalettes} from "#imports";

const palettes = usePalettes()
</script>

<template>
  <div v-for="(palette, key) in palettes" :key="key" class="grid gap-3 px-3">
    <p class="text-title-medium font-bold capitalize">
      {{ key }}
    </p>
    <div class="flex flex-row gap-2">
      <label for="hue">Hue</label>
      <input id="hue" v-model="palette.hue" class="flex-1" max="360" min="0" type="range"/>
    </div>
    <div class="flex flex-row gap-2">
      <label for="tone">Tone</label>
      <input id="tone" class="flex-1" max="100" min="0" type="range"/>
    </div>
  </div>
</template>
