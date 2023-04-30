import {addPlugin, createResolver, defineNuxtModule, extendPages} from "nuxt/kit"
import {ModuleOptions} from "@nuxt/schema";

const {resolve} = createResolver(import.meta.url)

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'dialog',
        configKey: 'dialog',
        version: '0.0.1',
        compatibility: {
            nuxt: '^3.0.0',
        },
    },
    defaults: {},
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
        addPlugin(resolve('./runtime/plugin'))
    }
})
