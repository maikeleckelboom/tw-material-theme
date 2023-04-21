import {breakpointsTailwind} from "@vueuse/core";

export const useSideSheetStore = defineStore('side-sheet-store', () => {
    /**
     * Composables
     */
    const viewport = useViewport()
    const breakpoints = useBreakpoints(breakpointsTailwind)

    /**
     * State
     */
    const isPinned = ref<boolean>(false)
    const isOpened = ref<boolean>(isPinned.value || !(viewport.isLessThan('xl')))
    const isModal = ref<boolean>(viewport.isLessThan('xl'))

    /**
     * Watchers
     */
    watch(breakpoints.smallerOrEqual('xl'), (screenMedium) => {
        isOpened.value = isPinned.value || !screenMedium
        isModal.value = screenMedium
    }, {deep: true})

    /**
     * Methods
     */
    const open = (): void => {
        isOpened.value = true
    }
    const close = (): void => {
        isOpened.value = false
    }

    /**
     * Computed Properties
     */
    const isModalAndOpened = computed(() => isModal.value && isOpened.value)

    return {
        isPinned,
        isOpened,
        isModal,
        open,
        close,
        isModalAndOpened
    }
})
