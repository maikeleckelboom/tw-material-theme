import {argbFromHex, hexFromArgb, themeFromSourceColor} from "@material/material-color-utilities"
import {addPlugin, createResolver, defineNuxtModule} from "nuxt/kit"
import {defu} from "defu"
import {ModuleOptions} from "@nuxt/schema";

const {resolve} = createResolver(import.meta.url)

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'theme',
        configKey: 'theme',
        version: '0.0.1',
        compatibility: {
            nuxt: '^3.0.0',
        },
    },
    defaults: {
        options: {
            dark: false,
            tones: [0, 4, 5, 6, 10, 12, 14, 15, 17, 20, 22, 24, 25, 30, 40, 50, 60, 70, 80, 90, 95, 100],
        },
        colors: {
            primary: '#5e48ae',
            secondary: undefined,
            tertiary: undefined,
            neutral: undefined,
            neutralVariant: undefined,
            error: undefined,
        },
        customColors: []
    },
    hooks: {
        'components:dirs'(dirs) {
            dirs.push({
                path: resolve('./runtime/components'),
                pathPrefix: false
            })
        },
        'imports:dirs'(dirs) {
            dirs.push(
                resolve('./runtime/composables'),
                resolve('./runtime/utils')
            )
        }
    },
    setup: function (options, nuxt) {
        const moduleOptions = defu(nuxt.options.appConfig.theme ?? {}, options)
        const {colors} = moduleOptions
        const t = themeFromSourceColor(argbFromHex(colors.primary))
        Object.keys(colors).filter(c => !colors[c as keyof typeof colors]).forEach(color => {
            const c = color as keyof typeof colors
            colors[c] = hexFromArgb(t.palettes[c].tone(50))
        })
        nuxt.options.appConfig.theme = moduleOptions
        nuxt.options.runtimeConfig.public.theme = moduleOptions
        addPlugin(resolve('./runtime/plugin'))
    }
})
