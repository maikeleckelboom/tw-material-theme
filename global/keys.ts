import {InjectionKey} from "vue"

export const SIDE_SHEET_INJECTION_KEY = Symbol('side-sheet-context') as InjectionKey<{
    isModal: boolean
    isOpened: boolean
    close: () => void
    open: () => void
}>
