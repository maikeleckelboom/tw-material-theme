import {argbFromHex, CustomColor, Theme, themeFromSourceColor} from "@material/material-color-utilities";
import {propertiesFromTheme} from "@webhead/material-color-properties";

export default defineNuxtPlugin(() => {
    // Get user config
    const {public: {theme: themeAppConfig}} = useRuntimeConfig()

    // Set up reactive state (based on user config)
    const sourceColor = ref(themeAppConfig.colors.primary)
    const customColors = ref(themeAppConfig.customColors)

    // Create computed state (based on reactive state)
    const theme = computed<Theme>(() => themeFromSourceColor(
        argbFromHex(sourceColor.value),
        customColors.value.map((customColor) => ({
            name: customColor.name,
            value: argbFromHex(customColor.value),
            blend: customColor.blend
        } as CustomColor))
    ))

    // Create computed state (based on reactive state)
    const colorMode = reactive(useColorMode())

    // Inline utility to check if dark mode is preferred
    const prefersDark = computed(() => {
        if (process.server && colorMode.unknown) return !!themeAppConfig.options.dark
        if (colorMode.value === 'dark') return true
        if (colorMode.value === 'light') return false
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    // Create computed state (based on reactive state), use it to generate CSS properties
    const properties = computed(() => propertiesFromTheme(theme.value, {
        dark: prefersDark.value
    }))


    // todo: make optional
    const wrap = (val: string) => `:root {\n${val}\n}}`
    useHead(computed(() => ({
        style: [
            {
                id: 'theme-properties',
                children: wrap(Object.entries(properties.value)
                    .map(([key, value]) => `${key}: ${value};`)
                    .join('\n'))
            }
        ]
    })))

    return {
        provide: {
            theme,
            sourceColor,
            customColors
        }
    }
})
