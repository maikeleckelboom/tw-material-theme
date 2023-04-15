import type {ComputedRef} from "vue";
import type {ThemeSchemeColors} from "~";


export const useScheme = (): ComputedRef<ThemeSchemeColors> => {
    const theme = useTheme()
    const colorMode = ref<'dark' | 'light'>('dark')
    return computed(() => {
        return colorMode.value === 'dark'
            ? theme.value.schemes.dark.toJSON()
            : theme.value.schemes.light.toJSON()
    })
}
