import {argbFromHex, CustomColor, hexFromArgb, Theme, themeFromSourceColor} from "@material/material-color-utilities";
import {propertiesFromTheme} from "@webhead/material-color-properties";

const cssFromProperties = (input: Record<string, string>) => `:root {${Object.entries(input)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n')}}`;

export default defineNuxtPlugin(() => {

    const $runtimeConfig = computed(() => {
        const {public: {theme}} = useRuntimeConfig()
        return theme
    })

    const runtimeKeyColors = reactive({
        primary: $runtimeConfig.value.colors.primary,
        secondary: $runtimeConfig.value.colors.secondary,
        tertiary: $runtimeConfig.value.colors.tertiary,
        neutral: $runtimeConfig.value.colors.neutral,
    })

    const sourceColor = computed({
        get: () => runtimeKeyColors.primary,
        set: (value) => runtimeKeyColors.primary = value
    })

    const customColors = computed({
        get: () => $runtimeConfig.value.customColors,
        set: (value) => $runtimeConfig.value.customColors = value
    })

    const theme = computed<Theme>(() => {
        return themeFromSourceColor(
            argbFromHex(sourceColor.value),
            customColors.value.map((customColor) => ({
                name: customColor.name,
                value: argbFromHex(customColor.value),
                blend: customColor.blend
            } as CustomColor))
        )
    })


    // Inline utility to check if dark mode is preferred
    const colorMode = reactive(useColorMode())
    const prefersDark = computed(() => {
        if (process.server && colorMode.unknown)
            return !!$runtimeConfig.value.options.dark
        if (colorMode.value === 'dark') return true
        if (colorMode.value === 'light') return false
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    //
    const keyColors = reactive({
        primary: computed({
            get: () => sourceColor.value,
            set: (hexValue) => sourceColor.value = hexValue
        }),
        secondary: hexFromArgb(theme.value.palettes.secondary.tone(prefersDark.value ? 60 : 40)),
        tertiary: hexFromArgb(theme.value.palettes.tertiary.tone(prefersDark.value ? 60 : 40)),
        neutral: hexFromArgb(theme.value.palettes.neutral.tone(prefersDark.value ? 60 : 40)),
    })
    //

    // Create computed state (based on reactive state), use it to generate CSS properties
    const properties = computed(() => propertiesFromTheme(theme.value, {
        dark: prefersDark.value,
        tones: $runtimeConfig.value.options.tones
    }))

    // Add CSS properties to the <head> element
    useHead(computed(() => ({
        style: [
            {
                id: 'theme-properties',
                children: cssFromProperties(properties.value)
            }
        ]
    })))


    // We still the keyColors

    return {
        provide: {
            theme,
            sourceColor,
            customColors,
            isDarkMode: prefersDark,
            coreKeyColors: runtimeKeyColors,
            keyColors
        }
    }
})
