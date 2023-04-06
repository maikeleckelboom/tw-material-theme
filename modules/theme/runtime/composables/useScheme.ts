import {Scheme} from "@material/material-color-utilities";
import {ComputedRef} from "vue";

export const useScheme = () => {
    const {$theme} = useNuxtApp()
    const colorMode = ref<'dark' | 'light'>('dark')
    return computed(() => {
        return colorMode.value === 'dark'
            ? $theme.value.schemes.dark.toJSON()
            : $theme.value.schemes.light.toJSON()
    }) as ComputedRef<Scheme['props']>
}
