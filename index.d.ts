declare module 'nuxt/schema' {
    interface AppConfigInput {
        /**
         * Theme configuration
         */
        theme?: {
            dark?: boolean
            tones?: number[]
            colors?: {
                primary?: string
                secondary?: string
                tertiary?: string
                neutral?: string
                error?: string
            },
            customColors?: {
                name: string
                value: string
                blend: boolean
            }[],
        }
    }
}
