<script lang="ts" setup>
import CommonButton from "~/components/CommonButton.vue";

const palettes = usePalettes()
const lightScheme = useLightScheme()
const darkScheme = useDarkScheme()

const sections = reactive({
  lightScheme: true,
  darkScheme: true,
  palettes: true,
  customColors: true
})

const toggle = (section: keyof typeof sections): void => {
  sections[section] = !sections[section]
}
</script>

<template>
  <div
      class="relative grid overflow-hidden expanded:grid-cols-aside-main-expanded grid-cols-aside-main-compact">
    <aside
        class="relative h-[calc(100dvh_-_64px)] overflow-y-auto scrollbar-thin  scrollbar-thumb-surface-level-3 hover:scrollbar-thumb-surface-level-5">
      <FormColors/>
    </aside>
    <main
        class="relative h-[calc(100dvh_-_64px)] flex-row-reverse justify-center overflow-y-auto scrollbar-thin scrollbar-thumb-surface-level-3 hover:scrollbar-thumb-surface-level-5 scrollbar-thumb-surface-variant scrollbar-track-surface/50"
    >


      <SectionGroup>
        <!-- Outlined -->
        <section class="grid gap-4">
          <legend>
            <h2 class="text-xl">Outlined - 📝</h2>
          </legend>
          <CommonButton intent="outlined" size="small">
            Small Outlined
          </CommonButton>
          <CommonButton intent="outlined" size="medium">
            Medium Outlined
          </CommonButton>
          <CommonButton intent="outlined" size="large">
            Large Outlined
          </CommonButton>
        </section>
        <!-- Filled Tonal -->
        <section class="grid gap-4">
          <legend>
            <h2 class="text-xl">Filled Tonal - 📝</h2>
          </legend>
          <CommonButton intent="filled-tonal" size="small">
            Small Filled Tonal
          </CommonButton>
          <CommonButton intent="filled-tonal" size="medium">
            Medium Filled Tonal
          </CommonButton>
          <CommonButton intent="filled-tonal" size="large">
            Large Filled Tonal
          </CommonButton>
        </section>
        <!-- Filled -->
        <section class="grid gap-4">
          <legend>
            <h2 class="text-xl">Filled - 📝</h2>
          </legend>
          <CommonButton intent="filled" size="small">
            Small Filled
          </CommonButton>
          <CommonButton intent="filled" size="medium">
            Medium Filled
          </CommonButton>
          <CommonButton intent="filled" size="large">
            Large Filled
          </CommonButton>
        </section>
        <!-- Icon Button -->
        <section class="grid gap-4">
          <legend>
            <h2 class="text-xl">Icon Button - 📝</h2>
          </legend>
          <CommonButton intent="icon" size="small">
            <Icon name="ic:outline-add"/>
          </CommonButton>
          <CommonButton intent="icon" size="medium">
            <Icon name="ic:outline-add"/>
          </CommonButton>
          <CommonButton intent="icon" size="large">
            <Icon name="ic:outline-add"/>
          </CommonButton>
        </section>
        <!-- FAB -->
        <section class="grid gap-4">
          <legend>
            <h2 class="text-xl">
              FAB - ✅
            </h2>
          </legend>
          <CommonButton intent="fab" size="small" title="Small FAB">
            <Icon class="h-8 h-9" name="ic:outline-mode-edit-outline"/>
          </CommonButton>
          <CommonButton intent="fab" size="medium" title="Medium FAB">
            <Icon class="h-8 h-9" name="ic:outline-mode-edit-outline"/>
          </CommonButton>
          <CommonButton intent="fab" size="large" title="Large FAB">
            <Icon name="ic:outline-mode-edit-outline"/>
          </CommonButton>
        </section>
        <!-- Extended FAB -->
        <section class="grid gap-4">
          <legend>
            <h2 class="text-xl">Extended FAB - 📝</h2>
          </legend>
          <CommonButton intent="extended-fab" size="small">
            <template #prefix-icon>
              <Icon name="ic:outline-add"/>
            </template>
            Small Extended FAB
          </CommonButton>
          <CommonButton intent="extended-fab" size="medium">
            <template #prefix-icon>
              <Icon name="ic:outline-add"/>
            </template>
            Medium Extended FAB
          </CommonButton>
          <CommonButton intent="extended-fab" size="large">
            <template #prefix-icon>
              <Icon name="ic:outline-add"/>
            </template>
            Large Extended FAB
          </CommonButton>
        </section>
        <!-- Text Button -->
        <section class="grid gap-4">
          <legend>
            <h2 class="text-xl">Text Button - ✅</h2>
          </legend>
          <CommonButton intent="text" size="small">
            Small Text Button
          </CommonButton>
          <CommonButton intent="text" size="medium">
            Medium Text Button
          </CommonButton>
          <CommonButton intent="text" size="large">
            Large Text Button
          </CommonButton>
        </section>

      </SectionGroup>
      <SectionGroup>
        <Section :on-toggle="() => toggle('lightScheme')"
                 :opened="sections.lightScheme"
                 data-section="light-scheme">
          <template #title>Light Scheme</template>
          <ColorScheme :scheme="lightScheme" suffix="-light"/>
        </Section>
        <Section :on-toggle="() => toggle('darkScheme')"
                 :opened="sections.darkScheme"
                 data-section="dark-scheme">
          <template #title>Dark Scheme</template>
          <ColorScheme :scheme="darkScheme" suffix="-dark"/>
        </Section>
        <Section :on-toggle="() => toggle('customColors')"
                 :opened="sections.customColors"
                 data-section="custom-colors">
          <template #title>Custom Colors</template>
          <CustomColors/>
        </Section>
        <Section :on-toggle="() => toggle('palettes')"
                 :opened="sections.palettes"
                 data-section="color-palettes">
          <template #title>Tonal Palettes</template>
          <ColorPalettes :palettes="palettes"/>
        </Section>
      </SectionGroup>
    </main>
    <SideSheet/>
  </div>
</template>


<!--<div class="fixed top-0 right-0 z-10 mt-4 mr-4 px-3 py-2"> 🤙-->
<!--<button-->
<!--    class="flex items-center justify-center rounded-full w-[40px] h-[40px] bg-surface hover:bg-surface-level-1"-->
<!--    v-on:click="open">-->
<!--  <Icon class="w-[24px] h-[24px] text-on-surface-variant" name="ic:outline-menu"/>-->
<!--</button>-->
<!--</div>-->
