<script lang="ts" setup>
import {cva} from "class-variance-authority"
import {useSideSheetStore} from "~/stores/useSideSheetStore"
import {storeToRefs} from "pinia"
import IconButton from "~/components/Button/IconButton.vue";

interface Props {
  type?: 'standard'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'standard'
})

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

const createClassList = cva([
  'relative',
  'flex',
  'flex-col',
  'bg-surface-level-2',
  'py-[12px]',
  'w-[80px]',

], {
  variants: {
    type: {
      standard: [],
    }
  }
}) as (p: Props) => string

const classList = computedEager(() => createClassList(props))

const store = useSideSheetStore()
const {open} = store
const {isOpened} = storeToRefs(store)

</script>

<template>
  <div :class="classList"
       data-component="NavigationDrawer">
    <header
        class="flex flex-col items-center w-full h-[64px] mb-2">
      <!--      <span class="text-[14px] text-on-surface-variant font-[500]">-->
      <!--        Navigation-->
      <!--      </span>-->
      <IconButton
          :icon="`ic:baseline-menu${ isOpened ? '-open' : ''}`"
          v-on:click="open"/>
    </header>
    <div data-component="DrawerPrimaryNavigation">
      <ul class="px-[12px]" data-component="Navigation">
        <li v-for="item in itemsComputedA" :key="item.label">
          <NavigationItem type="rail" v-bind="item"/>
        </li>
      </ul>
    </div>
    <Divider type="inset"/>
    <div data-component="DrawerSecondaryNavigation">
      <nav>
        <!--        <span class="my-2 flex px-4 text-[14px] px-[28px] text-on-surface-variant">-->
        <!--          Pages-->
        <!--        </span>-->
        <ul class="px-[12px]" data-component="Navigation">
          <li v-for="item in itemsComputedB" :key="item.label">
            <NavigationItem type="rail" v-bind="item"/>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
