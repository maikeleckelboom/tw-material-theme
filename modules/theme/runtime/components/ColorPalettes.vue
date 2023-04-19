<script lang="ts" setup>
const palettes = usePalettes()
</script>

<template>
  <div class="relative  overflow-y-hidden overflow-x-scroll scrollbar">
    <div v-for="(palette, name) in palettes" :key="name">
      <p class="mt-2 mb-1 text-title-medium text-on-surface-variant">
        {{ nameFromKey(name) }}
      </p>
      <ColorPalette :name="name" :palette="palette"/>
    </div>
  </div>
</template>

