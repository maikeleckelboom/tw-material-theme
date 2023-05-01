<script lang="ts" setup>
import {useRailDrawerStore} from "~/stores/useRailDrawerStore"
import IconButton from "~/components/Button/IconButton.vue"
import {useNavigationStore} from "~/stores/useNavigationStore"
import {tv} from "tailwind-variants";
import {ComputedRef} from "vue";

const store = useRailDrawerStore()
const {open, close, context} = store
const {percentage} = storeToRefs(store)

const {pRoutes, sRoutes} = useNavigationStore()

const target = useCurrentElement()

const onPressed = (pressEv: PointerEvent) => {
  const element = unref(target) as HTMLElement
  if (pressEv.target !== element) return
  const startOffsetWidth = element.offsetWidth
  const startScreenX = pressEv.screenX
  context.tracking = true
  let raf: number | null = null
  const onMove = (ev: PointerEvent) => {
    if (!raf) {
      raf = requestAnimationFrame(() => {
        raf = null
        onMove(ev)
      })
      return
    }
    element.setPointerCapture(ev.pointerId)
    const deltaX = ev.screenX - startScreenX
    context.width.value = clamp(context.width.min, context.width.max, startOffsetWidth + deltaX)
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


const opacity = computed(() => {
  if (percentage.value < 0.25) return 0
  return (percentage.value - 0.75) * 4
})


// 14 with scrollbar
const right = computed(() => `${20 + percentage.value * 4}px`)


const railDrawer = tv({
  slots: {
    base: [
      'text-on-surface-variant',
      'h-screen',
      'py-4',
      '@container',
      'flex-none',
      'overflow-y-auto',
      'bg-surface',
      'z-20',
      'scrollbar',
      'align-start',
    ],
    headline: [],
    sectionLabel: [
      'mt-3',
      'mb-4.5,',
    ],
    list: [
      'flex',
      'flex-col',
      '@[150px]:gap-0',
    ]
  },
  compoundSlots: [
    {
      slots: [
        'headline',
        'sectionLabel'
      ],
      class: [
        'px-6',
        'text-title-small',
        'h-0',
        'h-[32px]',
        'mt-0',
        'mb-1',
        '@[150px]:relative',
      ]
    }
  ]
})

const {base, list, headline, sectionLabel} = railDrawer()

const toggleDrawerIcon: ComputedRef<string> = computed(
    () => `ic:baseline-menu${percentage.value > 0.5 ? '-open' : ''}`
)
const toggleDrawer = () => (percentage.value === 1) ? close(300) : open(340)
</script>

<template>
  <div id="navigation-rail-drawer" :class="base()" :style="{ width }">
    <div class="relative flex h-14 w-full flex-col">
      <div :style="{ right }" class="absolute">
        <IconButton
            :icon="toggleDrawerIcon"
            v-on:click="toggleDrawer"
        />
      </div>
    </div>
    <p :class="headline()" :style="{ opacity }">
      Personal
    </p>
    <section class="flex flex-col px-[12px]">
      <nav>
        <ul :class="list()">
          <li v-for="item in pRoutes" :key="item.label">
            <NavigationItem v-bind="item"/>
          </li>
        </ul>
      </nav>
    </section>
    <Divider type="inset"/>
    <!--    <p :class="sectionLabel()" :style="{ opacity }">-->
    <!--      Pages-->
    <!--    </p>-->
    <section class="flex flex-col px-[12px]">
      <nav>
        <ul :class="list()">
          <li v-for="item in sRoutes" :key="item.label">
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
  @apply touch-none select-none transition-none;

  &.tracking * {
    @apply pointer-events-none duration-0;
  }

}
</style>
