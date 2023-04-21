<script lang="ts" setup>
import {cva} from "class-variance-authority"
import {storeToRefs} from "pinia"
import {animate} from "popmotion";
import {useDragPercentageStore} from "~/stores/useDragPercentageStore";
import {useRailDrawerStore} from "~/stores/useRailDrawerStore";
import IconButton from "~/components/Button/IconButton.vue";

interface Props {
  type?: 'standard'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'standard'
})

const store = useRailDrawerStore(),
    {open, close} = store,
    {isRail, isDrawer} = storeToRefs(store)


type INavigationItem = {
  label: string
  icon: string | string[]
  href?: string
  active?: boolean
  badge?: string | number
}
const router = useRouter()
const itemsComputedA = computed<INavigationItem[]>(() => [
  {
    label: 'Home',
    icon: ['ic:outline-home', 'ic:baseline-home'],
    href: '/',
    active: router.currentRoute.value.path === '/',
    badge: '2'
  },
  {
    label: 'Profile',
    icon: ['ic:outline-person', 'ic:baseline-person'],
    href: '/profile',
    active: router.currentRoute.value.path === '/profile'
  },
])
const itemsComputedB = computed<INavigationItem[]>(() => [
  {
    label: 'Modules',
    icon: ['ic:outline-widgets', 'ic:baseline-widgets'],
    href: '/components',
    active: router.currentRoute.value.path === '/components',
  },
  {
    label: 'Library',
    icon: ['ic:outline-book', 'ic:baseline-book'],
    href: '/library',
    active: router.currentRoute.value.path === '/library',
  },
  {
    label: 'Settings',
    icon: ['ic:outline-settings', 'ic:baseline-settings'],
    href: '/settings',
    active: router.currentRoute.value.path === '/settings',
  },
  {
    label: 'About',
    icon: ['ic:outline-info', 'ic:baseline-info'],
    href: '/about',
    active: router.currentRoute.value.path === '/about'
  },
])


const target = useCurrentElement()

const ctx = reactive({
  tracking: false,
  width: {
    value: 88,
    min: 88,
    max: 360,
  }
})

const clamp = (min: number, max: number, value: number) => Math.min(Math.max(min, value), max)

const animatedOpen = (duration: number = 200) => animate({
  from: ctx.width.value,
  to: ctx.width.max,
  duration,
  onUpdate: v => ctx.width.value = v
})

const animatedClose = (duration: number = 200) => animate({
  from: ctx.width.value,
  to: ctx.width.min,
  duration,
  onUpdate: v => ctx.width.value = v
})

const onPressed = (pressEvent: PointerEvent, threshold: number = 0) => {
  const element = unref(target) as HTMLElement
  if (pressEvent.target !== element) return
  element.style.cursor = 'grab'
  element.style.pointerEvents = 'none'
  element.style.userSelect = 'none'
  const startWidth = element.offsetWidth
  const startX = pressEvent.screenX
  ctx.tracking = true
  const onMove = (moveEvent: PointerEvent) => {
    element.style.cursor = 'grabbing'
    const deltaX = moveEvent.screenX - startX
    if (Math.abs(deltaX) > threshold) {
      element.setPointerCapture(moveEvent.pointerId)
      const updated = startWidth + deltaX
      ctx.width.value = clamp(ctx.width.min, ctx.width.max, updated)
    }
  }
  const onReleased = (ev: PointerEvent) => {
    cleanupMove()
    cleanupReleased()
    cleanupCancel()
    element.releasePointerCapture(ev.pointerId)
    element.style.cursor = 'default'
    element.style.pointerEvents = 'all'
    ctx.tracking = false
    const deltaMin = Math.abs(ctx.width.value - ctx.width.min)
    const deltaMax = Math.abs(ctx.width.value - ctx.width.max)
    deltaMin < deltaMax ? animatedClose() : animatedOpen()
  }
  const cleanupMove = useEventListener(
      'pointermove',
      onMove,
      {passive: true}
  )
  const cleanupReleased = useEventListener(
      'pointerup',
      onReleased,
      {passive: true}
  )
  const cleanupCancel = useEventListener(
      'pointercancel',
      onReleased,
      {passive: true}
  )
}

