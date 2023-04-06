import {argbFromHex, CustomColor, Theme, themeFromSourceColor} from "@material/material-color-utilities";
import {propertiesFromTheme} from "@webhead/material-color-properties";

interface ThemeConfig {
    sourceColor: string,
    customColors: {
        name: string,
        value: string,
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

export default defineNuxtPlugin((_nuxt) => {

    const themeContext = reactive<ThemeConfig>({
        sourceColor: '#487aae',
        customColors: [
            {
                name: 'Cool Blue',
                value: '#5cacff',
                blend: true,
            },
            {
                name: 'Indian Red',
                value: '#932323',
                blend: false,
            },
            {
                name: 'Dark Orange',
                value: '#ff8c00',
                blend: false,
            }
        ],
    })

    const {
        sourceColor,
        customColors
    } = toRefs(themeContext)

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

    // const colorMode = computed(() => useColorMode().value)

    const properties = computed(() => propertiesFromTheme(theme.value, {
            dark: colorMode.unknown || colorMode.value === 'dark',
            rgb: {
                separator: " "
            }
        }
    ))
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
