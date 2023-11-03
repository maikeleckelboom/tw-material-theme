import {argbFromHex, hexFromArgb, Theme, themeFromSourceColor} from "@material/material-color-utilities";
import {CustomHexColor} from "~";
import {themeFromKeyColors} from "~/modules/theme/runtime/utils/themeFromKeyColors";
import {propertiesFromTheme} from "@webhead/material-color-properties";

type SideSheetSchemeRecord = {
    name: string
    lightColor: string
    darkColor: string
    isKey: boolean
    isOpen?: boolean
}

type SideSheetScheme = Record<string, SideSheetSchemeRecord>

export const useThemeStore = defineStore('theme-store', () => {
    const runtime = computed(() => {
        const {public: {theme}} = useRuntimeConfig()
        return theme
    })

    const theme = ref<Theme>()

    const setTheme = (t: Theme) => {
        theme.value = t
    }

    const scheme = computed(() => {
        if (!theme.value) return {}
        return runtime.value.options.dark
            ? theme.value.schemes.dark
            : theme.value.schemes.light
    })

    const keyColors = reactive({
        primary: argbFromHex(runtime.value.colors.primary),
        secondary: argbFromHex(runtime.value.colors.secondary),
        tertiary: argbFromHex(runtime.value.colors.tertiary),
        neutral: argbFromHex(runtime.value.colors.neutral),
        neutralVariant: argbFromHex(runtime.value.colors.neutralVariant),
        error: argbFromHex(runtime.value.colors.error),
    })

    whenever(() => runtime.value.colors.primary, () => {
        keyColors.primary = argbFromHex(runtime.value.colors.primary)
    })

    const getThemeFromKeyColors = () => themeFromKeyColors(
        runtime.value.colors,
        argbCustomColors(runtime.value.customColors as CustomHexColor[])
    )

    const getThemeFromSourceColor = () => themeFromSourceColor(
        argbFromHex(runtime.value.colors.primary),
        argbCustomColors(runtime.value.customColors as CustomHexColor[])
    )

    const properties = computed(() => {
        if (!theme.value) return {}
        return propertiesFromTheme(theme.value, {
            dark: runtime.value.options.dark,
            tones: runtime.value.options.tones
        })
    })

    useHead(computed(() => {
        if (!properties.value) return {}
        return {
            style: [
                {
                    id: 'theme-properties',
                    children: cssFromProperties(properties.value)
                }
            ]
        }
    }))

    const colorSchemePanel = computed(() => {
        if (!theme.value) return []
        return Object.entries(scheme.value).reduce((acc, [key, value]) => {
            acc.push({
                name: nameFromKey(key),
                // @ts-ignore
                lightColor: hexFromArgb(theme.value.schemes.light[key]).toUpperCase(),
                // @ts-ignore
                darkColor: hexFromArgb(theme.value.schemes.dark[key]).toUpperCase(),
                isKey: Object.keys(keyColors).includes(key),
                ...(Object.keys(keyColors).includes(key) && {isOpen: true})

            })
            return acc
        }, [] as SideSheetSchemeRecord[])
    })


    return {
        theme,
        keyColors,
        scheme,
        setTheme,
        colorSchemePanel,
        getThemeFromSourceColor,
        getThemeFromKeyColors,
    }
})
