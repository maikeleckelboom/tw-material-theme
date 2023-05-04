export default defineNuxtConfig({
    // @ts-ignore
    app: {
        layoutTransition: {
            name: 'layout',
            mode: 'out-in'
        },
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        },
    },
    colorMode: {
        classSuffix: '',
    },
    // @ts-ignore
    css: [
        '~/assets/css/tailwind.css',
        '~/assets/css/animate.css',
        '~/assets/css/app.css',
    ],
    imports: {
        dirs: [
            'stores',
            'utils',
            'composables',
            'components/SideSheet',
        ]
    },
    modules: [
        '~/modules/theme/index.ts',
        '~/modules/dialog/index.ts',
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
            'storeToRefs',
        ],
    },
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: '~/tailwind.config.ts',
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
            },
            colors: {
                primary: '#2f2867',
            },
            customColors: [
                {
                    name: 'Purple Cream',
                    value: '#a6a6d8',
                },
                {
                    name: 'Green Turtle',
                    value: '#a6be89',
                },
                {
                    name: 'Blue Sky',
                    value: '#a6d8d8',
                }
            ]
        }
    }
})
