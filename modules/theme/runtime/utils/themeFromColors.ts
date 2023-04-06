import {Blend, CorePalette, CustomColorGroup, Scheme, Theme, TonalPalette} from "@material/material-color-utilities";
import {allHexToArgb} from "~/modules/theme/runtime/utils/allHexToArgb";

export function themeFromColors(keyColors: Record<string, string>, customColors: CustomColorGroup[]): Theme {
    const colors = allHexToArgb(keyColors)
    const palette = CorePalette.of(colors.primary)
    palette.a2 = TonalPalette.fromInt(colors.secondary)
    palette.a3 = TonalPalette.fromInt(colors.tertiary)
    palette.n1 = TonalPalette.fromInt(colors.neutral)
    return {
        source: colors.primary,
        palettes: {
            primary: TonalPalette.fromInt(colors.primary),
            secondary: TonalPalette.fromInt(colors.secondary),
            tertiary: TonalPalette.fromInt(colors.tertiary),
            neutral: TonalPalette.fromInt(colors.neutral),
            neutralVariant: TonalPalette.fromInt(Blend.harmonize(colors.neutral, colors.primary)),
            error: TonalPalette.fromInt(colors.error)
        },
        schemes: {
            light: Scheme.lightFromCorePalette(palette),
            dark: Scheme.darkFromCorePalette(palette)
        },
        customColors: unref(customColors)
    }
}
