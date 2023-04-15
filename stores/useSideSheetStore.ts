import {breakpointsTailwind} from "@vueuse/core";

export const useSideSheetStore = defineStore('side-sheet-store', () => {
    const viewport = useViewport()
    const breakpoints = useBreakpoints(breakpointsTailwind)

    const isPinned = ref<boolean>(true)
    const isOpened = ref<boolean>(isPinned.value || !(viewport.isLessThan('xl')))
    const isModal = ref<boolean>(viewport.isLessThan('xl'))

    watch(breakpoints.smallerOrEqual('xl'), (screenMedium) => {
        isOpened.value = !screenMedium || isPinned.value
        isModal.value = screenMedium
    }, {deep: true})


    const open = (): void => {
        isOpened.value = true
    }
    const close = (): void => {
        isOpened.value = false
    }

    return {
        isPinned,
        isOpened,
        isModal,
        open,
        close
    }
})
