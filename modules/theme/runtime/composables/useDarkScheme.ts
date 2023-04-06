import {Scheme} from "@material/material-color-utilities";
import {ComputedRef} from "vue";

export const useDarkScheme = (): ComputedRef<Scheme['props']> => {
    const {$theme} = useNuxtApp()
    return computed(() => $theme.value.schemes.dark.toJSON())
}
