import {CustomColor, TonalPalette} from "@material/material-color-utilities";
import {ModuleOptions} from "~/modules/theme";
import {ComputedRef} from "vue";

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

type RequiredDeep<T> = {
    [P in keyof T]-?: RequiredDeep<T[P]>
}

declare module 'nuxt/schema' {

    interface AppConfigInput {
        theme: ModuleOptions
    }

    interface RuntimeConfig {
        public: {
            theme: RequiredDeep<ModuleOptions>
        }
    }
}


type KeyModifier<T, U extends string> = {
    [K in keyof T as `${U}${Capitalize<string & K>}`]: T[K];
};

export function modifyKeys<T, U extends string>(obj: T, name: U): KeyModifier<T, U> {
    const modifiedObj = {} as KeyModifier<T, U>;
    for (const key in obj) {
        modifiedObj[`${name}${key.charAt(0).toUpperCase()}${key.slice(1)}`] = obj[key];
    }
    return modifiedObj;
}

interface ColorGroup {
    color: number;
    onColor: number;
    colorContainer: number;
    onColorContainer: number;
}

type ModifiedColorGroup<T extends string> = KeyModifier<ColorGroup, T>;

interface NamedCustomColorGroup<T extends string> {
    light: ModifiedColorGroup<T>
    dark: ModifiedColorGroup<T>
    color: CustomColor
    value: number
}

type CardProps = {
    type?: 'elevated' | 'filled' | 'outlined'
    headline?: string
    subhead?: string
    supportingText?: string
    image?: string
}

export type SchemeJSON = Record<string, number>

export interface CoreScheme extends SchemeJSON {
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


export type ComputedCoreScheme = ComputedRef<CoreScheme>

export {
    ThemeColors,
    ThemeExtendedColor,
    ThemeAppConfig,
    SameValueDifferentKeys
}

