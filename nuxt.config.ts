import {ThemeAppConfig} from "~/index";

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
    imports: {
        dirs: [
            '~/utils',
            '~/composables',
            '~/contexts',
        ]
    },
    appConfig: {
        theme: {
            options: {
                dark: true,
                tones: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100],
            },
            colors: {
                primary: '#9CD1EE', // todo: Allow different formats (e.g. hex, rgb, argb, hsl)
                secondary: '#ffcc00',
                tertiary: '#5cacff',
                neutral: '#f5f5f5',
                error: '#ff0000',
            },
            customColors: [
                {
                    name: 'nuxt.config color',
                    value: '#1bb222',
                    blend: true,
                }
            ]
        } as ThemeAppConfig
    }
})
