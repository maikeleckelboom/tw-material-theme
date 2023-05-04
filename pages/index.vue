<script lang="ts" setup>
const lightScheme = useLightScheme()
const darkScheme = useDarkScheme()

const sections = reactive({
  palettes: true,
  lightScheme: true,
  darkScheme: true,
  customColors: true,
})

const toggle = (section: keyof typeof sections): void => {
  sections[section] = !sections[section]
}

const store = useSideSheetStore()
const {open} = store, {isOpened} = storeToRefs(store)
</script>

<template>
  <div
      class="relative grid w-full overflow-hidden pb-12 space-x-3"
  >
    <main class="relative h-screen overflow-y-auto scrollbar">
      <Button :disabled="isOpened"
              class="m-4"
              v-on:click="open()">
        Open Side Sheet
      </Button>
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

    </main>
  </div>
</template>
