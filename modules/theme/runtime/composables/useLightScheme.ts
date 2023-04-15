import {ComputedCoreScheme} from "~";

export const useLightScheme = (): ComputedCoreScheme => {
    const {$theme} = useNuxtApp()
    return computed(() => $theme.value.schemes.light.toJSON())
}
