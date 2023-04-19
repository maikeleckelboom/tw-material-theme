import {argbFromHex, hexFromArgb, Theme, themeFromSourceColor} from "@material/material-color-utilities";
import {propertiesFromTheme} from "@webhead/material-color-properties";
import {themeFromKeyColors} from "#imports";
import {Ref} from "vue";
import {CustomHexColor} from "~";


export default defineNuxtPlugin((nuxtApp) => {

    const runtime = computed(() => {
        const {public: {theme}} = useRuntimeConfig()
        return theme
    })

    const getThemeFromSourceColor = () => themeFromSourceColor(
        argbFromHex(runtime.value.colors.primary),
        argbCustomColors(runtime.value.customColors)
    )

    const getThemeFromKeyColors = () => themeFromKeyColors(
        runtime.value.colors,
        argbCustomColors(runtime.value.customColors)
    )

    const theme = ref(getThemeFromSourceColor()) as Ref<Theme>

    const {trigger, ignoreUpdates} = watchTriggerable(
        () => [
            runtime.value.colors.secondary,
            runtime.value.colors.tertiary,
            runtime.value.colors.neutral,
            runtime.value.colors.neutralVariant
        ],
        () => theme.value = getThemeFromKeyColors()
    )

    watch(() => runtime.value.colors.primary, () => {
        theme.value = getThemeFromSourceColor()
        ignoreUpdates(() => {
            runtime.value.colors = {
                ...runtime.value.colors,
                secondary: hexFromArgb(theme.value.palettes.secondary.tone(50)),
                tertiary: hexFromArgb(theme.value.palettes.tertiary.tone(50)),
                neutral: hexFromArgb(theme.value.palettes.neutral.tone(50)),
                neutralVariant: hexFromArgb(theme.value.palettes.neutralVariant.tone(50))
            }
        })
    })

    watch(() => runtime.value.customColors, () => {
        theme.value = getThemeFromSourceColor()
    }, {deep: true})

    // Palettes
    watch(() => theme.value.palettes, () => {
        console.log('palettes changed')
        
    }, {deep: true})


    const colorMode = reactive(useColorMode())

    const prefersDark = computed<boolean>(() => {
        if (process.server) {
            return runtime.value.options.dark
        }
        if (colorMode.value === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        return colorMode.value === 'dark'
    })

    const properties = computed(() => propertiesFromTheme(theme.value, {
        dark: prefersDark.value,
        tones: runtime.value.options.tones
    }))

    useHead(computed(() => ({
        style: [
            {
                id: 'theme-properties',
                children: cssFromProperties(properties.value)
            }
        ]
    })))

    const customColors = computed<CustomHexColor[]>({
        get: () => runtime.value.customColors,
        set: (value) => runtime.value.customColors = value
    })

    const sourceColor = computed<string>({
        get: () => runtime.value.colors.primary,
        set: (value) => runtime.value.colors.primary = value
    })

    const keyColors = computed({
        get: () => runtime.value.colors,
        set: (value) => runtime.value.colors = value
    })

    nuxtApp.provide('theme', theme)
    nuxtApp.provide('prefersDark', prefersDark)
    nuxtApp.provide('keyColors', keyColors)
    nuxtApp.provide('sourceColor', sourceColor)
    nuxtApp.provide('customColors', customColors)
})
