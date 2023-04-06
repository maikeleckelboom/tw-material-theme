import {addPlugin, createResolver, defineNuxtModule} from '@nuxt/kit'

export interface ModuleOptions {
    addPlugin: Boolean
}

const {resolve} = createResolver(import.meta.url)

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'theme',
        configKey: 'theme',
    },
    defaults: {
        addPlugin: true
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
        if (options.addPlugin) {
            addPlugin(resolve('./runtime/plugin'))
        }
    }
})
