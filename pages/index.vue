<script lang="ts" setup>
import {useSideSheetStore} from "~/stores/useSideSheetStore";
import {storeToRefs} from "pinia";

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

</script>

<template>
  <div
      class="relative grid w-full overflow-hidden space-x-3 pb-12"
  >
    <main class="relative h-screen overflow-y-auto rounded-xl scrollbar">

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
