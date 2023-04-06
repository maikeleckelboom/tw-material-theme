import {addPlugin, createResolver, defineNuxtModule} from "@nuxt/kit";

const {resolve} = createResolver(import.meta.url)

export interface ModuleOptions {
    dark?: boolean,
    colors?: {
        primary?: string,
        secondary?: string,
        tertiary?: string,
        neutral?: string,
        error?: string
    },
    customColors?: {
        name: string,
        value: string,
        blend: boolean
    }[],
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
        dark: false,
        colors: {
            primary: '#487aae',
            secondary: '#ffcc00',
            tertiary: '#5cacff',
            neutral: '#f5f5f5',
            error: '#ff0000'
        },

    },
    hooks: {
        'components:dirs'(dirs) {
            dirs.push({
                path: resolve('./runtime/components'),
                pathPrefix: false
            })
        },
        'imports:dirs'(dirs) {
            dirs.push(resolve('./runtime/composables'))
        }
    },
    setup(options, nuxt) {
        addPlugin(resolve('./runtime/plugin'))
    }
})
