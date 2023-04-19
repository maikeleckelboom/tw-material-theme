<script lang="ts" setup>
import {cva} from "class-variance-authority"
import {useSideSheetStore} from "~/stores/useSideSheetStore";
import {storeToRefs} from "pinia";

interface Props {
  type?: 'standard' | 'modal'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'standard'
})

type INavigationItem = {
  label: string
  icon: string | string[]
  href?: string
  active?: boolean
  badge?: string
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

const itemsComputedB = computed<INavigationItem[]>(() =>
    [
      {
        label: 'Components',
        icon: ['ic:outline-widgets', 'ic:baseline-widgets'],
        href: '/components',
        active: router.currentRoute.value.path === '/components'
      },
      {
        label: 'Library',
        icon: ['ic:outline-book', 'ic:baseline-book'],
        href: '/library',
        active: router.currentRoute.value.path === '/library',
        badge: '29'
      },
      {
        label: 'Settings',
        icon: ['ic:outline-settings', 'ic:baseline-settings'],
        href: '/settings',
        active: router.currentRoute.value.path === '/settings',
        badge: '999+'
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
  'bg-surface-level-1',
  'py-4',
], {
  variants: {
    type: {
      standard: [
        'bg-surface',
        'py-[12px]',
        'w-full',
        'max-w-[360px]',
        'w-full',
      ],
      modal: [
        'fixed',
        'z-10',
        'top-0',
        'bottom-0',
        'left-0',
        'bg-surface',
        'h-[100dvh]',
        'w-full',
        'max-w-[400px]',
        'border-l',
        'border-outline-variant',
        'rounded-tl-3xl',
        'rounded-bl-3xl',

        'max-w-[360px]',
      ]
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
        class="
          grid
          grid-cols-[1fr,_auto]
          items-center
          w-full
          h-[64px]
          px-6
          mb-2
        ">
      <span class="
          text-[14px]
          text-on-surface-variant
          font-[500]
    "
      >
        SHDWDrive
      </span>
      <button>
        <Icon :name="`ic:baseline-menu${ isOpened ? '-open' : ''}`"
              class="
                  w-[24px]
                  h-[24px]
                  text-on-surface-variant
                "
              v-on:click="open"/>
      </button>
    </header>

    <div data-component="DrawerPrimaryNavigation">
      <ul class="px-[12px]" data-component="Navigation">
        <li v-for="item in itemsComputedA"
            :key="item.label">
          <NavigationItem
              v-bind="item"
          />
        </li>
      </ul>
    </div>

    <Divider
        type="inset"
    />

    <div data-component="DrawerSecondaryNavigation">
      <nav>
        <span
            class="
              my-2
              flex px-4
              text-[14px]
              px-[28px]
              text-on-surface-variant
        ">
          Pages
        </span>
        <ul class="px-[12px]"
            data-component="Navigation">
          <li v-for="item in itemsComputedB"
              :key="item.label">
            <NavigationItem
                v-bind="item"
            />
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
