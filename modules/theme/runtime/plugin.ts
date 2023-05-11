import {
  argbFromHex,
  hexFromArgb,
  Theme,
  themeFromSourceColor,
} from "@material/material-color-utilities";
import { propertiesFromTheme } from "@webhead/material-color-properties";
import { themeFromKeyColors } from "#imports";
import { Ref } from "vue";
import { CustomHexColor } from "~";

export default defineNuxtPlugin((nuxtApp) => {
  const runtime = computed(() => {
    const {
      public: { theme },
    } = useRuntimeConfig();
    return theme;
  });

  const getThemeFromSourceColor = () =>
    themeFromSourceColor(
      argbFromHex(runtime.value.colors.primary),
      argbCustomColors(runtime.value.customColors as CustomHexColor[])
    );

  const getThemeFromKeyColors = () =>
    themeFromKeyColors(
      runtime.value.colors,
      argbCustomColors(runtime.value.customColors as CustomHexColor[])
    );

  const theme = ref(getThemeFromSourceColor()) as Ref<Theme>;

  const { trigger, ignoreUpdates } = watchTriggerable(
    () => [
      runtime.value.colors.secondary,
      runtime.value.colors.tertiary,
      runtime.value.colors.neutral,
      runtime.value.colors.neutralVariant,
      runtime.value.colors.error,
    ],
    () => {
      console.log(
        "Set theme via key colors (secondary, tertiary, neutral, neutralVariant, error)"
      );
      theme.value = getThemeFromKeyColors();
    }
  );

  watch(
    () => runtime.value.colors.primary,
    () => {
      console.log("Set theme via primary color");
      theme.value = getThemeFromSourceColor();
      ignoreUpdates(() => {
        runtime.value.colors = {
          ...runtime.value.colors,
          secondary: hexFromArgb(theme.value.palettes.secondary.tone(50)),
          tertiary: hexFromArgb(theme.value.palettes.tertiary.tone(50)),
          neutral: hexFromArgb(theme.value.palettes.neutral.tone(50)),
          neutralVariant: hexFromArgb(theme.value.palettes.neutralVariant.tone(50)),
          error: hexFromArgb(theme.value.palettes.error.tone(50)),
        };
      });
    }
  );

  watch(
    () => runtime.value.customColors,
    () => {
      console.log("Set theme via custom colors");
      theme.value = getThemeFromSourceColor();
    },
    { deep: true }
  );

  const colorMode = reactive(useColorMode());

  const prefersDark = computed<boolean>(() => {
    if (process.server) {
      return runtime.value.options.dark;
    }
    if (colorMode.value === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return colorMode.value === "dark";
  });

  const properties = computed(() => {
    return propertiesFromTheme(theme.value, {
      dark: prefersDark.value,
      tones: runtime.value.options.tones,
    });
  });

  useHead(
    computed(() => ({
      style: [
        {
          id: "theme-properties",
          children: cssFromProperties(properties.value),
        },
      ],
    }))
  );

  const customColors = computed({
    get: () => runtime.value.customColors,
    set: (value) => (runtime.value.customColors = value),
  });

  const sourceColor = computed<string>({
    get: () => runtime.value.colors.primary,
    set: (value) => (runtime.value.colors.primary = value),
  });

  const keyColors = computed({
    get: () => runtime.value.colors,
    set: (value) => (runtime.value.colors = value),
  });

  watch(
    keyColors,
    (kc) => {
      console.log("keyColors", kc);
    },
    { deep: true }
  );

  nuxtApp.provide("theme", theme);
  nuxtApp.provide("prefersDark", prefersDark);
  nuxtApp.provide("keyColors", keyColors);
  nuxtApp.provide("sourceColor", sourceColor);
  nuxtApp.provide("customColors", customColors);
});
