import {breakpointsTailwind} from "@vueuse/core";

export const useRailDrawerStore = defineStore('rail-drawer-store', () => {
    const viewport = useViewport()
    const breakpoints = useBreakpoints(breakpointsTailwind)

    const isRail = ref<boolean>(viewport.isLessThan('xl'))
    const isDrawer = computed<boolean>({
        get: () => !isRail.value,
        set: (v: boolean) => isRail.value = !v
    })

    watch(breakpoints.smallerOrEqual('xl'), (isSmallerXL: boolean) => {
        isRail.value = isSmallerXL
    }, {deep: true})

    const open = () => isDrawer.value = !isDrawer.value
    const close = () => isRail.value = !isRail.value

    return {
        isRail,
        isDrawer,
        open,
        close,
    }
})
