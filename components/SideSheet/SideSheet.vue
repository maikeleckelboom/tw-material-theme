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
const {isModal, percentage} = storeToRefs(store)
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
  'bg-surface',
  'ps-[0px]',
  'h-[100dvh]',
  'w-full',
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

const target = useCurrentElement()

const viewport = useViewport()

const onPressed = (pressEv: PointerEvent) => {
  if (viewport.isGreaterThan('xl')) {
    return
  }

  const element = target.value as HTMLElement

  if (pressEv.target !== element) {
    return
  }

  context.tracking = true


  const {offsetWidth} = element, {screenX} = pressEv

  let raf: number | null = null

  const onMove = (moveEvent: PointerEvent) => {
    if (!raf) {
      raf = requestAnimationFrame(() => {
        raf = null
        onMove(moveEvent)
      })
      return
    }

    element.setPointerCapture(moveEvent.pointerId)

    const deltaX = moveEvent.screenX - screenX

    context.width.value = clamp(
        context.width.min,
        context.width.max,
        offsetWidth - deltaX
    )
  }

  const onReleased = (ev: PointerEvent) => {
    cleanupMove()
    cleanupReleased()
    cleanupCancel()
    if (raf) {
      cancelAnimationFrame(raf)
      raf = null
    }
    element.releasePointerCapture(ev.pointerId)
    context.tracking = false
    const deltaMin = Math.abs(context.width.value - context.width.min)
    const deltaMax = Math.abs(context.width.value - context.width.max)
    deltaMin < deltaMax ? close() : open()
  }
  const cleanupMove = useEventListener("pointermove", onMove, {passive: true,})
  const cleanupReleased = useEventListener("pointerup", onReleased, {passive: true})
  const cleanupCancel = useEventListener("pointercancel", onReleased, {passive: true})
}
useEventListener(target, "pointerdown", onPressed, {passive: true})

provide(SIDE_SHEET_INJECTION_KEY, {
  isModal: isModal.value,
  isOpened: percentage.value > 0.5,
  close,
  open
})
</script>

<template>
  <aside
      id="side-sheet"
      :class="[classList,{tracking: context.tracking}]"
      :style="{width: `${context.width.value}px`,}"
      data-component="side-sheet">
    <SideSheetHeader>
      <p class="text-title-large">Colors</p>
    </SideSheetHeader>
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

<style lang="postcss" scoped>
#side-sheet {
  @apply touch-none select-none transition-none;

  &.tracking {
    /**/
  }
}
</style>
