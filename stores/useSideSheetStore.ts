import {animate} from "popmotion"

const SIDE_SHEET_MAX_WIDTH: number = 400 as const

export const useSideSheetStore = defineStore('side-sheet-store', () => {
    const viewport = useViewport()
    const viewportMedium = computed(() => viewport.isLessThan('xl'))
    const isModal = computed(() => viewportMedium.value)

    const context: any = reactive({
        tracking: false,
        position: 'right',
        transform: {
            x: {
                value: 0,
                min: computed(() => context.position === 'left' ? SIDE_SHEET_MAX_WIDTH * -1 : 0),
                max: computed(() => context.position === 'left' ? 0 : SIDE_SHEET_MAX_WIDTH),
            },
        },
    })

    watch(viewportMedium, (isMediumAndSmaller: boolean) => {
        if (!isMediumAndSmaller) {
            context.transform.x.value = context.position === 'left'
                ? context.transform.x.max
                : context.transform.x.min
        }
    })

    const open = (duration: number = 220) => {
        animate({
            from: context.transform.x.value,
            to: context.position === 'left'
                ? context.transform.x.max
                : context.transform.x.min,
            duration,
            onUpdate: (v: number) => context.transform.x.value = v,
        })
    }

    const close = (duration: number = 220) => {
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

    const isClosed = computed(
        () => percentage.value === 0
    )

    const isOpened = computed(
        () => percentage.value > 0.5
    )


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
