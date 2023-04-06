import {Ref} from "vue";

export const useSourceColor = () => {
    const {$sourceColor} = useNuxtApp()
    return $sourceColor
}
