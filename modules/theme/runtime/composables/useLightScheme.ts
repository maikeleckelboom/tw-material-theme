import {Scheme} from "@material/material-color-utilities";
import {ComputedRef} from "vue";

export const useLightScheme = (): ComputedRef<Scheme['props']> => {
    const {$theme} = useNuxtApp()
    return computed(() => $theme.value.schemes.light.toJSON())
}
