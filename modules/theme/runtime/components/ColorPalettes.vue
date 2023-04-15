<script lang="ts" setup>
const palettes = usePalettes()
</script>

<template>
  <div>
    <div v-for="(palette, name) in palettes" :key="name">
      <p class="mt-2 mb-1 font-medium text-md">
        {{ nameFromKey(name) }}
      </p>
      <ColorPalette :palette="palette"/>
    </div>
  </div>
</template>

