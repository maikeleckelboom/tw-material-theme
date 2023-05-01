export default defineNuxtConfig({
    // @ts-ignore
    experimental: {
        viewTransition: false,
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
    typescript: {
        strict: true
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
                primary: '#e7bf65',
            },
            customColors: [
                {
                    name: 'Black Barret',
                    value: '#1c1e21',
                    blend: true
                }
            ]
        }
    }
})
