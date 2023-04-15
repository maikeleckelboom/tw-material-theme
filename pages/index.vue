<script lang="ts" setup>

import {breakpointsTailwind} from "@vueuse/core";
import {cva} from "class-variance-authority";
import {twMerge} from "tailwind-merge";

const lightScheme = useLightScheme();
const darkScheme = useDarkScheme();

const sections = reactive({
  lightScheme: false,
  darkScheme: false,
  palettes: true,
  customColors: false,
});

const toggle = (section: keyof typeof sections): void => {
  sections[section] = !sections[section]
}


//** Breakpoints **//
// ................

function getState(): { isModal: boolean, isOpen: boolean } {
  const viewport = useViewport()
  const guard: boolean = viewport.match('xl') || viewport.isLessThan('xl')
  return {isModal: guard, isOpen: !guard}
}

const state = ref(getState())

const breakpoints = useBreakpoints(breakpointsTailwind)

watch(breakpoints.smallerOrEqual('xl'), (isMediumDown) => {
  state.value.isOpen = !isMediumDown
  state.value.isModal = isMediumDown
}, {deep: true})

const createClassList = cva([
  'right-0',
  'bottom-0',
  'top-0',
  'grid',
  'grid-rows-[auto,_auto_1fr_,100px]',
  'bg-surface',
  'ps-[24px]',
  'pe-[24px]',
  'h-[100dvh]',
  'w-full',
  'max-w-[400px]',
  'z-20'
], {
  variants: {
    isModal: {
      true: [
        'fixed z-10',
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
}) as (props: any) => string

const classList = computed(() => (twMerge(createClassList(state.value))))

const open = (): void => {
  state.value.isOpen = true
}

const close = (): void => {
  state.value.isOpen = false
}

watch(state, ({isOpen, isModal}) => {
  // console.log('isOpen', isOpen)
  // console.log('isModal', isModal)
}, {deep: true})
</script>

<template>
  <div
      :class="{
        'grid-cols-[360px,1fr]': !state.isModal,
        'grid-cols-[360px,1fr,auto]': state.isModal,
      }"
      class="relative grid w-full overflow-hidden space-x-3"
  >
    <aside
        class="relative h-screen overflow-y-auto rounded-t-xl scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-surface-level-3 hover:scrollbar-thumb-surface-level-4 active:scrollbar-thumb-surface-level-5"
    >
      <button class="absolute top-0 right-0 rounded-full p-3 bg-surface-level-2" v-on:click="open">
        <Icon class="h-6 w-6" name="ic:outline-apps"/>
      </button>
      <FormColors/>
    </aside>
    <main class="relative overflow-hidden">
      <div
          class="relative h-screen w-full justify-center overflow-y-auto rounded-xl scrollbar-thin scrollbar-thumb-surface-level-3 scrollbar-thumb-rounded-md hover:scrollbar-thumb-surface-level-4 active:scrollbar-thumb-surface-level-5"
      >


        <SectionGroup>
          <Section
              :on-toggle="() => toggle('palettes')"
              :opened="sections.palettes"
              data-section="color-palettes"
          >
            <template #title>Palettes</template>
            <ColorPalettes/>
          </Section>
          <Section
              :on-toggle="() => toggle('lightScheme')"
              :opened="sections.lightScheme"
              data-section="light-scheme"
          >
            <template #title>Scheme (Light Theme)</template>
            <ColorScheme :scheme="lightScheme" suffix="-light"/>
          </Section>
          <Section
              :on-toggle="() => toggle('darkScheme')"
              :opened="sections.darkScheme"
              data-section="dark-scheme"
          >
            <template #title>Scheme (Dark Theme)</template>
            <ColorScheme :scheme="darkScheme" suffix="-dark"/>
          </Section>
          <Section
              :on-toggle="() => toggle('customColors')"
              :opened="sections.customColors"
              data-section="custom-colors"
          >
            <template #title>Extended Colors</template>
            <CustomColors/>
          </Section>
        </SectionGroup>
      </div>
    </main>
  </div>
  <SideSheet
      v-if="state.isOpen"
      :class="classList"
      :modal="state.isModal"
      :open="state.isOpen"
      v-on:close="close"
  />
</template>
