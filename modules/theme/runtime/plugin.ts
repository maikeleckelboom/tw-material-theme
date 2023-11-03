import {argbFromHex, hexFromArgb, Theme, themeFromSourceColor} from "@material/material-color-utilities";
import {propertiesFromTheme} from "@webhead/material-color-properties";
import {themeFromKeyColors, useThemeStore} from "#imports";
import {CustomHexColor} from "~";
import {Pinia} from "pinia";


export default defineNuxtPlugin(async ({$pinia, ...nuxtApp}) => {
    const runtime = computed(() => {
        const {public: {theme}} = useRuntimeConfig()
        return theme
    })

    const store = useThemeStore($pinia as Pinia)

    const {theme} = storeToRefs(store)

    const getThemeFromSourceColor = () => themeFromSourceColor(
        argbFromHex(runtime.value.colors.primary),
        argbCustomColors(runtime.value.customColors as CustomHexColor[])
    )

    const getThemeFromKeyColors = () => themeFromKeyColors(
        runtime.value.colors,
        argbCustomColors(runtime.value.customColors as CustomHexColor[])
    )


    theme.value = JSON.parse(JSON.stringify(getThemeFromSourceColor()))

    // const {trigger, ignoreUpdates} = watchTriggerable(
    //     () => [
    //         runtime.value.colors.secondary,
    //         runtime.value.colors.tertiary,
    //         runtime.value.colors.neutral,
    //         runtime.value.colors.neutralVariant
    //     ],
    //     () => theme.value = getThemeFromKeyColors()
    // )

    // watch(() => runtime.value.colors.primary, () => {
    //     theme.value = getThemeFromSourceColor()
    //     ignoreUpdates(() => {
    //         runtime.value.colors = {
    //             ...runtime.value.colors,
    //             secondary: hexFromArgb(theme.value.palettes.secondary.tone(50)),
    //             tertiary: hexFromArgb(theme.value.palettes.tertiary.tone(50)),
    //             neutral: hexFromArgb(theme.value.palettes.neutral.tone(50)),
    //             neutralVariant: hexFromArgb(theme.value.palettes.neutralVariant.tone(50)),
    //             error: hexFromArgb(theme.value.palettes.error.tone(50))
    //         }
    //     })
    // })

    // watch(() => runtime.value.customColors, () => {
    //     theme.value = getThemeFromSourceColor()
    // }, {deep: true})

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

    // const properties = computed(() => {
    //     if (!theme.value) return {}
    //     propertiesFromTheme(theme.value as Theme, {
    //         dark: prefersDark.value,
    //         tones: runtime.value.options.tones
    //     })
    // })
    //
    // useHead(computed(() => {
    //     if (!properties.value) return {}
    //     return {
    //         style: [
    //             {
    //                 id: 'theme-properties',
    //                 children: cssFromProperties(properties.value)
    //             }
    //         ]
    //     }
    // }))

    const customColors = computed({
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
