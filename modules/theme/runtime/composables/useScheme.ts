import {Scheme} from "@material/material-color-utilities";
import {ComputedRef} from "vue";

export type SchemeProps = {
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

export const useScheme = (): ComputedRef<SchemeProps> => {
    const theme = useTheme()
    const colorMode = ref<'dark' | 'light'>('dark')
    return computed(() => {
        return colorMode.value === 'dark'
            ? theme.value.schemes.dark.toJSON()
            : theme.value.schemes.light.toJSON()
    })
}
