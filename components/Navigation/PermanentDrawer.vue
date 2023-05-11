<script lang="ts" setup>
  import { useRailDrawerStore } from '~/stores/useRailDrawerStore'
  import IconButton from '~/components/Button/IconButton.vue'
  import { useNavigationStore } from '~/stores/useNavigationStore'
  import { tv } from 'tailwind-variants'
  import { ComputedRef } from 'vue'

  const store = useRailDrawerStore()
  const { open, close, context } = store
  const { percentage } = storeToRefs(store)

  const { pRoutes, sRoutes } = useNavigationStore()

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
        'bg-surface-level-1'
      ],
      headline: [],
      sectionLabel: ['mt-3', 'mb-4.5,'],
      list: ['flex', 'flex-col', '@[150px]:gap-0', 'gap-y-2', 'py-2']
    },
    compoundSlots: [
      {
        slots: ['headline', 'sectionLabel'],
        class: [
          'px-6',
          'text-title-small',
          'h-0',
          'h-[32px]',
          'mt-0',
          'mb-1',
          '@[150px]:relative'
        ]
      }
    ]
  })

  const { base, list, headline, sectionLabel } = railDrawer()

  const toggleDrawerIcon: ComputedRef<string> = computed(
    () => `ic:baseline-menu${percentage.value > 0.5 ? '-open' : ''}`
  )
</script>

<template>
  <div id="navigation-rail-drawer" :class="base()">
    <p :class="headline()">Personal</p>
    <section class="flex flex-col px-[12px]">
      <nav>
        <ul :class="list()">
          <li v-for="item in pRoutes" :key="item.label">
            <NavigationItem v-bind="item" />
          </li>
        </ul>
      </nav>
    </section>
    <Divider type="inset" />
    <p :class="sectionLabel()">Pages</p>
    <section class="flex flex-col px-[12px]">
      <nav>
        <ul :class="list()">
          <li v-for="item in sRoutes" :key="item.label">
            <NavigationItem v-bind="item" />
          </li>
        </ul>
      </nav>
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
