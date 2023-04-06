<script lang="ts" setup>

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

const sideSheet = reactive({
  state: {
    opened: false,
  }
})
</script>

<template>
  <div
      class="relative grid h-screen overflow-hidden expanded:grid-cols-aside-main-expanded grid-cols-aside-main-compact">
    <aside
        class="relative overflow-y-auto scrollbar-thin scrollbar-thumb-surface-level-3 hover:scrollbar-thumb-surface-level-5">
      <div class="flex flex-col p-6">
        <h1 class="text-2xl font-bold text-on-surface-variant">
          Theme Builder
        </h1>
      </div>
      <FormColors/>
    </aside>
    <main
        class="relative flex justify-center overflow-y-auto overflow-x-hidden flex-row-reverse	 scrollbar-thin scrollbar-thumb-surface-variant scrollbar-track-surface/50"
        data-theme="core">

      <!-- top-right actions -->
      <div
          class="sticky top-0 z-10 mt-4 flex h-fit w-fit flex-col justify-center gap-4 rounded-3xl p-2 right bg-surface">
        <button
            class="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium leading-5 text-on-surface-variant bg-surface-level-1 hover:bg-surface-level-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
            @click="sideSheet.state.opened = true">
          <Icon name="ic:outline-file-download"/>
          Export
        </button>
        <button
            class="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium leading-5 text-on-surface-variant bg-surface-level-1 hover:bg-surface-level-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
            @click="sideSheet.state.opened = false">
          <Icon name="ic:outline-file-upload"/>
          Import
        </button>
      </div>


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
    <!-- Aside.SideSheet -->
    <SideSheet v-if="sideSheet.state.opened"/>
  </div>
</template>

