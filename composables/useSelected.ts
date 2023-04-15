export const useSelected = () => {
    const selected = ref<boolean>(false)
    const toggleSelected = () => {
        selected.value = !selected.value
    }
    return {
        selected,
        toggleSelected,
    }
}
