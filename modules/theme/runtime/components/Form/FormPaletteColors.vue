<script lang="ts" setup>
const keyColors = useKeyColors()
const keyColorKeys = computed(() => objectKeys(keyColors.value))
</script>

<template>
  <div class="h-screen overflow-y-auto scrollbar">
    <FormPaletteColor
        v-for="key in keyColorKeys"
        :key="key"
        :key-color-name="key"
    />
    <Divider/>
  </div>
</template>
