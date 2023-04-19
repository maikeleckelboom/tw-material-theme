import {CustomColor, Scheme, Theme} from "@material/material-color-utilities";
import {z} from 'zod'
import {CorePaletteColors} from "@material/material-color-utilities/palettes/core_palette";
import {Ref} from "vue";


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


export interface MaterialModuleInputConfig {
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

export type MaterialConfigInput = MaterialModuleInputConfig

export type CustomHexColor = Omit<CustomColor, 'value'> & { value: string }

export type CorePaletteHexColors = {
    [K in keyof CorePaletteColors]: string
}

export type SchemeJSON = Infer<typeof Scheme.toJSON>

declare module '#app' {
    interface AppConfigInput {
        theme: MaterialModuleInputConfig
    }

    interface RuntimeConfig {
        public: {
            theme: MaterialModuleConfig
        }
    }

    interface NuxtApp {
        $theme: Ref<Theme>
        $keyColors: Ref<CorePaletteHexColors>
        $customColors: Ref<CustomHexColor[]>
        $prefersDark: Ref<boolean>
        $sourceColor: Ref<string>
    }
}

export {}
