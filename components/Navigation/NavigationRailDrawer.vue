<script lang="ts" setup>
import {useRailDrawerStore} from "~/stores/useRailDrawerStore"
import IconButton from "~/components/Button/IconButton.vue"
import {useNavigationStore} from "~/stores/useNavigationStore"

const store = useRailDrawerStore()
const {open, close, context} = store
const {percentage} = storeToRefs(store)

const {pRoutes, sRoutes} = useNavigationStore()

const target = useCurrentElement()

const onPressed = (pressEvent: PointerEvent) => {
  const element = unref(target) as HTMLElement
  if (pressEvent.target !== element) return
  const startOffsetWidth = element.offsetWidth
  const startScreenX = pressEvent.screenX
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
    element.setPointerCapture(moveEvent.pointerId)
    const deltaX = moveEvent.screenX - startScreenX
    context.width.value = clamp(context.width.min, context.width.max, startOffsetWidth + deltaX)
  }
  const onReleased = (ev: PointerEvent) => {
    console.log('released')
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
  const cleanupMove = useEventListener("pointermove", onMove, {
    passive: true,
  })
  const cleanupReleased = useEventListener("pointerup", onReleased, {
    passive: true,
  })
  const cleanupCancel = useEventListener("pointercancel", onReleased, {
    passive: true,
  })
}
useEventListener(target, "pointerdown", onPressed, {passive: true})

const width = computedEager(() => `${context.width.value}px`)


const classList = computed(() => {
  return [
    'relative',
    'h-screen',
    'py-4',
    '@container',
    'flex-none',
    'overflow-y-auto',
    'bg-surface',
    'z-20',
    'scrollbar',
    context.tracking ? 'tracking' : '',
  ]
})

const opacity = computed(() => {
  if (percentage.value < 0.25) return 0
  return (percentage.value - 0.75) * 4
})

const container = useCurrentElement()

const hasScrollbar = computed(() => {
  if (!container.value) return false
  return container.value.scrollHeight > container.value.clientHeight
})

console.log(hasScrollbar.value)
const right = computed(() => `${20 + percentage.value * 4}px`)

</script>

<template>
  <div id="navigation-rail-drawer" :class="classList" :style="{ width }">
    <div class="relative flex h-8 w-full flex-col">
      <div :style="{ right }" class="absolute">
        <IconButton :icon="`ic:baseline-menu${percentage > 0.5 ? '-open' : ''}`"
                    v-on:click="percentage === 1 ? close(320) : open(320)"/>
      </div>
    </div>
    <div class="pointer-events-none mt-2 mb-4 px-6">
      <p :style="{ opacity }" class="text-title-small text-on-surface-variant">
        Pages
      </p>
    </div>
    <section class="flex flex-col px-[12px]">
      <nav>
        <ul class="flex flex-col">
          <li v-for="item in pRoutes" :key="item.label" class="flex flex-col">
            <NavigationItem v-bind="item"/>
          </li>
        </ul>
      </nav>
    </section>
    <Divider type="inset"/>
    <section class="flex flex-col px-[12px]">
      <nav>
        <ul class="flex flex-col">
          <li v-for="item in sRoutes" :key="item.label" class="flex flex-col">
            <NavigationItem v-bind="item"/>
          </li>
        </ul>
      </nav>
    </section>
    <section class="mt-8 flex flex-col p-4">
      <FormColorMode/>
    </section>
  </div>
</template>

<style lang="postcss">
#navigation-rail-drawer {
  will-change: width;
  contain: layout;
  user-select: none;

  &.tracking {
    cursor: grabbing;
    pointer-events: none;
  }
}
</style>
