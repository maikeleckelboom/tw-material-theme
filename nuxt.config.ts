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
        '~/modules/theme/module.ts',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        'nuxt-icon'
    ],
    nuxtIcon: {
        size: '4em',
        class: 'icon',
    }
})
