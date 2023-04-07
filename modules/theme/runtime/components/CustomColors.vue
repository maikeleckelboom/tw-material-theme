<script lang="ts" setup>
import {Blend, ColorGroup, CustomColor, CustomColorGroup, TonalPalette} from "@material/material-color-utilities"
import {camelize, capitalize} from "@vue/runtime-core"
import type {SchemeProperties} from "~~";

const theme = useTheme()
const {public: {theme: {options: runtimeConfig}}} = useRuntimeConfig()

const schemeFromCustomColor = (customColor: CustomColor, colorGroup: ColorGroup) => {
  const properties = {} as SchemeProperties
  for (const [key, value] of Object.entries(colorGroup)) {
    const name = customColor.name.replace(/^\W+|\W+$|\s/g, '-').toLowerCase()
    const map = key.replace(/([a-z])(?=[A-Z])/g, '$1-').toLowerCase()
    const token = camelize(map.replace(/color/, name)) as keyof SchemeProperties
    properties[token] = value
  }
  return properties
};

const paletteFromCustomColor = (customColor: CustomColorGroup) => {
  const {source} = theme.value, {tones} = runtimeConfig
  let tonalPalette = TonalPalette.fromInt(customColor.color.value)
  if (customColor.color.blend) {
    const harmonized = Blend.harmonize(customColor.color.value, source)
    tonalPalette = TonalPalette.fromInt(harmonized)
  }
  tones.forEach(tone => tonalPalette.tone(tone))
  return tonalPalette
};

function createColorSchemes(customColor: CustomColorGroup) {
  const light = schemeFromCustomColor(customColor.color, customColor.light)
  const dark = schemeFromCustomColor(customColor.color, customColor.dark)
  return {light, dark};
}

type ExtendedCustomColorGroup = CustomColorGroup & {
  palette: TonalPalette
}

const createCustomCustomColorGroup = (customColor: CustomColorGroup): ExtendedCustomColorGroup => {
  const {light, dark} = createColorSchemes(customColor)
  const palette = paletteFromCustomColor(customColor)
  return {
    color: customColor.color,
    value: theme.value.customColors.indexOf(customColor),
    light,
    dark,
    palette
  }
};

const utilizeCustomColors = (customColors: CustomColorGroup[]) => customColors.reduce((colorGroups, customColor) => {
  colorGroups.push(createCustomCustomColorGroup(customColor))
  return colorGroups
}, [] as ExtendedCustomColorGroup[])

const customColorSchemes = computed(() => utilizeCustomColors(theme.value.customColors))

</script>

<template>
  <div class="mb-7 flex flex-col gap-8">
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
