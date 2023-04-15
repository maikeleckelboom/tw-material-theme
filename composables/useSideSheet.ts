import {breakpointsTailwind} from "@vueuse/core";

export const useSideSheet = () => {


    const isOpen = useState<boolean>('sheet-is-open', () => true)
    const breakpoints = useBreakpoints({
        compact: 600,
        medium: 840,
        expanded: 1280,
    })

    const isModal = breakpoints.smallerOrEqual('medium')
    return {
        isOpen,
    }
}
