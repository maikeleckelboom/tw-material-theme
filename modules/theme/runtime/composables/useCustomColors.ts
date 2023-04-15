import {Ref} from "vue";

export const useCustomColors = () => {
    const {$customColors} = useNuxtApp()
    return $customColors as Ref<{
        name: string
        value: string
        blend: boolean
    }[]>
}
