import {argbFromHex, CustomColor, hexFromArgb, Theme, themeFromSourceColor} from "@material/material-color-utilities";
import {propertiesFromTheme} from "@webhead/material-color-properties";
import {themeFromKeyColors} from "#imports";
import {Ref} from "vue";

const cssFromProperties = (input: Record<string, string>) => `:root {${Object.entries(input)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n')}}`;


export type CustomColorHex = Omit<CustomColor, 'value'> & { value: string };

const argbCustomColors = (customColors: CustomColorHex[]) => customColors.map(customColor => ({
    name: customColor.name,
    value: argbFromHex(customColor.value),
    blend: customColor.blend
}))

export default defineNuxtPlugin(() => {

    const runtime = computed(() => {
        // const {public: {appConfig: {theme}}} = useRuntimeConfig()
        // return theme
        const {public: {theme}} = useRuntimeConfig()
        return theme
    })

    const keyColors = computed({
        get: () => runtime.value.colors,
        set: (value) => runtime.value.colors = value
    })

    const getThemeFromSourceColor = () => themeFromSourceColor(
        argbFromHex(runtime.value.colors.primary),
        argbCustomColors(runtime.value.customColors)
    )

    const getThemeFromKeyColors = () => themeFromKeyColors(
        runtime.value.colors,
        argbCustomColors(runtime.value.customColors)
    )

    const theme = ref(getThemeFromKeyColors()) as Ref<Theme>

    watch(() => [keyColors.value.secondary, keyColors.value.tertiary, keyColors.value.neutral, keyColors.value.neutralVariant], () => {
        theme.value = getThemeFromKeyColors()
    })

    watch(() => keyColors.value.primary, (primaryColor) => {
        theme.value = getThemeFromSourceColor()
        keyColors.value = {
            primary: primaryColor,
            secondary: hexFromArgb(theme.value.palettes.secondary.tone(50)),
            tertiary: hexFromArgb(theme.value.palettes.tertiary.tone(50)),
            neutral: hexFromArgb(theme.value.palettes.neutral.tone(50)),
            neutralVariant: hexFromArgb(theme.value.palettes.neutralVariant.tone(50)),
        }
    })


    // Dark mode check
    const colorMode = reactive(useColorMode())
    const isDarkMode = computed(() => {
        if (colorMode.unknown) {
            return runtime.value.options.dark
        }
        if (colorMode.value === 'dark') {
            return true
        }
        if (colorMode.value === 'light') {
            return false
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    // Create computed state (based on reactive state), use it to generate CSS properties
    const properties = computed(() => propertiesFromTheme(theme.value, {
        dark: isDarkMode.value,
        tones: runtime.value.options.tones
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


    return {
        provide: {
            theme,
            sourceColor: computed({
                get: () => runtime.value.colors.primary,
                set: (value) => runtime.value.colors.primary = value
            }),
            customColors: computed({
                get: () => runtime.value.customColors,
                set: (value) => runtime.value.customColors = value
            }),
            isDarkMode,
            keyColors
        }
    }
})
