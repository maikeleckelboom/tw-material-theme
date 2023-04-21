<script lang="ts" setup>
import {cva} from "class-variance-authority"
import {useSideSheetStore} from "~/stores/useSideSheetStore"
import {storeToRefs} from "pinia"
import IconButton from "~/components/Button/IconButton.vue"
import {animate} from "popmotion";
import {useDragPercentageStore} from "~/stores/useDragPercentageStore";

interface Props {
  type?: 'standard'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'standard'
})

const store = useSideSheetStore(),
    {open} = store,
    {isOpened} = storeToRefs(store)


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
  startX: 0,
  startWidth: 0,
  width: 80,
  bounds: {
    min: 80,
    max: 360,
  }
})

const clamp = (min: number, max: number, value: number) => Math.min(Math.max(min, value), max)

const onPressed = (pressEvent: PointerEvent, threshold: number = 0) => {
  const element = unref(target) as HTMLElement
  if (pressEvent.target !== element) return
  element.style.userSelect = 'none'
  element.style.cursor = 'grab'
  ctx.startWidth = element.offsetWidth
  ctx.startX = pressEvent.screenX
  const onMove = (moveEvent: PointerEvent) => {
    const deltaX = moveEvent.screenX - ctx.startX
    const updated = ctx.startWidth + deltaX
    if (Math.abs(deltaX) > threshold) {
      element.setPointerCapture(moveEvent.pointerId)
      element.style.cursor = 'grabbing'
      element.style.touchAction = 'none'
      element.style.pointerEvents = 'none'
      ctx.tracking = true
      ctx.width = clamp(ctx.bounds.min, ctx.bounds.max, updated)
    }
  }
  const onReleased = (ev: PointerEvent) => {
    cleanupMove()
    cleanupReleased()
    cleanupCancel()
    ctx.tracking = false
    element.style.cursor = 'default'
    element.style.touchAction = 'auto'
    element.style.pointerEvents = 'all'
    element.releasePointerCapture(ev.pointerId)
    const deltaMin = Math.abs(ctx.width - ctx.bounds.min)
    const deltaMax = Math.abs(ctx.width - ctx.bounds.max)
    const from = ctx.width
    const to = deltaMin < deltaMax ? ctx.bounds.min : ctx.bounds.max;
    animate({
      from,
      to,
      duration: 200,
      onUpdate: v => ctx.width = v
    })
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

useEventListener(
    target,
    'pointerdown',
    onPressed,
    {passive: true}
)

const reactiveStyle = computedEager(() => ({
  width: `${ctx.width}px`
}))

const percentage = computedEager(() => {
  const {min, max} = ctx.bounds
  const value = ctx.width
  return (value - min) / (max - min)
})

const {setPercentage} = useDragPercentageStore()
watch(percentage, setPercentage)


const classList = computedEager(() => (cva([
  'relative',
  'flex',
  'flex-col',
  'bg-surface-level-2',
  'py-[12px]',
  'h-screen',
]) as (_: Props) => string)(props))

</script>

<template>
  <div :class="classList" :style="reactiveStyle">
    <header
        class="mb-2 flex w-full flex-col items-center h-[64px]">
      <!--      <span class="text-[14px] text-on-surface-variant font-[500]">-->
      <!--        Navigation-->
      <!--      </span>-->
      <IconButton
          :icon="`ic:baseline-menu${ isOpened ? '-open' : ''}`"
          v-on:click="open"/>
    </header>
    <div data-component="PrimaryNavigation">
      <ul class="px-[12px]" data-component="Navigation">
        <li v-for="item in itemsComputedA" :key="item.label">
          <NavigationItem type="rail" v-bind="item"/>
        </li>
      </ul>
    </div>
    <Divider type="inset"/>
    <div data-component="SecondaryNavigation">
      <nav>
        <!--        <span class="my-2 flex px-4 text-[14px] px-[28px] text-on-surface-variant">-->
        <!--          Pages-->
        <!--        </span>-->
        <ul class="px-[12px]">
          <li v-for="item in itemsComputedB" :key="item.label">
            <NavigationItem type="rail" v-bind="item"/>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