watch(() => ctx.tracking, (isTracking: boolean) => {
  console.log('tracking', isTracking)
  console.log('percentage', percentage.value)
  // console.log(rail ? 'is rail' : 'is drawer')
  // animate({
  //   from: ctx.width.value,
  //   to: rail
  //       ? ctx.width.min
  //       : ctx.width.max,
  //   duration: 200,
  //   onUpdate: v => ctx.width.value = v
  // })
})

useEventListener(
    target,
    'pointerdown',
    onPressed,
    {passive: true}
)

const reactiveStyle = computedEager(() => ({
  width: `${ctx.width.value}px`
}))

const percentage = computedEager(() => {
  const {min, max, value} = ctx.width
  return (value - min) / (max - min)
})

const {setPercentage} = useDragPercentageStore()
watch(percentage, setPercentage)

const percent = computedEager(() => Math.round(percentage.value * 1000) / 10)


const opacity = computed(() => {
  if (percentage.value < 0.25) return 0
  return (percentage.value - 0.75) * 4
})

const scale = computed(() => {
  if (percentage.value < 0.25) return 0
  return (percentage.value - 0.25) * 4
})

const classList = computedEager(() => (cva([
  'relative',
  'bg-surface-level-2',
  'h-screen',
  'py-4',
]) as (_: Props) => string)(props))


const spacerH = computed(() => 12 + (percentage.value * 12))
const spacerQuarterH = computed(() => spacerH.value / 4)
const gap = computed(() => ((1 - percentage.value) * 12) * 0.5)
const gapYStyle = computed(() => ({
  transform: `scaleY(${
      gap.value / 12
  })`,
  height: `${gap.value * 2.5}px`,


}))


// transform: `translateY(${percentage * 10}%)`  <--- But start at 0
const shiftUpStyle = computed(() => ({
  transform: `translateY(${percentage.value * 10}%)`,
  top: `-${percentage.value * 0.1}px`,
}))

const style = computed(() => {
  // 16px + 20px = 36px
  const top = 36 - (percentage.value * 36)
  return {
    top: `${top}px`,
  }
})

// right is 24 must be 18
const right = computed(() => 18 + (percentage.value * 2))
</script>

<template>
  <div id="navigation-rail-drawer"
       :class="classList"
       :style="reactiveStyle"
       class="@container">

    <div :style="{
      right: right + 'px',
    }" class="absolute  ">
      <IconButton
          :icon="`ic:baseline-menu${ isDrawer ? '-open' : ''}`"
          v-on:click="percentage === 1 ? animatedClose() : animatedOpen()"/>
    </div>
    <div class="h-4 pointer-events-none">

    </div>
    <div class="mb-4 px-[24px] pointer-events-none">
      <p :style="{opacity}" class="text-title-small text-on-surface-variant">
        Pages
      </p>
    </div>
    <section class="flex flex-col px-[12px] mt-8">

      <nav>

        <ul>
          <li v-for="(item, i) in itemsComputedA" :key="item.label" class="flex flex-col">
            <NavigationItem v-bind="item"/>
            <div v-if="i  < itemsComputedA.length - 1" :style="gapYStyle"/>
          </li>
        </ul>
      </nav>
    </section>


    <Divider
        type="inset"
    />
    <section class="flex flex-col px-[12px]">
      <nav>
        <ul>
          <li v-for="(item, i) in itemsComputedB" :key="item.label" class="flex flex-col">
            <NavigationItem v-bind="item"/>
            <div v-if="i  < itemsComputedB.length - 1" :style="gapYStyle"/>
          </li>
        </ul>
      </nav>
    </section>

  </div>
</template>

<style lang="postcss">
#navigation-rail-drawer {
  will-change: width;
  contain: layout;
  touch-action: none;
}
</style>
