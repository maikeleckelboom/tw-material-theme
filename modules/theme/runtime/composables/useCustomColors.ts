import {CustomHexColor} from "~";
import {Ref} from "vue";

export const useCustomColors = (): Ref<CustomHexColor[]> => {
    const {$customColors} = useNuxtApp()
    return $customColors
}
