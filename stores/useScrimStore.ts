export const useScrimStore = defineStore('scrim-store', () => {
    const {percentage} = useSideSheetStore()

    const opacity = computed(() => percentage / 2)

    return {
        opacity,
    }
})
