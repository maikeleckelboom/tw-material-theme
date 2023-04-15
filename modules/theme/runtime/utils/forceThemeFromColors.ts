import {
    argbFromHex,
    Blend,
    CorePalette,
    CustomColor,
    CustomColorGroup,
    Scheme,
    Theme, themeFromSourceColor,
    TonalPalette
} from "@material/material-color-utilities";
import {allHexToArgb} from "~/modules/theme/runtime/utils/allHexToArgb";

export function forceThemeFromColors(primary: string, customColors: CustomColor[], overrides: { secondary?: string, tertiary?: string, neutral?: string, }) {
    const {secondary, tertiary, neutral} = allHexToArgb(overrides)
    const sourceColor = argbFromHex(primary)

    const palette = CorePalette.of(argbFromHex(primary))

    if (secondary) {
        palette.a2 = TonalPalette.fromInt(secondary)
    }

    if (tertiary) {
        palette.a3 = TonalPalette.fromInt(tertiary)
    }

    const originalTheme = themeFromSourceColor(sourceColor, customColors)


    const theme = {
        ...originalTheme,
        palettes: {
            ...originalTheme.palettes,
            secondary: secondary ? TonalPalette.fromInt(secondary) : originalTheme.palettes.secondary,
            tertiary: tertiary ? TonalPalette.fromInt(tertiary) : originalTheme.palettes.tertiary,
            neutral: neutral ? TonalPalette.fromInt(neutral) : originalTheme.palettes.neutral,
            neutralVariant: neutral ? TonalPalette.fromInt(neutral) : originalTheme.palettes.neutralVariant,
            error: originalTheme.palettes.error,
        },
        customColors
    }

    console.log('theme', theme)

    return theme
}
