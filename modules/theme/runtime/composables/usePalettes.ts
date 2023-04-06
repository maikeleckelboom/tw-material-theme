import {TonalPalette} from "@material/material-color-utilities";
import {ComputedRef} from "vue";

export const usePalettes = (): ComputedRef<Record<string, TonalPalette>> => {
    const {$theme} = useNuxtApp()
    // @ts-ignore
    return computed(() => $theme.value.palettes)
}
