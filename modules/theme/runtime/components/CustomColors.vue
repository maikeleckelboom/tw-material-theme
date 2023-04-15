<script lang="ts" setup>
import {CustomColorGroup} from "@material/material-color-utilities"
import {capitalize} from "@vue/runtime-core"
import {normalizeCustomColorScheme, paletteFromCustomColor} from "~/modules/theme/runtime/utils/customColors";

const theme = useTheme()
const {public: {theme: {options}}} = useRuntimeConfig()

const createCustomCustomColorGroup = (customColor: CustomColorGroup) => {
  const light = normalizeCustomColorScheme(customColor.color, customColor.light)
  const dark = normalizeCustomColorScheme(customColor.color, customColor.dark)
  return {
    ...customColor,
    light,
    dark,
    palette: paletteFromCustomColor(customColor, theme.value.source, options.tones)
  }
};

const normalizeCustomColors = (customColors: CustomColorGroup[]) => customColors.map(createCustomCustomColorGroup)

const customColors = computed(() => normalizeCustomColors(theme.value.customColors))
</script>

<template>
  <div class="flex flex-col gap-8 mb-7">
    <div v-for="(item, index) in customColors" :key="index"
         class="relative grid w-full gap-2 overflow-auto scrollbar-thin scrollbar-thumb-rounded-md">
      <div class="flex flex-col">
        <p class="flex mb-2">{{ capitalize(item.color.name) }} (Light Scheme)</p>
        <ColorScheme :scheme="item.light" prefix="md-custom-color-" suffix="-light"/>
      </div>
      <div class="flex flex-col">
        <p class="flex mb-2">{{ capitalize(item.color.name) }} (Dark Scheme)</p>
        <ColorScheme :scheme="item.dark" prefix="md-custom-color-" suffix="-dark"/>
      </div>
      <div class="flex flex-col">
        <p class="flex mb-2">Palette</p>
        <ColorPalette :palette="item.palette"/>
      </div>
    </div>
  </div>
</template>
