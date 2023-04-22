<script lang="ts" setup>
import {SectionGrid, SectionGroup} from "#components";
import Button from "~/components/Button/Button.vue";


</script>

<template>
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
        <Button intent="elevated" size="small">
          Edit Profile
        </Button>
        <Button intent="elevated" size="medium">
          Edit Profile
        </Button>
        <Button intent="elevated" size="large">
          Edit Profile
        </Button>
      </template>
      <template #body-col-2>
        <Button icon="ic:outline-edit" intent="elevated" size="small">
          Edit Profile
        </Button>
        <Button icon="ic:outline-edit" intent="elevated" size="medium">
          Edit Profile
        </Button>
        <Button icon="ic:outline-edit" intent="elevated" size="large">
          Edit Profile
        </Button>
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
        <Button intent="filled" size="small">
          Present
        </Button>
        <Button intent="filled" size="medium">
          Present
        </Button>
        <Button intent="filled" size="large">
          Present
        </Button>
      </template>
      <template #body-col-2>
        <Button icon="ic:round-present-to-all" intent="filled" size="small">
          Present
        </Button>
        <Button icon="ic:round-present-to-all" intent="filled" size="medium">
          Present
        </Button>
        <Button icon="ic:round-present-to-all" intent="filled" size="large">
          Present
        </Button>
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
        <Button intent="filled-tonal" size="small">
          Present
        </Button>
        <Button intent="filled-tonal" size="medium">
          Present
        </Button>
        <Button intent="filled-tonal" size="large">
          Present
        </Button>
      </template>
      <template #body-col-2>
        <Button icon="ic:round-present-to-all" intent="filled-tonal" size="small">
          Present
        </Button>
        <Button icon="ic:round-present-to-all" intent="filled-tonal" size="medium">
          Present
        </Button>
        <Button icon="ic:round-present-to-all" intent="filled-tonal" size="large">
          Present
        </Button>
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
        <Button intent="outlined" size="small">
          Edit Profile
        </Button>
        <Button intent="outlined" size="medium">
          Edit Profile
        </Button>
        <Button intent="outlined" size="large">
          Edit Profile
        </Button>
      </template>
      <template #body-col-2>
        <Button icon="ic:outline-edit" intent="outlined" size="small">
          Edit Profile
        </Button>
        <Button icon="ic:outline-edit" intent="outlined" size="medium">
          Edit Profile
        </Button>
        <Button icon="ic:outline-edit" intent="outlined" size="large">
          Edit Profile
        </Button>
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
        <Button intent="text" size="small">
          Edit Profile
        </Button>
        <Button intent="text" size="medium">
          Edit Profile
        </Button>
        <Button intent="text" size="large">
          Edit Profile
        </Button>
      </template>
      <template #body-col-2>
        <Button icon="ic:outline-edit" intent="text" size="small">
          Edit Profile
        </Button>
        <Button icon="ic:outline-edit" intent="text" size="medium">
          Edit Profile
        </Button>
        <Button icon="ic:outline-edit" intent="text" size="large">
          Edit Profile
        </Button>
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
              <Button color="primary" intent="fab" size="small">
                <Icon name="ic:outline-mode-edit-outline"/>
              </Button>
              <Button color="primary" intent="fab" size="medium">
                <Icon name="ic:outline-mode-edit-outline"/>
              </Button>
              <Button color="primary" intent="fab" size="large">
                <Icon name="ic:outline-mode-edit-outline"/>
              </Button>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="mb-2 font-semibold">Surface</h3>
            <div class="flex flex-col gap-4">
              <Button color="surface" intent="fab" size="small">
                <Icon name="ic:outline-mode-edit-outline"/>
              </Button>
              <Button color="surface" intent="fab" size="medium">
                <Icon name="ic:outline-mode-edit-outline"/>
              </Button>
              <Button color="surface" intent="fab" size="large">
                <Icon name="ic:outline-mode-edit-outline"/>
              </Button>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="mb-2 font-semibold">Secondary</h3>
            <div class="flex flex-col gap-4">
              <Button color="secondary" intent="fab" size="small">
                <Icon name="ic:outline-mode-edit-outline"/>
              </Button>
              <Button color="secondary" intent="fab" size="medium">
                <Icon name="ic:outline-mode-edit-outline"/>
              </Button>
              <Button color="secondary" intent="fab" size="large">
                <Icon name="ic:outline-mode-edit-outline"/>
              </Button>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="mb-2 font-semibold">Tertiary</h3>
            <div class="flex flex-col gap-4">
              <Button color="tertiary" intent="fab" size="small">
                <Icon name="ic:outline-mode-edit-outline"/>
              </Button>
              <Button color="tertiary" intent="fab" size="medium">
                <Icon name="ic:outline-mode-edit-outline"/>
              </Button>
              <Button color="tertiary" intent="fab" size="large">
                <Icon name="ic:outline-mode-edit-outline"/>
              </Button>
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
              <Button color="primary" intent="extended-fab" size="small">
                Compose
              </Button>
              <Button color="primary" intent="extended-fab" size="medium">
                Compose
              </Button>
              <Button color="primary" intent="extended-fab" size="large">
                Compose
              </Button>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="mb-2 font-semibold">Secondary</h3>
            <div class="flex gap-4">
              <Button color="secondary" intent="extended-fab" size="small">
                Compose
              </Button>
              <Button color="secondary" intent="extended-fab" size="medium">
                Compose
              </Button>
              <Button color="secondary" intent="extended-fab" size="large">
                Compose
              </Button>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="mb-2 font-semibold">Tertiary</h3>
            <div class="flex gap-4">
              <Button color="tertiary" intent="extended-fab" size="small">
                Compose
              </Button>
              <Button color="tertiary" intent="extended-fab" size="medium">
                Compose
              </Button>
              <Button color="tertiary" intent="extended-fab" size="large">
                Compose
              </Button>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="mb-2 font-semibold">Surface</h3>
            <div class="flex gap-4">
              <Button color="surface" intent="extended-fab" size="small">
                Compose
              </Button>
              <Button color="surface" intent="extended-fab" size="medium">
                Compose
              </Button>
              <Button color="surface" intent="extended-fab" size="large">
                Compose
              </Button>
            </div>
          </div>
        </div>
      </template>
      <template #body-col-2>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <h3 class="mb-2 font-semibold">Primary</h3>
            <div class="flex gap-4">
              <Button color="primary" intent="extended-fab" size="small">
                <template #icon>
                  <Icon name="ic:outline-mode-edit-outline"/>
                </template>
                Compose
              </Button>
              <Button color="primary" intent="extended-fab" size="medium">
                <template #icon>
                  <Icon name="ic:outline-mode-edit-outline"/>
                </template>
                Compose
              </Button>
              <Button color="primary" intent="extended-fab" size="large">
                <template #icon>
                  <Icon name="ic:outline-mode-edit-outline"/>
                </template>
                Compose
              </Button>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="mb-2 font-semibold">Secondary</h3>
            <div class="flex gap-4">
              <Button color="secondary" intent="extended-fab" size="small">
                <template #icon>
                  <Icon name="ic:outline-mode-edit-outline"/>
                </template>
                Compose
              </Button>
              <Button color="secondary" intent="extended-fab" size="medium">
                <template #icon>
                  <Icon name="ic:outline-mode-edit-outline"/>
                </template>
                Compose
              </Button>
              <Button color="secondary" intent="extended-fab" size="large">
                <template #icon>
                  <Icon name="ic:outline-mode-edit-outline"/>
                </template>
                Compose
              </Button>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="mb-2 font-semibold">Tertiary</h3>
            <div class="flex gap-4">
              <Button color="tertiary" intent="extended-fab" size="small">
                <template #icon>
                  <Icon name="ic:outline-mode-edit-outline"/>
                </template>
                Compose
              </Button>
              <Button color="tertiary" intent="extended-fab" size="medium">
                <template #icon>
                  <Icon name="ic:outline-mode-edit-outline"/>
                </template>
                Compose
              </Button>
              <Button color="tertiary" intent="extended-fab" size="large">
                <template #icon>
                  <Icon name="ic:outline-mode-edit-outline"/>
                </template>
                Compose
              </Button>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="mb-2 font-semibold">Surface</h3>
            <div class="flex gap-4">
              <Button color="surface"
                      icon="ic:outline-mode-edit-outline"
                      intent="extended-fab"
                      size="small">
                Compose
              </Button>
              <Button color="surface"
                      icon="ic:outline-mode-edit-outline"
                      intent="extended-fab"
                      size="medium">
                Compose
              </Button>
              <Button color="surface"
                      icon="ic:outline-mode-edit-outline"
                      intent="extended-fab"
                      size="large">
                Compose
              </Button>
            </div>
          </div>
        </div>
      </template>
    </SectionGrid>
  </SectionGroup>
</template>
