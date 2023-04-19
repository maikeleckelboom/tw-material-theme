<script lang="ts" setup>
import {cva} from "class-variance-authority"
import {useSideSheetStore} from "~/stores/useSideSheetStore"
import {storeToRefs} from "pinia"
import IconButton from "~/components/Button/IconButton.vue"
import {ComputedRefWithControl} from "@vueuse/core"
import {animate} from "popmotion";

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
    badge: '196'
  },
  {
    label: 'About',
    icon: ['ic:outline-info', 'ic:baseline-info'],
    href: '/about',
    active: router.currentRoute.value.path === '/about'
  },
])

interface DragContext {
  element: ComputedRefWithControl<Element>
  tracking: boolean
  startCursorScreenX: number
  max: number
  min: number
  startWidth: number
  currentWidth: number
}

/**
 *   tracking: false,
 *   startCursorScreenX: null,
 *   max: 500,
 *   min: 350
 */
const ctx = reactive<DragContext>({
  element: useCurrentElement(),
  tracking: false,
  startCursorScreenX: 0,
  max: 360,
  min: 80,
  startWidth: 0,
  currentWidth: 80,
})


const createClasses = cva([
  'relative',
  'flex',
  'flex-col',
  'bg-surface-level-2',
  'py-[12px]',
]) as (_: Props) => string

const classList = computedEager(() => createClasses(props))

const clamp = (min: number, max: number, value: number) => Math.min(Math.max(min, value), max)

const onPressed = (ev: PointerEvent) => {
  const element = ctx.element as HTMLElement
  element.setPointerCapture(ev.pointerId)
  element.style.userSelect = 'none'
  element.style.cursor = 'ew-resize'
  element.style.transition = 'none'
  element.style.pointerEvents = 'none'

  ctx.startWidth = element.offsetWidth
  ctx.startCursorScreenX = ev.screenX
  ctx.tracking = true

  const onMove = (ev: PointerEvent) => {
    const deltaX = ev.screenX - ctx.startCursorScreenX
    const updated = ctx.startWidth + deltaX
    ctx.currentWidth = clamp(ctx.min, ctx.max, updated)
  }
  const onReleased = (ev: PointerEvent) => {
    cleanupMove()
    cleanupReleased()
    ctx.tracking = false
    element.style.userSelect = 'all'
    element.releasePointerCapture(ev.pointerId)
    const deltaMin = Math.abs(ctx.currentWidth - ctx.min)
    const deltaMax = Math.abs(ctx.currentWidth - ctx.max)
    const from = ctx.currentWidth
    const to = deltaMin < deltaMax ? ctx.min : ctx.max;
    animate({
      from,
      to,
      duration: 200,
      onUpdate: v => ctx.currentWidth = v
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
}

useEventListener(
    ctx.element,
    'pointerdown',
    onPressed,
    {passive: true}
)

const reactiveStyle = computedEager(() => ({
  width: `${ctx.currentWidth}px`
}))
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

