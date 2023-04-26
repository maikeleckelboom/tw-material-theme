import {breakpointsTailwind} from "@vueuse/core";
import {animate} from "popmotion";
import {useScrimStore} from "~/stores/useScrimStore";

export const useSideSheetStore = defineStore('side-sheet-store', () => {
    const viewport = useViewport()
    const viewportMd = computed(() => viewport.isLessThan('xl'))

    const context = reactive({
        tracking: false,
        width: {
            value: 400,
            min: 0,
            max: 400,
        },
    })

    watch(viewportMd, (isMediumAndSmaller: boolean) => {
        if (!isMediumAndSmaller) {
            context.width.value = context.width.max
        } else {
            // context.width.value = context.width.min
        }
    })

    const isModal = computed(() => viewportMd.value)

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

    // Getters
    const percentage = computed(() => {
        const {min, max, value} = context.width
        return (value - min) / (max - min)
    })


    const isClosed = computed(() => percentage.value === 0)


    return {
        isModal,
        open,
        close,
        context,
        percentage,
        isClosed
    }
})
