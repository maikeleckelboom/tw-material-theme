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

const toggle = (section: keyof typeof sections) => {
  sections[section] = !sections[section]
}
</script>

<template>
  <div
      class="relative grid h-screen overflow-hidden expanded:grid-cols-aside-main-expanded grid-cols-aside-main-compact">
    <aside
        class="relative overflow-y-auto scrollbar-thin scrollbar-thumb-surface-level-3 hover:scrollbar-thumb-surface-level-5">
      <FormCollection/>
    </aside>
    <main
        class="relative flex justify-center overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-surface-variant scrollbar-track-surface/50"
        data-theme="core">
      <SectionsContainer class="p-4 gap-4">

        <!--
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
        -->

        <Section :on-toggle="()=> toggle('scheme')"
                 :opened="sections.scheme"
                 data-section="color-scheme">
          <template #title>Scheme</template>
          <ColorScheme :scheme="scheme"/>
        </Section>
        <Section :on-toggle="()=> toggle('palettes')"
                 :opened="sections.palettes"
                 data-section="color-palettes">
          <template #title>Palettes</template>
          <ColorPalettes :palettes="palettes"/>
        </Section>
        <Section :on-toggle="()=> toggle('custom')"
                 :opened="sections.custom"
                 data-section="custom-colors">
          <template #title>Custom Colors</template>
          <CustomColors/>
        </Section>
      </SectionsContainer>
    </main>
    <!-- Aside.SideSheet -->
    <SideSheet/>
  </div>
</template>

