<script lang="ts" setup>
import {useSideSheetStore} from "~/stores/useSideSheetStore";
import {storeToRefs} from "pinia";
import {cva} from "class-variance-authority";
import Tabs from "~/components/Button/Tabs.vue";
import ExtendedColorsTab from "~/components/SideSheet/ExtendedColorsTab.vue";
import SchemesColorTab from "~/components/SideSheet/SchemesColorTab.vue";
import PalettesColorTab from "~/components/SideSheet/PalettesColorTab.vue";
import SideSheetFooter from "~/components/SideSheet/SideSheetFooter.vue";
import SideSheetHeader from "~/components/SideSheet/SideSheetHeader.vue";
import {SIDE_SHEET_INJECTION_KEY} from "~/global/keys"

const store = useSideSheetStore()
const {isModal, isOpened, percentage} = storeToRefs(store)
const {context, open, close} = store

interface Props {
  isModal: boolean
}

const createClassList = cva([
  'right-0',
  'bottom-0',
  'top-0',
  'grid',
  'grid-rows-[auto,_auto,_1fr_,100px]',
  'justify-self-end',
  'max-w-[400px]',
  'bg-surface',
  'ps-[0px]',
  'h-[100dvh]',
  'w-full',
  'max-w-[92dvw]',
  'flex-shrink-0',
  'overflow-hidden',
], {
  variants: {
    isModal: {
      true: [
        'fixed',
        'z-50',
        'border-l',
        'border-outline-variant',
        'rounded-tl-3xl',
        'rounded-bl-3xl'
      ],
      false: [
        'relative',
      ],
    },
  },
}) as (variants: Props) => string

const classList = computedEager(() => createClassList({
  isModal: isModal.value
}))

const currentElement = useCurrentElement()

const viewport = useViewport()

const onPressed = ({target, screenX, pointerId}: PointerEvent) => {
  if (!viewport.isLessThan('xl')) {
    return
  }

  const element = currentElement.value as HTMLElement

  if (target !== element) {
    return
  }

  element.setPointerCapture(pointerId)

  context.tracking = true


  let raf: number | null = null

  const onMove = (moveEvent: PointerEvent) => {
    if (!raf) {
      raf = requestAnimationFrame(() => {
        raf = null
        onMove(moveEvent)
      })
      return
    }

    const deltaX = moveEvent.screenX - screenX

    context.transform.x.value = clamp(
        context.transform.x.min,
        context.transform.x.max,
        context.position === 'left'
            ? deltaX * -1
            : deltaX
    )
  }


  const scope = effectScope()

  const onReleased = (ev: PointerEvent) => {
    element.releasePointerCapture(ev.pointerId)
    context.tracking = false

    if (raf) {
      cancelAnimationFrame(raf)
      raf = null
    }

    scope.stop()

    const dMin = context.transform.x.value - context.transform.x.min
    const dMax = context.transform.x.max - context.transform.x.value

    context.transform.x.value = dMin > dMax
        ? close()
        : open()
  }

  scope.run(() => {
    useEventListener('pointermove', onMove, {passive: true,})
    useEventListener('pointerup', onReleased, {passive: true})
    useEventListener('pointercancel', onReleased, {passive: true})
  })
}

useEventListener(currentElement, 'pointerdown', onPressed, {passive: true})

provide(SIDE_SHEET_INJECTION_KEY, {
  isModal,
  isOpened,
  percentage,
  close,
  open
})

/**
 *  Based on progress of the animation, we can calculate the inset-block and suchg
 *     inset-block: 20px;
 *     height: calc(100dvh - 20px);
 *     top: 10px;
 */
const height = computed(() => {
  const {value, min, max} = context.transform.x
  const percentage = (value - min) / (max - min)
  return `calc(100dvh - ${percentage * 30}px)`
})

const top = computed(() => {
  const {value, min, max} = context.transform.x
  const percentage = (value - min) / (max - min)
  return `${percentage * 15}px`
})

// height, top only when isModal
const insetStyle = computed(() => isModal.value ? {
  height: height.value,
  top: top.value,
} : {})
</script>

<template>
  <aside
      id="side-sheet"
      :class="[classList,{tracking: context.tracking}]"
      :style="{ transform: `translateX(${context.transform.x.value}px)` , ...insetStyle}"
      data-component="side-sheet">
    <SideSheetHeader
        title="Colors"
    />
    <Tabs :columns="[
        ['schemes', 'ic:outline-filter-vintage', 'ic:baseline-filter-vintage'],
        ['palettes', 'ic:outline-donut-large', 'ic:baseline-donut-large'],
        ['extended', 'ic:outline-add-to-photos', 'ic:baseline-add-to-photos'],
     ]">
      <template #schemes>
        <SchemesColorTab/>
      </template>
      <template #palettes>
        <PalettesColorTab/>
      </template>
      <template #extended>
        <ExtendedColorsTab/>
      </template>
    </Tabs>
    <SideSheetFooter/>
  </aside>
</template>

<style lang="postcss">
#side-sheet {
  @apply touch-none select-none transition-none;

  &.tracking {
    /**/

    * {
      @apply pointer-events-none duration-0;
    }
  }
}
</style>
