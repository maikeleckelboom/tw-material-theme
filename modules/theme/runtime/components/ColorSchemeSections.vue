<script lang="ts" setup>
import { useDarkScheme, useLightScheme } from "#imports";

const lightScheme = useLightScheme();
const darkScheme = useDarkScheme();

const sections = reactive({
  lightScheme: false,
  darkScheme: false,
  palettes: false,
  customColors: false
});

const toggle = (section: keyof typeof sections): void => {
  sections[section] = !sections[section];
};
</script>

<template>
  <div class="relative h-screen overflow-y-auto scrollbar">
    <SectionGroup>
      <Section
        :on-toggle="() => toggle('lightScheme')"
        :opened="sections.lightScheme"
        data-section="light-scheme"
      >
        <template #title>Light Scheme</template>
        <ColorScheme :scheme="lightScheme" suffix="-light" />
      </Section>
      <Section
        :on-toggle="() => toggle('darkScheme')"
        :opened="sections.darkScheme"
        data-section="dark-scheme"
      >
        <template #title>Dark Scheme</template>
        <ColorScheme :scheme="darkScheme" suffix="-dark" />
      </Section>
      <Section
        :on-toggle="() => toggle('palettes')"
        :opened="sections.palettes"
        data-section="color-palettes"
      >
        <template #title>Palettes</template>
        <ColorPalettes />
      </Section>
      <Section
        :on-toggle="() => toggle('customColors')"
        :opened="sections.customColors"
        data-section="custom-colors"
      >
        <template #title>Extended Colors</template>
        <CustomColors />
      </Section>
    </SectionGroup>
  </div>
</template>
