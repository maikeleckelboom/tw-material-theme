import {MaybeRef} from "@vueuse/core";

export const useSelectState = (el: MaybeRef<HTMLElement>) => {

    const state = reactive({
        selected: unref(el).classList.contains('selected')
    })

    const select = (): void => {
        state.selected = true
    }

    const deselect = (): void => {
        state.selected = false
    }

    const toggle = (): void => {
        state.selected = !state.selected
    }

    watchEffect(() => {
        console.log('watchEffect: ', state.selected)
        state.selected
            ? unref(el).classList.add('selected')
            : unref(el).classList.remove('selected')
    })

    return {
        state: toRefs(state),
        select,
        deselect,
        toggle
    }
}
