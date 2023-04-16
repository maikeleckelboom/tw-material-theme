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
    colorMode: {
        classSuffix: '',
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
            '~/stores',
            '~/utils',
            '~/composables',
            '~/contexts',
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
                tones: [
                    0,
                    4,
                    5,
                    6,
                    10,
                    12,
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
                primary: '#21628A',
            },
            customColors: [
                {
                    name: 'Cornflower Blue',
                    value: '#9CCFEE',
                    blend: true,
                }
            ]
        } as ModuleOptions
    }
})
