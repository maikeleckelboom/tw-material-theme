import {Ref} from "vue";
import {SchemeJSON} from "~";

export const useDarkScheme = (): Ref<SchemeJSON> => {
    const {$theme} = useNuxtApp()
    return computed(() => $theme.value.schemes.dark.toJSON())
}
