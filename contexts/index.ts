import {InjectionKey} from "@vue/runtime-core";

const SIDE_SHEET_INJECTION_KEY = Symbol('side-sheet.context') as InjectionKey<{
    state: {
        opened: boolean,
        modal?: boolean,
        size?: [number, number]
    },
    open: () => void,
    close: () => void,
    toggle: () => void,
}>


const DRAWER_INJECTION_KEY = Symbol('drawer.context') as InjectionKey<{
    state: {
        opened: boolean,
        modal?: boolean,
        size?: [number, number]
    },
    open: () => void,
    close: () => void,
    toggle: () => void,
}>

export {
    SIDE_SHEET_INJECTION_KEY,
    DRAWER_INJECTION_KEY
}
