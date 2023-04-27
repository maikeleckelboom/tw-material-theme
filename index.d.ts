import {CustomColor, Scheme, Theme} from "@material/material-color-utilities"
import {z} from 'zod'
import {CorePaletteColors} from "@material/material-color-utilities/palettes/core_palette"
import {Ref} from "vue"


const envVariables = z.object({
    APP_CONFIG: z.string().optional(),
})

envVariables.parse(process.env)

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer(typeof envVariables) {
        }
    }
}

interface ThemeModuleOptions {
    options?: {
        dark?: boolean
        tones?: number[]
    }
    colors?: {
        primary: string
        secondary?: string
        tertiary?: string
        neutral?: string
        neutralVariant?: string
    }
    customColors?: {
        name: string
        value: string
        blend: boolean
    }[]
}

declare module '@nuxt/schema' {
    interface AppConfigInput {
        theme: ThemeModuleOptions
    }

    interface AppConfigInput {
        theme: ThemeModuleOptions
    }

    interface RuntimeConfig {
        public: {
            theme: MaterialModuleConfig
        }
    }

    interface NuxtApp extends NuxtApp {
        $theme: Ref<Theme>
        $keyColors: Ref<CorePaletteHexColors>
        $customColors: Ref<CustomHexColor[]>
        $prefersDark: Ref<boolean>
        $sourceColor: Ref<string>
    }
}


declare module 'vue' {
    interface CSSProperties {
        [key: `--${string}`]: string
    }
}


type SchemeJSON = Infer<typeof Scheme.toJSON>

type CustomHexColor = Omit<CustomColor, 'value'> & { value: string }

type CorePaletteHexColors = {
    [K in keyof CorePaletteColors]: string
}

export {
    SchemeJSON,
    CustomHexColor,
    CorePaletteHexColors,
}
