import {Ref} from "vue"
import {TonalPalette} from "@material/material-color-utilities"

export const usePalettes = (filter: ('system' | & 'custom')[] = ['custom']): Ref<Record<string, TonalPalette>> => {
    const {$theme} = useNuxtApp(), {public: {theme: {options}}} = useRuntimeConfig()
    return computed(() => ({
        ...(filter.includes('system') ? {} : $theme.value.palettes),
        ...(filter.includes('custom') ? {} : $theme.value.customColors.reduce((acc, customColor) => {
            acc[camelize(customColor.color.name)] = paletteFromCustomColor(customColor, $theme.value.source, options.tones)
            return acc
        }, {} as Record<string, TonalPalette>))
    }))
}
