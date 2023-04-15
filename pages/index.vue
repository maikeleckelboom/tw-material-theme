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


//** Viewport/Breakpoints **//
// ................
const viewport = useViewport()

const isPinned = ref<boolean>(true)
const isOpened = ref<boolean>(isPinned.value || !(viewport.isLessThan('xl')))
const isModal = ref<boolean>(viewport.isLessThan('xl'))


const breakpoints = useBreakpoints(breakpointsTailwind)

watch(breakpoints.smallerOrEqual('xl'), (xlDown) => {
  isOpened.value = !xlDown || isPinned.value
  isModal.value = xlDown
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
}) as (props: { isModal: boolean }) => string

const classList = computedEager(() => twMerge(createClassList({isModal: isModal.value})))

const open = () => isOpened.value = true
const close = () => isOpened.value = false
</script>

<template>
  <div
      :class="{
        'grid-cols-[360px,1fr]': !isModal,
        'grid-cols-[360px,1fr,auto]': isModal,
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
      v-if="isOpened"
      :class="classList"
      :modal="isModal"
      :open="isOpened"
      :pinned="isPinned"
      v-on:close="close"
  />
</template>
