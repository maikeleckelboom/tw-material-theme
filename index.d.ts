export type SchemeProperties = {
    primary: number;
    onPrimary: number;
    primaryContainer: number;
    onPrimaryContainer: number;
    secondary: number;
    onSecondary: number;
    secondaryContainer: number;
    onSecondaryContainer: number;
    tertiary: number;
    onTertiary: number;
    tertiaryContainer: number;
    onTertiaryContainer: number;
    error: number;
    onError: number;
    errorContainer: number;
    onErrorContainer: number;
    background: number;
    onBackground: number;
    surface: number;
    onSurface: number;
    surfaceVariant: number;
    onSurfaceVariant: number;
    outline: number;
    outlineVariant: number;
    shadow: number;
    scrim: number;
    inverseSurface: number;
    inverseOnSurface: number;
    inversePrimary: number;
}

/**
 * Theme configuration
 */
type ThemeColors = {
    primary?: string
    secondary?: string
    tertiary?: string
    neutral?: string
    error?: string
}

type ThemeExtendedColor = {
    name: string
    value: string
    blend: boolean
}

interface ThemeAppConfig {
    options?: {
        dark?: boolean
        tones?: number[]
    }
    colors?: ThemeColors
    customColors?: ThemeExtendedColor[],
}

type RequiredDeep<T> = {
    [P in keyof T]-?: RequiredDeep<T[P]>
}

declare module 'nuxt/schema' {

    interface AppConfigInput {
        theme: ThemeAppConfig
    }

    interface RuntimeConfig {
        public: {
            theme: RequiredDeep<ThemeAppConfig>
        }
    }
}

export {
    ThemeColors,
    ThemeExtendedColor,
    ThemeAppConfig,
}
