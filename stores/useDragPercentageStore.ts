export const useDragPercentageStore = defineStore('drag-percentage-store', () => {
    const percentage = ref<number>(0)
    const setPercentage = (value: number): void => {
        percentage.value = value
    }
    return {
        percentage,
        setPercentage
    }
})
