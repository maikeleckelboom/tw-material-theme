<script lang="ts" setup>
import {hexFromArgb} from "@material/material-color-utilities";

const theme = useTheme()
const sourceColor = useSourceColor()

const keyColors = reactive({
  primary: computed({
    get: () => sourceColor.value,
    set: (value) => sourceColor.value = value
  }),
  secondary: hexFromArgb(theme.value.palettes.secondary.tone(60)),
  tertiary: hexFromArgb(theme.value.palettes.tertiary.tone(60)),
  neutral: hexFromArgb(theme.value.palettes.neutral.tone(60)),
})

const onColorChange = (ev: InputEvent) => {
  const input = ev.target as HTMLInputElement
  keyColors[input.name as keyof typeof keyColors] = input.value
}

</script>

<template>
  <div>
    <div class="mb-6 flex flex-col">
      <h2 class="mt-1 text-xl mb-1.5">
        Core Colors
      </h2>
      <p class="text-sm leading-tight text-on-surface-variant">
        Input one or more brand color to define your color scheme.
      </p>
    </div>
    <form class="mt-4 mb-8 flex flex-col gap-4">
      <fieldset>
        <label
            class="grid grid-cols-[auto,1fr] gap-x-5 cursor-pointer rounded-2xl py-3 px-4 bg-surface-level-1 border-thin border-surface-level-2 hover:bg-surface-level-2"
            for="primary">
          <input id="primary"
                 v-model="keyColors.primary"
                 class="row-span-2"
                 type="color">
          <span class="flex flex-col gap-1 pt-1">
            <span class="text-md">
              Primary
            </span>
            <span class="overflow-hidden text-ellipsis text-xs text-on-surface-variant">
              Acts as custom source color
            </span>
          </span>
        </label>
      </fieldset>
      <fieldset>
        <label
            class="grid grid-cols-[auto,1fr] gap-x-5 cursor-pointer rounded-2xl py-3 px-4 bg-surface-level-1 border-thin border-surface-level-2 hover:bg-surface-level-2"
            for="secondary">
          <input id="secondary"
                 v-model="keyColors.secondary"
                 name="secondary"
                 type="color"
                 v-on:input="onColorChange">
          <span class="flex flex-col gap-1 pt-1">
            <span class="text-md">
              Secondary
            </span>
            <!--            <span class="text-xs text-on-surface-variant">-->
            <!--              Override-->
            <!--            </span>-->
          </span>
        </label>
      </fieldset>
      <fieldset>
        <label
            class="grid grid-cols-[auto,1fr] gap-x-5 cursor-pointer rounded-2xl py-3 px-4 bg-surface-level-1 border-thin border-surface-level-2 hover:bg-surface-level-2"
            for="tertiary">
          <input id="tertiary"
                 v-model="keyColors.tertiary"
                 name="tertiary"
                 type="color"
                 v-on:input="onColorChange">
          <span class="flex flex-col gap-1 pt-1">
            <span class="text-md">
              Tertiary
            </span>
           <span class="flex gap-1.5 items-center justify-end ">
            <Icon class=" w-4 h-4 " name="ic:round-warning"/>
            <span class="text-xs pt-0.5 leading-3 text-on-surface-variant">
              Override
            </span>
           </span>
          </span>
        </label>
      </fieldset>
      <fieldset>
        <label
            class="grid grid-cols-[auto,1fr] gap-x-5 cursor-pointer rounded-2xl py-3 px-4 bg-surface-level-1 border-thin border-surface-level-2 hover:bg-surface-level-2"
            for="neutral">
          <input id="neutral"
                 v-model="keyColors.neutral"
                 name="neutral"
                 type="color"
                 v-on:input="onColorChange">
          <span class="flex flex-col gap-1 pt-1">
            <span class="text-body">
              Neutral
            </span>
            <span class="overflow-hidden text-ellipsis text-xs text-on-surface-variant">
              Used for background and surfaces
            </span>
          </span>
        </label>
      </fieldset>
    </form>
  </div>
</template>

<style lang="postcss">
input[type="color"] {
  @apply h-12 w-12 cursor-pointer rounded-full border-none p-0;

  &::-webkit-color-swatch,
  &::-webkit-color-swatch-wrapper {
    @apply rounded-full border-none p-0;
  }
}
</style>
