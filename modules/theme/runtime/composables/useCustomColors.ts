import {Ref} from "vue";

export const useCustomColors = (): unknown => {
    const {$customColors} = useNuxtApp()
    return $customColors
}
