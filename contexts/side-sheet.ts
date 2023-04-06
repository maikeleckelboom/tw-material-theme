import {InjectionKey} from "@vue/runtime-core";

const SIDE_SHEET_INJECTION_KEY = Symbol('aside.sheet.context') as InjectionKey<{
    state: {
        opened: boolean,
    },
    open: () => void,
    close: () => void,
}>

export {SIDE_SHEET_INJECTION_KEY}
