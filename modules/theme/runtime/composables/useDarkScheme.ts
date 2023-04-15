import {ComputedCoreScheme} from "~";

export const useDarkScheme = (): ComputedCoreScheme => {
    const {$theme} = useNuxtApp()
    return computed(() => $theme.value.schemes.dark.toJSON())
}
