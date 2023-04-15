// import {breakpointsTailwind} from "@vueuse/core"
//
//
// export const useSideSheetState = (options?: { pinned?: boolean }) => {
//     const viewport = useViewport()
//     const breakpoints = useBreakpoints(breakpointsTailwind)
//
//     const isPinned = ref<boolean>(options?.pinned ?? true)
//     const isOpened = ref<boolean>(isPinned.value || !(viewport.isLessThan('xl')))
//     const isModal = ref<boolean>(viewport.isLessThan('xl'))
//
//     watch(breakpoints.smallerOrEqual('xl'), (screenMedium) => {
//         isOpened.value = !screenMedium || isPinned.value
//         isModal.value = screenMedium
//     }, {deep: true})
//
//
//     const open = (): void => {
//         isOpened.value = true
//     }
//     const close = (): void => {
//         isOpened.value = false
//     }
//
//     return {
//         isPinned,
//         isOpened,
//         isModal,
//         open,
//         close
//     }
// }
