<script lang="ts" setup>
import CommonButton from "~/components/CommonButton.vue";

const palettes = usePalettes()
const lightScheme = useLightScheme()
const darkScheme = useDarkScheme()

const sections = reactive({
  lightScheme: false,
  darkScheme: false,
  palettes: false,
  customColors: false
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
      <!--      <FormColors/>-->
    </aside>
    <main
        class="relative h-[calc(100dvh_-_64px)]  flex-row-reverse justify-center overflow-y-auto scrollbar-thin scrollbar-thumb-surface-level-3 hover:scrollbar-thumb-surface-level-5 scrollbar-thumb-surface-variant scrollbar-track-surface/50"
    >
      <SectionGroup>
        <SectionGrid data-ref="elevated-button">
          <template #legend>
            Elevated
          </template>
          <template #header-col-1>
            Elevated Button
            <span class="font-bold underline underline-offset-4">without icon</span>
          </template>
          <template #header-col-2>
            Elevated Button with both
            <span class="font-bold underline underline-offset-4">icon</span>
            and
            <span class="font-bold underline underline-offset-4">label text</span>
          </template>
          <template #body-col-1>
            <CommonButton intent="elevated" size="small">
              Edit Profile
            </CommonButton>
            <CommonButton intent="elevated" size="medium">
              Edit Profile
            </CommonButton>
            <CommonButton intent="elevated" size="large">
              Edit Profile
            </CommonButton>
          </template>
          <template #body-col-2>
            <CommonButton intent="elevated" prefix-icon="ic:outline-edit" size="small">
              Edit Profile
            </CommonButton>
            <CommonButton intent="elevated" prefix-icon="ic:outline-edit" size="medium">
              Edit Profile
            </CommonButton>
            <CommonButton intent="elevated" prefix-icon="ic:outline-edit" size="large">
              Edit Profile
            </CommonButton>
          </template>
        </SectionGrid>
        <SectionGrid data-ref="filled-button">
          <template #legend>
            Filled
          </template>
          <template #header-col-1>
            Filled Button
            <span class="font-bold underline underline-offset-4">without icon</span>
          </template>
          <template #header-col-2>
            Filled Button with both
            <span class="font-bold underline underline-offset-4">icon</span>
            and
            <span class="font-bold underline underline-offset-4">label text</span>
          </template>
          <template #body-col-1>
            <CommonButton intent="filled" size="small">
              Present
            </CommonButton>
            <CommonButton intent="filled" size="medium">
              Present
            </CommonButton>
            <CommonButton intent="filled" size="large">
              Present
            </CommonButton>
          </template>
          <template #body-col-2>
            <CommonButton intent="filled" prefix-icon="ic:round-present-to-all" size="small">
              Present
            </CommonButton>
            <CommonButton intent="filled" prefix-icon="ic:round-present-to-all" size="medium">
              Present
            </CommonButton>
            <CommonButton intent="filled" prefix-icon="ic:round-present-to-all" size="large">
              Present
            </CommonButton>
          </template>
        </SectionGrid>
        <SectionGrid data-ref="filled-tonal-button">
          <template #legend>
            Filled Tonal
          </template>
          <template #header-col-1>
            Filled Tonal Button
            <span class="font-bold underline underline-offset-4">without icon</span>
          </template>
          <template #header-col-2>
            Filled Tonal Button with both
            <span class="font-bold underline underline-offset-4">icon</span>
            and
            <span class="font-bold underline underline-offset-4">label text</span>
          </template>
          <template #body-col-1>
            <CommonButton intent="filled-tonal" size="small">
              Present
            </CommonButton>
            <CommonButton intent="filled-tonal" size="medium">
              Present
            </CommonButton>
            <CommonButton intent="filled-tonal" size="large">
              Present
            </CommonButton>
          </template>
          <template #body-col-2>
            <CommonButton intent="filled-tonal" prefix-icon="ic:round-present-to-all" size="small">
              Present
            </CommonButton>
            <CommonButton intent="filled-tonal" prefix-icon="ic:round-present-to-all" size="medium">
              Present
            </CommonButton>
            <CommonButton intent="filled-tonal" prefix-icon="ic:round-present-to-all" size="large">
              Present
            </CommonButton>
          </template>
        </SectionGrid>
        <SectionGrid data-ref="outlined-button">
          <template #legend>
            Outlined
          </template>
          <template #header-col-1>
            Outlined Button
            <span class="font-bold underline underline-offset-4">without icon</span>
          </template>
          <template #header-col-2>
            Outlined Button with both
            <span class="font-bold underline underline-offset-4">icon</span>
            and
            <span class="font-bold underline underline-offset-4">label text</span>
          </template>
          <template #body-col-1>
            <CommonButton intent="outlined" size="small">
              Edit Profile
            </CommonButton>
            <CommonButton intent="outlined" size="medium">
              Edit Profile
            </CommonButton>
            <CommonButton intent="outlined" size="large">
              Edit Profile
            </CommonButton>
          </template>
          <template #body-col-2>
            <CommonButton intent="outlined" prefix-icon="ic:outline-edit" size="small">
              Edit Profile
            </CommonButton>
            <CommonButton intent="outlined" prefix-icon="ic:outline-edit" size="medium">
              Edit Profile
            </CommonButton>
            <CommonButton intent="outlined" prefix-icon="ic:outline-edit" size="large">
              Edit Profile
            </CommonButton>
          </template>
        </SectionGrid>
        <SectionGrid data-ref="text-button">
          <template #legend>
            Text
          </template>
          <template #header-col-1>
            Text Button
            <span class="font-bold underline underline-offset-4">without icon</span>
          </template>
          <template #header-col-2>
            Text Button with both
            <span class="font-bold underline underline-offset-4">icon</span>
            and
            <span class="font-bold underline underline-offset-4">label text</span>
          </template>
          <template #body-col-1>
            <CommonButton intent="text" size="small">
              Edit Profile
            </CommonButton>
            <CommonButton intent="text" size="medium">
              Edit Profile
            </CommonButton>
            <CommonButton intent="text" size="large">
              Edit Profile
            </CommonButton>
          </template>
          <template #body-col-2>
            <CommonButton intent="text" prefix-icon="ic:outline-edit" size="small">
              Edit Profile
            </CommonButton>
            <CommonButton intent="text" prefix-icon="ic:outline-edit" size="medium">
              Edit Profile
            </CommonButton>
            <CommonButton intent="text" prefix-icon="ic:outline-edit" size="large">
              Edit Profile
            </CommonButton>
          </template>
        </SectionGrid>
        <SectionGrid data-ref="fab-button">
          <template #legend>
            FAB
          </template>
          <template #header-col-1>
            FAB Button
          </template>
          <template #body-col-1>
            <div class="flex gap-6">
              <div class="flex flex-col gap-2">
                <h3 class="mb-2 font-semibold">Primary</h3>
                <div class="flex flex-col gap-4">
                  <CommonButton intent="fab" size="small" title="Small FAB" variant="primary">
                    <Icon name="ic:outline-mode-edit-outline"/>
                  </CommonButton>
                  <CommonButton intent="fab" size="medium" title="Medium FAB" variant="primary">
                    <Icon name="ic:outline-mode-edit-outline"/>
                  </CommonButton>
                  <CommonButton intent="fab" size="large" title="Large FAB" variant="primary">
                    <Icon name="ic:outline-mode-edit-outline"/>
                  </CommonButton>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <h3 class="mb-2 font-semibold">Surface</h3>
                <div class="flex flex-col gap-4">
                  <CommonButton intent="fab" size="small" title="Small FAB" variant="surface">
                    <Icon name="ic:outline-mode-edit-outline"/>
                  </CommonButton>
                  <CommonButton intent="fab" size="medium" title="Medium FAB" variant="surface">
                    <Icon name="ic:outline-mode-edit-outline"/>
                  </CommonButton>
                  <CommonButton intent="fab" size="large" title="Large FAB" variant="surface">
                    <Icon name="ic:outline-mode-edit-outline"/>
                  </CommonButton>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <h3 class="mb-2 font-semibold">Secondary</h3>
                <div class="flex flex-col gap-4">
                  <CommonButton intent="fab" size="small" title="Small FAB" variant="secondary">
                    <Icon name="ic:outline-mode-edit-outline"/>
                  </CommonButton>
                  <CommonButton intent="fab" size="medium" title="Medium FAB" variant="secondary">
                    <Icon name="ic:outline-mode-edit-outline"/>
                  </CommonButton>
                  <CommonButton intent="fab" size="large" title="Large FAB" variant="secondary">
                    <Icon name="ic:outline-mode-edit-outline"/>
                  </CommonButton>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <h3 class="mb-2 font-semibold">Tertiary</h3>
                <div class="flex flex-col gap-4">
                  <CommonButton intent="fab" size="small" title="Small FAB" variant="tertiary">
                    <Icon name="ic:outline-mode-edit-outline"/>
                  </CommonButton>
                  <CommonButton intent="fab" size="medium" title="Medium FAB" variant="tertiary">
                    <Icon name="ic:outline-mode-edit-outline"/>
                  </CommonButton>
                  <CommonButton intent="fab" size="large" title="Large FAB" variant="tertiary">
                    <Icon name="ic:outline-mode-edit-outline"/>
                  </CommonButton>
                </div>
              </div>
            </div>
          </template>
        </SectionGrid>
        <SectionGrid data-ref="extended-fab-button">
          <template #legend>
            Extended FAB
          </template>
          <template #header-col-1>
            Extended FAB
            <span class="font-bold underline underline-offset-4">without icon</span>
          </template>
          <template #header-col-2>
            Extended FAB with both
            <span class="font-bold underline underline-offset-4">icon</span>
            and
            <span class="font-bold underline underline-offset-4">label text</span>
          </template>
          <template #body-col-1>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <h3 class="mb-2 font-semibold">Primary</h3>
                <div class="flex gap-4">
                  <CommonButton intent="extended-fab" size="small" title="Small FAB" variant="primary">
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" size="medium" title="Medium FAB" variant="primary">
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" size="large" title="Large FAB" variant="primary">
                    Compose
                  </CommonButton>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <h3 class="mb-2 font-semibold">Secondary</h3>
                <div class="flex gap-4">
                  <CommonButton intent="extended-fab" size="small" title="Small FAB" variant="secondary">
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" size="medium" title="Medium FAB" variant="secondary">
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" size="large" title="Large FAB" variant="secondary">
                    Compose
                  </CommonButton>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <h3 class="mb-2 font-semibold">Tertiary</h3>
                <div class="flex gap-4">
                  <CommonButton intent="extended-fab" size="small" title="Small FAB" variant="tertiary">
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" size="medium" title="Medium FAB" variant="tertiary">
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" size="large" title="Large FAB" variant="tertiary">
                    Compose
                  </CommonButton>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <h3 class="mb-2 font-semibold">Surface</h3>
                <div class="flex gap-4">
                  <CommonButton intent="extended-fab" size="small" title="Small FAB" variant="surface">
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" size="medium" title="Medium FAB" variant="surface">
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" size="large" title="Large FAB" variant="surface">
                    Compose
                  </CommonButton>
                </div>
              </div>
            </div>
          </template>
          <template #body-col-2>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <h3 class="mb-2 font-semibold">Primary</h3>
                <div class="flex gap-4">
                  <CommonButton intent="extended-fab" size="small" title="Small FAB" variant="primary">
                    <template #prefix-icon>
                      <Icon name="ic:outline-mode-edit-outline"/>
                    </template>
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" size="medium" title="Medium FAB" variant="primary">
                    <template #prefix-icon>
                      <Icon name="ic:outline-mode-edit-outline"/>
                    </template>
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" size="large" title="Large FAB" variant="primary">
                    <template #prefix-icon>
                      <Icon name="ic:outline-mode-edit-outline"/>
                    </template>
                    Compose
                  </CommonButton>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <h3 class="mb-2 font-semibold">Secondary</h3>
                <div class="flex gap-4">
                  <CommonButton intent="extended-fab" size="small" title="Small FAB" variant="secondary">
                    <template #prefix-icon>
                      <Icon name="ic:outline-mode-edit-outline"/>
                    </template>
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" size="medium" title="Medium FAB" variant="secondary">
                    <template #prefix-icon>
                      <Icon name="ic:outline-mode-edit-outline"/>
                    </template>
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" size="large" title="Large FAB" variant="secondary">
                    <template #prefix-icon>
                      <Icon name="ic:outline-mode-edit-outline"/>
                    </template>
                    Compose
                  </CommonButton>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <h3 class="mb-2 font-semibold">Tertiary</h3>
                <div class="flex gap-4">
                  <CommonButton intent="extended-fab" size="small" variant="tertiary">
                    <template #prefix-icon>
                      <Icon name="ic:outline-mode-edit-outline"/>
                    </template>
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" size="medium" variant="tertiary">
                    <template #prefix-icon>
                      <Icon name="ic:outline-mode-edit-outline"/>
                    </template>
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" size="large" variant="tertiary">
                    <template #prefix-icon>
                      <Icon name="ic:outline-mode-edit-outline"/>
                    </template>
                    Compose
                  </CommonButton>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <h3 class="mb-2 font-semibold">Surface</h3>
                <div class="flex gap-4">
                  <CommonButton intent="extended-fab" prefix-icon="ic:outline-mode-edit-outline" size="small"
                                variant="surface">
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" prefix-icon="ic:outline-mode-edit-outline" size="medium"
                                variant="surface">
                    Compose
                  </CommonButton>
                  <CommonButton intent="extended-fab" prefix-icon="ic:outline-mode-edit-outline" size="large"
                                variant="surface">
                    Compose
                  </CommonButton>
                </div>
              </div>
            </div>
          </template>
        </SectionGrid>


        <!--


        -->


        <div class="flex flex-col gap-8">
          <section class="grid gap-4 py-4">
            <legend>
              <h2 class="text-2xl font-bold">
                Icon Button
              </h2>
            </legend>
            <article class="flex-col">
              <header class="mb-2">
                <h2 class="text-xl font-bold leading-tight text-on-error-container">Standard</h2>
              </header>
              <main class="grid grid-flow-col gap-8">
                <div class="grid grid-cols-3 gap-4">
                  <div class="flex flex-col gap-4">
                    <h3 class="mb-2 font-semibold">No toggle
                      <span class="font-bold underline underline-offset-4">default</span>
                    </h3>
                    <div class="flex-col">
                      <div class="flex gap-4">
                        <CommonButton intent="icon" size="small">
                          <Icon name="ic:outline-location-on"/>
                        </CommonButton>
                        <CommonButton intent="icon" size="medium">
                          <Icon name="ic:outline-location-on"/>
                        </CommonButton>
                        <CommonButton intent="icon" size="large">
                          <Icon name="ic:outline-location-on"/>
                        </CommonButton>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                      <h3 class="mb-2 font-semibold">
                        Toggle
                        <span class="font-bold underline underline-offset-4">unselected</span>
                      </h3>
                      <div class="flex-col">
                        <div class="flex gap-4">
                          <CommonButton intent="icon" size="small" state="unselected">
                            <Icon name="ic:outline-location-on"/>
                          </CommonButton>
                          <CommonButton intent="icon" size="medium" state="unselected">
                            <Icon name="ic:outline-location-on"/>
                          </CommonButton>
                          <CommonButton intent="icon" size="large" state="unselected">
                            <Icon name="ic:outline-location-on"/>
                          </CommonButton>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                      <h3 class="mb-2 font-semibold">
                        Toggle
                        <span class="font-bold underline underline-offset-4">selected</span>
                      </h3>
                      <div class="flex-col">
                        <div class="flex gap-4">
                          <CommonButton intent="icon" size="small" state="selected">
                            <Icon name="ic:outline-location-on"/>
                          </CommonButton>
                          <CommonButton intent="icon" size="medium" state="selected">
                            <Icon name="ic:outline-location-on"/>
                          </CommonButton>
                          <CommonButton intent="icon" size="large" state="selected">
                            <Icon name="ic:outline-location-on"/>
                          </CommonButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </article>
            <article class="flex-col divide divide-error-container divide-dashed">
              <header class="mb-2">
                <h2 class="text-xl font-bold leading-tight text-on-error-container">
                  Contained
                </h2>
              </header>
              <main class="grid gap-8">
                <div class="grid grid-cols-3">
                  <div class="flex flex-col">
                    <div class="flex-col">
                      <h3 class="mb-2 font-semibold">
                        No toggle
                      </h3>
                      <div class="flex gap-2">
                        <CommonButton container="contained" intent="icon" size="small" variant="primary">
                          <Icon name="ic:outline-location-on"/>
                        </CommonButton>
                        <CommonButton container="contained" intent="icon" size="medium" variant="secondary">
                          <Icon name="ic:outline-location-on"/>
                        </CommonButton>
                        <CommonButton container="contained" intent="icon" size="large" variant="tertiary">
                          <Icon name="ic:outline-location-on"/>
                        </CommonButton>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="flex flex-col">
                      <h3 class="mb-2 font-semibold">
                        Toggle
                        <span class="font-bold underline underline-offset-4">unselected</span>
                      </h3>
                      <div class="flex-col">
                        <div class="flex gap-2">
                          <CommonButton container="contained" intent="icon" size="small" state="unselected">
                            <Icon name="ic:outline-location-on"/>
                          </CommonButton>
                          <CommonButton container="contained" intent="icon" size="medium" state="unselected">
                            <Icon name="ic:outline-location-on"/>
                          </CommonButton>
                          <CommonButton container="contained" intent="icon" size="large" state="unselected">
                            <Icon name="ic:outline-location-on"/>
                          </CommonButton>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="flex flex-col">
                      <h3 class="mb-2 font-semibold">
                        Toggle
                        <span class="font-bold underline underline-offset-4">selected</span>
                      </h3>
                      <div class="flex-col ">
                        <div class="flex gap-2">
                          <CommonButton container="contained" intent="icon" size="small" state="selected">
                            <Icon name="ic:outline-location-on"/>
                          </CommonButton>
                          <CommonButton container="contained" intent="icon" size="medium" state="selected">
                            <Icon name="ic:outline-location-on"/>
                          </CommonButton>
                          <CommonButton container="contained" intent="icon" size="large" state="selected">
                            <Icon name="ic:outline-location-on"/>
                          </CommonButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--
                                <div class="flex flex-col">
                                  <div class="flex flex-col">
                                    <div class="flex-col">
                                      <h3 class="mb-2 font-semibold">
                                        No toggle
                                      </h3>
                                      <div class="flex">
                                        <CommonButton intent="icon" size="small" variant="contained">
                                          <Icon name="ic:outline-location-on"/>
                                        </CommonButton>
                                        <CommonButton intent="icon" size="medium" variant="contained">
                                          <Icon name="ic:outline-location-on"/>
                                        </CommonButton>
                                        <CommonButton intent="icon" size="large" variant="contained">
                                          <Icon name="ic:outline-location-on"/>
                                        </CommonButton>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="flex flex-col">
                                    <div class="flex flex-col">
                                      <h3 class="mb-2 font-semibold">
                                        Toggle
                                        <span class="font-bold underline underline-offset-4">unselected</span>
                                      </h3>
                                      <div class="flex-col">
                                        <div class="flex">
                                          <CommonButton intent="icon" size="small" state="unselected">
                                            <Icon name="ic:outline-location-on"/>
                                          </CommonButton>
                                          <CommonButton intent="icon" size="medium" state="unselected">
                                            <Icon name="ic:outline-location-on"/>
                                          </CommonButton>
                                          <CommonButton intent="icon" size="large" state="unselected">
                                            <Icon name="ic:outline-location-on"/>
                                          </CommonButton>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="flex flex-col">
                                    <div class="flex flex-col">
                                      <h3 class="mb-2 font-semibold">
                                        Toggle
                                        <span class="font-bold underline underline-offset-4">selected</span>
                                      </h3>
                                      <div class="flex-col">
                                        <div class="flex">
                                          <CommonButton intent="icon" size="small" state="selected">
                                            <Icon name="ic:outline-location-on"/>
                                          </CommonButton>
                                          <CommonButton intent="icon" size="medium" state="selected">
                                            <Icon name="ic:outline-location-on"/>
                                          </CommonButton>
                                          <CommonButton intent="icon" size="large" state="selected">
                                            <Icon name="ic:outline-location-on"/>
                                          </CommonButton>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="flex flex-col">

                                  <div class="flex flex-col">
                                    <div class="flex-col">
                                      <h3 class="mb-2 font-semibold">
                                        No toggle
                                      </h3>
                                      <div class="flex">
                                        <CommonButton intent="icon" size="small" variant="contained">
                                          <Icon name="ic:outline-location-on"/>
                                        </CommonButton>
                                        <CommonButton intent="icon" size="medium" variant="contained">
                                          <Icon name="ic:outline-location-on"/>
                                        </CommonButton>
                                        <CommonButton intent="icon" size="large" variant="contained">
                                          <Icon name="ic:outline-location-on"/>
                                        </CommonButton>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="flex flex-col">
                                    <div class="flex flex-col">
                                      <h3 class="mb-2 font-semibold">
                                        Toggle
                                        <span class="font-bold underline underline-offset-4">unselected</span>
                                      </h3>
                                      <div class="flex-col">
                                        <div class="flex gap-4">
                                          <CommonButton intent="icon" size="small" state="unselected">
                                            <Icon name="ic:outline-location-on"/>
                                          </CommonButton>
                                          <CommonButton intent="icon" size="medium" state="unselected">
                                            <Icon name="ic:outline-location-on"/>
                                          </CommonButton>
                                          <CommonButton intent="icon" size="large" state="unselected">
                                            <Icon name="ic:outline-location-on"/>
                                          </CommonButton>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="flex flex-col">
                                    <div class="flex flex-col">
                                      <h3 class="mb-2 font-semibold">
                                        Toggle
                                        <span class="font-bold underline underline-offset-4">selected</span>
                                      </h3>
                                      <div class="flex-col">
                                        <div class="flex">
                                          <CommonButton intent="icon" size="small" state="selected">
                                            <Icon name="ic:outline-location-on"/>
                                          </CommonButton>
                                          <CommonButton intent="icon" size="medium" state="selected">
                                            <Icon name="ic:outline-location-on"/>
                                          </CommonButton>
                                          <CommonButton intent="icon" size="large" state="selected">
                                            <Icon name="ic:outline-location-on"/>
                                          </CommonButton>
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                                -->
              </main>
            </article>
          </section>
        </div>
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
        <Section :on-toggle="() => toggle('palettes')"
                 :opened="sections.palettes"
                 data-section="color-palettes">
          <template #title>Tonal Palettes</template>
          <ColorPalettes :palettes="palettes"/>
        </Section>
        <Section :on-toggle="() => toggle('customColors')"
                 :opened="sections.customColors"
                 data-section="custom-colors">
          <template #title>Custom Colors</template>
          <CustomColors/>
        </Section>
      </SectionGroup>
    </main>
    <SideSheet/>
  </div>
</template>
