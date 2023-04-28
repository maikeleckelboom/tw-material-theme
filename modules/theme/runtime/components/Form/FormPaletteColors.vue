<script lang="ts" setup>
const keyColors = useKeyColors()
const keyColorEntries = computed(() => objectEntries(keyColors.value))
</script>

<template>
  <div class="h-screen overflow-y-auto">
    <FormPaletteColor
        v-for="[key, value] in keyColorEntries"
        :key="key"
        :name="key"
        :value="value"
    />
  </div>
</template>
