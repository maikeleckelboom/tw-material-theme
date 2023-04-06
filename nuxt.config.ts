export default defineNuxtConfig({
    // @ts-ignore
    css: [
        '~/assets/css/tailwind.css',
        '~/assets/css/app.css'
    ],
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: '~/tailwind.config.ts',
    },
    modules: [
        '~/modules/theme/index.ts',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        'nuxt-icon',
        '@vueuse/nuxt',
    ],
    nuxtIcon: {
        size: '24px',
        class: 'icon',
    },
    imports: {
        dirs: [
            '~/components',
            '~/utils',

        ]
    },
    appConfig: {
        theme: {
            dark: true,
            colors: {
                primary: '#e6ff00',
            },
            customColors: []
        },
    }
})
