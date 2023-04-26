import {Ref} from "vue";
import {CorePaletteHexColors} from "~";

export const useKeyColors = (): unknown => {
    const {$keyColors} = useNuxtApp()
    return $keyColors
}
