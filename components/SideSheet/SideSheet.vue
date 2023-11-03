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
  'max-w-[min(92dvw,400px)]',
  'bg-surface',
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

const classList = computed(() => {
  const classVariants = createClassList({
    isModal: isModal.value,
  })
  return `${classVariants} ${context.tracking ? 'tracking' : 'idle'}`
})

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


const height = computed(() => {
  const {value, min, max} = context.transform.x
  const percentage = clamp(0, 0.4, (value - min) / (max - min))
  return `calc(100dvh - ${percentage * 40}px)`
})

const top = computed(() => {
  const {value, min, max} = context.transform.x
  const percentage = clamp(0, 0.4, (value - min) / (max - min))
  return `${percentage * 20}px`
})

const transform = computed(() => `translateX(${context.transform.x.value}px)`)

const transitionStyle = computed(() => isModal.value
    ? {height: height.value, top: top.value, transform: transform.value}
    : {transform: transform.value}
)

const {escape} = useMagicKeys()

whenever(escape, () => {
  if (!isModal.value) return
  isOpened.value
      ? close()
      : open()
})
</script>

<template>
  <aside
      id="side-sheet"
      :class="classList"
      :style="transitionStyle"
      data-component="side-sheet">
    <SideSheetHeader
        title="Theme Colors"
    />
    <Tabs :columns="[
        'schemes',
        'palettes',
        'extended'
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

  &.tracking * {
    @apply pointer-events-none duration-0;
  }
}
</style>
