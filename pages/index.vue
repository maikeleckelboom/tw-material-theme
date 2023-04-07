<script lang="ts" setup>

import {SIDE_SHEET_INJECTION_KEY} from "~/contexts/side-sheet";

const palettes = usePalettes()
const lightScheme = useLightScheme()
const darkScheme = useDarkScheme()
const scheme = useScheme()

const sections = reactive({
  light: true,
  dark: true,
  scheme: true,
  palettes: true,
  custom: true
})

const toggle = (section: keyof typeof sections): void => {
  sections[section] = !sections[section]
}


const state = useState(SIDE_SHEET_INJECTION_KEY.description, () => ({
  opened: false,
}))

const open = (): void => {
  state.value.opened = true
}

const close = (): void => {
  state.value.opened = false
}

provide(SIDE_SHEET_INJECTION_KEY, {
  state: state.value,
  open,
  close
})

// .....

</script>

<template>
  <div
      class="relative grid h-screen overflow-hidden expanded:grid-cols-aside-main-expanded grid-cols-aside-main-compact">
    <aside
        class="relative overflow-y-auto scrollbar-thin scrollbar-thumb-surface-level-3 hover:scrollbar-thumb-surface-level-5">

      <FormColorMode/>


      <FormColors/>


      <button
          class="absolute top-0 right-0 z-10 mt-4 mr-4 flex items-center justify-center rounded-full w-[40px] h-[40px] bg-surface hover:bg-surface-level-1"
          v-on:click="open">
        <Icon class="w-[24px] h-[24px] text-on-surface-variant" name="ic:outline-menu"/>
      </button>
    </aside>
    <main
        class="relative flex justify-center overflow-y-auto overflow-x-hidden flex-row-reverse scrollbar-thin scrollbar-thumb-surface-variant scrollbar-track-surface/50"
        data-theme="core">


      <!-- top-right actions -->
      <!--      <div-->
      <!--          class="sticky top-0 z-10 mt-4 flex h-fit w-fit flex-col justify-center gap-4 rounded-3xl p-2 right bg-surface">-->

      <!--        <ul class="list-inside ...">-->
      <!--          <li v-for="item in sectionList" :key="item.label">-->
      <!--            <button-->
      <!--                class="flex "-->
      <!--                v-on:click="toggle(item.label)">-->
      <!--              <span class="text-on-surface-variant">{{ item.label }}</span>-->
      <!--            </button>-->
      <!--          </li>-->
      <!--        </ul>-->

      <!--      </div>-->

      <SectionGroup>
        <Section :on-toggle="()=> toggle('palettes')"
                 :opened="sections.palettes"
                 data-section="color-palettes">
          <template #title>Tonal Palettes</template>
          <ColorPalettes :palettes="palettes"/>
        </Section>
        <Section :on-toggle="()=> toggle('light')"
                 :opened="sections.light"
                 data-section="light-scheme">
          <template #title>Light Scheme</template>
          <ColorScheme :scheme="lightScheme" suffix="-light"/>
        </Section>
        <Section :on-toggle="()=> toggle('dark')"
                 :opened="sections.dark"
                 data-section="dark-scheme">
          <template #title>Dark Scheme</template>
          <ColorScheme :scheme="darkScheme" suffix="-dark"/>
        </Section>
        <Section :on-toggle="()=> toggle('custom')"
                 :opened="sections.custom"
                 data-section="custom-colors">
          <template #title>Custom Colors</template>
          <CustomColors/>
        </Section>
      </SectionGroup>
    </main>
    <SideSheet/>
  </div>
</template>

