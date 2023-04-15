import {ModuleOptions} from "~/modules/theme";

export default defineNuxtConfig({
    // @ts-ignore
    css: [
        '~/assets/css/tailwind.css',
        '~/assets/css/animate.css',
        '~/assets/css/app.css',
    ],
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: '~/tailwind.config.ts',
    },
    modules: [
        '~/modules/theme/index.ts',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        '@vueuse/nuxt',
        'nuxt-icon',
        '@pinia/nuxt',
        'nuxt-viewport',
    ],
    pinia: {
        autoImports: [
            'defineStore',
            'storeToRefs'
        ],
    },
    imports: {
        dirs: [
            '~/utils',
            '~/composables',
            '~/contexts',
            '~/stores'
        ]
    },
    viewport: {
        breakpoints: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            '2xl': 1536,
        }
    },
    appConfig: {
        theme: {
            options: {
                dark: true,
                tones: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100],
            },
            colors: {
                primary: '#9ccfee',
            },
            customColors: [
                {
                    name: 'Arab Blue',
                    value: '#1e3d59',
                    blend: true,
                }
            ]
        } as ModuleOptions
    }
})
