import {Ref} from "vue";
import {CorePaletteHexColors} from "~";

export const useCoreKeyColors = (): Ref<CorePaletteHexColors> => {
    const {$keyColors} = useNuxtApp()
    return $keyColors
}
