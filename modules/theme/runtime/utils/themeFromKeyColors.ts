import {
    Blend,
    CorePalette,
    customColor,
    CustomColor,
    Scheme,
    Theme,
    TonalPalette
} from "@material/material-color-utilities"

type KeyColors = {
    primary: string;
    secondary?: string;
    tertiary?: string;
    neutral?: string;
    neutralVariant?: string;
    error?: string;
}

export function themeFromKeyColors(keyColors: KeyColors, customColors: CustomColor[]): Theme {
    const colors = allHexToArgb(keyColors)
    const {primary: source} = colors
    const palette = CorePalette.of(source)
    palette.a1 = TonalPalette.fromInt(colors.primary)
    palette.a2 = TonalPalette.fromInt(colors.secondary)
    palette.a3 = TonalPalette.fromInt(colors.tertiary)
    palette.n1 = TonalPalette.fromInt(colors.neutral)
    return {
        source,
        schemes: {
            light: Scheme.lightFromCorePalette(palette),
            dark: Scheme.darkFromCorePalette(palette)
        },
        palettes: {
            primary: TonalPalette.fromInt(colors.primary),
            secondary: TonalPalette.fromInt(colors.secondary),
            tertiary: TonalPalette.fromInt(colors.tertiary),
            neutral: TonalPalette.fromInt(colors.neutral),
            neutralVariant: TonalPalette.fromInt(Blend.harmonize(colors.neutral, colors.primary)),
            error: TonalPalette.fromInt(colors.error)
        },
        customColors: customColors.map(c => customColor(source, c)),
    }
}


/**
 * Original function from @material/material-color-utilities
 * @param source
 * @param customColors
 */
function themeFromSourceColor(source: number, customColors: CustomColor[] = []) {
    const palette = CorePalette.of(source);
    return {
        source,
        schemes: {
            light: Scheme.light(source),
            dark: Scheme.dark(source),
        },
        palettes: {
            primary: palette.a1,
            secondary: palette.a2,
            tertiary: palette.a3,
            neutral: palette.n1,
            neutralVariant: palette.n2,
            error: palette.error,
        },
        customColors: customColors.map((c) => customColor(source, c)),
    };
}

