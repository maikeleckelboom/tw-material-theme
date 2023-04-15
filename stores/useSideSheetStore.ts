import {Ref} from "vue"
import {breakpointsTailwind, useBreakpoints} from "@vueuse/core";

export interface SideSheetStore {
    state: Ref<{
        isOpen: boolean,
        isModal?: boolean,
        isDetached?: boolean,
        size?: [number, number]
    }>,
    open: () => void,
    close: () => void,
    isModal: Ref<boolean>

    [key: string]: any
}

type SideSheetState = {
    isOpen: boolean,
    isModal: boolean,
    isDetached?: boolean
    [key: string]: any
}

function sideSheetBreakpointHandler(state: Ref<SideSheetState>) {
    const breakpoints = useBreakpoints(breakpointsTailwind)

    if (breakpoints.smallerOrEqual('xl')) {
        state.value.isModal = true
    }

    watch(breakpoints.smallerOrEqual('xl'), (isModal) => {
        if (!state.value.isOpen && !isModal) {
            state.value.isOpen = true
        }
        state.value.isModal = isModal
    }, {deep: true, immediate: true})
}


export const useSideSheetStore = defineStore('side-sheet', (): SideSheetStore => {
    const breakpoints = useBreakpoints(breakpointsTailwind)

    const state = reactive(useState<SideSheetState>('side-sheet-state', () => ({
        isOpen: breakpoints.isGreater('xl'),
        isModal: breakpoints.smallerOrEqual('xl').value,
    })))

    const device = useDevice()


    sideSheetBreakpointHandler(state)


    const open = (): void => {
        state.value.isOpen = true
    }
    const close = (): void => {
        if (!state.value.isModal) return
        state.value.isOpen = false
    }

    return {
        state,
        isOpen: computed(() => state.value.isOpen),
        open,
        close,
        isModal: computed(() => state.value.isModal),
    }
})
