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
    typescript: {
        strict: true
    },
    appConfig: {
        theme: {
            options: {
                dark: true,
            },
            colors: {
                primary: '#215e8a',  // Alpha Hex is not supported (yet)
            },
            customColors: []
        }
    }
})
