<script lang="ts" setup>
import {
  Blend,
  ColorGroup,
  CustomColor,
  CustomColorGroup,
  Scheme,
  TonalPalette
} from "@material/material-color-utilities"
import {camelize, capitalize} from "@vue/runtime-core"

const theme = useTheme()
const tones = [0, 10, 20, 30, 35, 40, 45, 50, 60, 70, 80, 90, 95, 99, 100]

const schemeFromCustomColor = (customColor: CustomColor, colorGroup: ColorGroup) => {
  const properties = {} as Scheme['props']
  for (const [key, value] of Object.entries(colorGroup)) {
    const name = customColor.name.replace(/^\W+|\W+$|\s/g, '-').toLowerCase()
    const map = key.replace(/([a-z])(?=[A-Z])/g, '$1-').toLowerCase()
    const token = camelize(map.replace(/color/, name))
    properties[token] = value
  }
  return properties
};

const paletteFromCustomColor = (customColor: CustomColorGroup) => {
  let tonalPalette = TonalPalette.fromInt(customColor.color.value)
  if (customColor.color.blend) {
    const {source} = theme.value
    const harmonized = Blend.harmonize(customColor.color.value, source)
    tonalPalette = TonalPalette.fromInt(harmonized)
  }
  tones.forEach(tone => tonalPalette.tone(tone))
  return tonalPalette
};

const createCustomCustomColorGroup = (customColor: CustomColorGroup) => {
  const light = schemeFromCustomColor(customColor.color, customColor.light)
  const dark = schemeFromCustomColor(customColor.color, customColor.dark)
  const palette = paletteFromCustomColor(customColor)
  return {...customColor, light, dark, palette} as CustomColorGroup
};

const utilizeCustomColors = (customColors: CustomColorGroup[]) => customColors.reduce((colorGroups, customColor) => {
  colorGroups.push(createCustomCustomColorGroup(customColor))
  return colorGroups
}, [] as CustomColorGroup[]);

const customColorSchemes = computed(() => utilizeCustomColors(theme.value.customColors))

</script>

<template>
  <div class="flex flex-col gap-8 mb-7">
    <div v-for="(item, index) in customColorSchemes" :key="index"
         class="relative flex w-full flex-col gap-2 overflow-auto">
      <div class="flex flex-col">
        <p class="mb-2 flex">{{ capitalize(item.color.name) }} (Light Theme)</p>
        <ColorScheme :scheme="item.light" prefix="md-custom-color-" suffix="-light"/>
      </div>
      <div class="flex flex-col">
        <p class="mb-2 flex">{{ capitalize(item.color.name) }} (Dark Theme)</p>
        <ColorScheme :scheme="item.dark" prefix="md-custom-color-" suffix="-dark"/>
      </div>
      <div class="flex flex-col">
        <p class="mb-2 flex">Color Palette (Tonal)</p>
        <ColorPalette :palette="item.palette"/>
      </div>
    </div>
  </div>
</template>
