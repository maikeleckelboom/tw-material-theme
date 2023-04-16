import {addPlugin, createResolver, defineNuxtModule} from "@nuxt/kit";
import {defu} from "defu";

/**
 const structureProposal = {
    options: {
        dark: false,
        tones: [0, 10, 20, 30, 35, 40, 45, 50, 60, 70, 80, 90, 95, 99, 100],
    },
    colors: {
        primary: '#52ae48',
        secondary: '#ffcc00',
        tertiary: '#5cacff',
        neutral: '#f5f5f5',
        error: '#ff0000',
        extended: [
            {
                name: 'Cerulean',
                value: '#007ba7',
                blend: true,
            },
            {
                name: 'Indian Red',
                value: '#b0171f',
                blend: true,
            }
        ]
    },
}
 **/

const {resolve} = createResolver(import.meta.url)

export interface ModuleOptions {
    options?: {
        dark?: boolean
        tones?: number[]
    }
    colors?: {
        primary?: string
        secondary?: string
        tertiary?: string
        neutral?: string
        error?: string
    }
    customColors?: {
        name: string
        value: string
        blend: boolean
    }[]
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'theme',
        configKey: 'theme',
        compatibility: {
            nuxt: '^3.0.0'
        }
    },
    defaults: {
        options: {
            dark: false,
            tones: [
                0,
                4,
                5,
                6,
                10,
                12,
                14,
                15,
                17,
                20,
                22,
                24,
                25,
                30,
                40,
                50,
                60,
                70,
                80,
                90,
                95,
                100,
            ],
        },
        colors: {
            primary: '#52ae48',
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
    setup(options, nuxt) {
        const moduleOptions = defu(nuxt.options.appConfig.theme ?? {}, options)
        nuxt.options.appConfig.theme = moduleOptions
        nuxt.options.runtimeConfig.public.theme = moduleOptions
        addPlugin(resolve('./runtime/plugin'))
    }
})
