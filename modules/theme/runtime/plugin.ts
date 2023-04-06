import {argbFromHex, CustomColor, Theme, themeFromSourceColor} from "@material/material-color-utilities";
import {propertiesFromTheme} from "@webhead/material-color-properties";

export interface ThemeConfig {
    sourceColor: string
    customColors: {
        name: string
        value: string
        blend: boolean
    }[]
}

export const keyColorKeys = [
    'primary',
    'secondary',
    'tertiary',
    'error',
    'neutral',
    'neutralVariant',
] as const

export default defineNuxtPlugin((nuxt) => {
    // @ts-ignore
    const config = nuxt.$config.public.theme

    const {sourceColor, customColors} = toRefs(reactive<ThemeConfig>({
        sourceColor: config.colors.primary,
        customColors: config.customColors,
    }))

    const theme = computed<Theme>(() => themeFromSourceColor(
        argbFromHex(sourceColor.value),
        customColors.value.map((customColor) => ({
            name: customColor.name,
            value: argbFromHex(customColor.value),
            blend: customColor.blend
        } as CustomColor))
    ))

    // todo: move to central config
    const colorMode = reactive(useColorMode())
    const properties = computed(() => propertiesFromTheme(theme.value, {
        dark: colorMode.unknown || colorMode.value === 'dark',
        rgb: {separator: ` `}
    }))
    // Stop todo: move to central config

    watch(colorMode, () => {
        console.log('colorMode', colorMode.value)


    })
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
    // Stop todo: make optional

    return {
        provide: {
            theme,
            sourceColor,
            customColors
        }
    }
})
