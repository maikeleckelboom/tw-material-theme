import {CustomColor, Scheme, Theme} from "@material/material-color-utilities"
import {z} from 'zod'
import {CorePaletteColors} from "@material/material-color-utilities/palettes/core_palette"
import {Ref} from "vue"
import {DialogInstance} from "~/modules/dialog/runtime/plugin";


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


interface HctColor {
    hue: number
    chroma: number
    tone: number
}

interface CorePaletteColors {
    primary: HctColor
    secondary: HctColor
    tertiary: HctColor
    error: HctColor
    neutral: HctColor
    neutralVariant: HctColor
}

type SchemeJSON = Infer<typeof Scheme.toJSON>

type CustomHexColor = Omit<CustomColor, 'value'> & { value: string }


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
        error?: string
    }
    customColors?: {
        name: string
        value: string
        blend: boolean
    }[]
}

export type KeyColors = {
    primary: string
    secondary: string
    tertiary: string
    neutral: string
    neutralVariant: string
    error: string
}


declare module '@nuxt/schema' {
    interface AppConfigInput {
        theme: ThemeModuleOptions
    }

    interface RuntimeConfig {
        public: {
            theme: MaterialModuleConfig
        }
    }

    interface NuxtApp {
        $theme: Ref<Theme>
        $keyColors: Ref<KeyColors>
        $customColors: Ref<CustomHexColor[]>
        $prefersDark: Ref<boolean>
        $sourceColor: Ref<string>
        $coreHctColors: Ref<CorePaletteColors>
        $dialog: DialogInstance
    }
}
declare module '#app' {
    interface NuxtApp {
        $theme: Ref<Theme>
        $keyColors: Ref<KeyColors>
        $customColors: Ref<CustomHexColor[]>
        $prefersDark: Ref<boolean>
        $sourceColor: Ref<string>
        $coreHctColors: Ref<CorePaletteColors>
        $dialog: DialogInstance
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $theme: Ref<Theme>
        $keyColors: Ref<KeyColors>
        $customColors: Ref<CustomHexColor[]>
        $prefersDark: Ref<boolean>
        $sourceColor: Ref<string>
        $coreHctColors: Ref<CorePaletteColors>
        $dialog: DialogInstance
    }
}

export {
    SchemeJSON,
    CustomHexColor,
    HctColor,
    corePaletteColors,
    CorePaletteColors
}
