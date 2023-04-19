import {Ref} from "vue";
import {CorePaletteHexColors} from "~";

export const useKeyColors = (): Ref<CorePaletteHexColors> => {
    const {$keyColors} = useNuxtApp()
    return $keyColors
}
