import {animate} from "popmotion";

export const useSideSheetStore = defineStore('side-sheet-store', () => {
    const viewport = useViewport()
    const viewportMedium = computed(() => viewport.isLessThan('xl'))
    const isModal = computed(() => viewportMedium.value)

    const width = 400

    const context: any = reactive({
        tracking: false,
        position: 'right',
        transform: {
            x: {
                value: 0,
                min: computed(() => context.position === 'left' ? width * -1 : 0),
                max: computed(() => context.position === 'left' ? 0 : width),
            },
            scale: 1,
            opacity: 1,
        },
    })

    watch(viewportMedium, (isMediumAndSmaller: boolean) => {
        if (!isMediumAndSmaller) {
            context.transform.x.value = context.position === 'left'
                ? context.transform.x.max
                : context.transform.x.min
        }
    })

    const open = (duration: number = 200) => {
        animate({
            from: context.transform.x.value,
            to: context.position === 'left'
                ? context.transform.x.max
                : context.transform.x.min,
            duration,
            onUpdate: (v: number) => context.transform.x.value = v,
        })
    }

    const close = (duration: number = 200) => {
        animate({
            from: context.transform.x.value,
            to: context.position === 'left'
                ? context.transform.x.min
                : context.transform.x.max,
            duration,
            onUpdate: (v: number) => context.transform.x.value = v,
        })
    }

    const percentage = computed(() => {
        const {min, max, value} = context.transform.x
        return context.position === 'left'
            ? (value - min) / (max - min)
            : (value - max) / (min - max);
    })

    const isClosed = computed(() => percentage.value === 0)
    const isOpened = computed(() => percentage.value > 0.5)


    return {
        isModal,
        isOpened,
        open,
        close,
        context,
        percentage,
        isClosed
    }
})
