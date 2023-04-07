import type {ComputedRef} from "vue";
import type {SchemeProperties} from "~";


export const useScheme = (): ComputedRef<SchemeProperties> => {
    const theme = useTheme()
    const colorMode = ref<'dark' | 'light'>('dark')
    return computed(() => {
        return colorMode.value === 'dark'
            ? theme.value.schemes.dark.toJSON()
            : theme.value.schemes.light.toJSON()
    })
}
