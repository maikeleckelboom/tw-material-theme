export const useDarkScheme = () => {
    const {$theme} = useNuxtApp()
    return computed(() => $theme.value.schemes.dark)
}
