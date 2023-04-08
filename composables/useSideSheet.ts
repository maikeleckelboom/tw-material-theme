import {SIDE_SHEET_INJECTION_KEY} from "~/contexts";

export const useSideSheet = () => {

    const state = useState(SIDE_SHEET_INJECTION_KEY.description, () => ({
        opened: false,
    }))

    const open = (): void => {
        state.value.opened = true
    }

    const close = (): void => {
        state.value.opened = false
    }

    const toggle = (): void => {
        state.value.opened = !state.value.opened
    }

    provide(SIDE_SHEET_INJECTION_KEY, {
        state: state.value,
        open,
        close,
        toggle
    })

    return {
        state,
        open,
        close,
        toggle
    }
}
