<script lang="ts" setup>
import { CustomColorGroup } from "@material/material-color-utilities";
import { capitalize } from "@vue/runtime-core";

const theme = useTheme();
const {
  public: {
    theme: { options },
  },
} = useRuntimeConfig();

const createCustomCustomColorGroup = (customColor: CustomColorGroup) => ({
  ...customColor,
  light: schemeFromCustomColor(customColor.color, customColor.light),
  dark: schemeFromCustomColor(customColor.color, customColor.dark),
  palette: paletteFromCustomColor(
    customColor,
    theme.value.source,
    options.tones
  ),
});

const normalizeCustomColors = (customColors: CustomColorGroup[]) =>
  customColors.map(createCustomCustomColorGroup);

const customColors = computed(() =>
  normalizeCustomColors(theme.value.customColors)
);
</script>

<template>
  <div class="mb-7 flex flex-col gap-8">
    <div
      v-for="(item, index) in customColors"
      :key="index"
      class="relative grid gap-2 overflow-auto scrollbar-thin scrollbar-thumb-rounded-md"
    >
      <div class="flex flex-col">
        <p class="mb-2 flex">
          {{ capitalize(item.color.name) }} (Light Scheme)
        </p>
        <ColorScheme
          :scheme="item.light"
          prefix="md-custom-color-"
          suffix="-light"
        />
      </div>
      <div class="flex flex-col">
        <p class="mb-2 flex">{{ capitalize(item.color.name) }} (Dark Scheme)</p>
        <ColorScheme
          :scheme="item.dark"
          prefix="md-custom-color-"
          suffix="-dark"
        />
      </div>
      <div class="flex flex-col">
        <p class="mb-2 flex">Palette</p>
        <ColorPalette :palette="item.palette" />
      </div>
    </div>
  </div>
</template>
