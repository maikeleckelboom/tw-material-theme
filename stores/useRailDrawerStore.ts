import {animate} from "popmotion";

export const useRailDrawerStore = defineStore('rail-drawer-store', () => {
    const viewport = useViewport()
    const isScreenMedium = computed(() => viewport.isLessThan('xl'))
    const isRail = ref<boolean>(isScreenMedium.value)
    const isDrawer = computed<boolean>({
        get: () => !isRail.value,
        set: (v: boolean) => isRail.value = !v
    })
    watch(isScreenMedium, (isMediumSmaller: boolean) => {
        isRail.value = isMediumSmaller
    }, {deep: true})

    watch(isRail, (isRail: boolean) => {
        isRail ? close(320) : open(280)
    })

    const context = reactive({
        tracking: false,
        width: {
            value: isRail.value ? 88 : 360,
            min: 88,
            max: 360,
        },
    })

    const open = (duration: number = 200) => animate({
        from: context.width.value,
        to: context.width.max,
        duration,
        onUpdate: (v) => (context.width.value = v),
    })

    const close = (duration: number = 200) => animate({
        from: context.width.value,
        to: context.width.min,
        duration,
        onUpdate: (v) => (context.width.value = v),
    })

    const percentage = computed(() => {
        const {min, max, value} = context.width
        return (value - min) / (max - min)
    })

    return {
        isRail,
        isDrawer,
        percentage,
        context,
        open,
        close,
    }
})
