import {Ref} from "vue"
import {breakpointsTailwind, useBreakpoints} from "@vueuse/core";

export interface SideSheetStore {
    state: Ref<{
        isOpen: boolean,
        isModal: boolean,
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
    watch(breakpoints.smallerOrEqual('xl'), (isModal) => {
        state.value.isModal = isModal
    }, {immediate: true})
}


export const useSideSheetStore = defineStore('side-sheet', () => {

})
