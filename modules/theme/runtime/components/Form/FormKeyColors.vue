<script lang="ts" setup>
const theme = useTheme()
const {$keyColors} = useNuxtApp()

const onColorChange = (ev: InputEvent) => {
  const input = ev.target as HTMLInputElement
  // $keyColors[input.name as keyof typeof $keyColors] = input.value
}

</script>

<template>
  <div>
    <div class="mb-6 flex flex-col">
      <h2 class="mt-1 mb-2 text-[22px]">
        Core Colors
      </h2>
      <p class="mt-2 text-[14px] tracking-[0.1px] leading-[18px] text-on-surface-variant">
        Input one or more brand color to define your color scheme.
      </p>
    </div>
    <form class="mt-4 mb-8 flex flex-col gap-4">
      <fieldset>
        <label
            class="grid grid-cols-[auto,1fr] gap-x-5 cursor-pointer rounded-[16px] p-3 bg-surface-level-1 border-thin border-surface-level-2 hover:bg-surface-level-2 active:bg-surface-level-3"
            for="primary">
          <input id="primary"
                 v-model="$keyColors.primary"
                 class="row-span-2"
                 type="color">
          <span class="flex flex-col gap-1 pt-1">
            <span class="leading-tight font-[400] text-[15px]">
              Primary
            </span>
            <span class="tracking-wider text-[12px]">
              Acts as custom source color
            </span>
          </span>
        </label>
      </fieldset>
      <fieldset>
        <label
            class="grid grid-cols-[auto,1fr] gap-x-5 cursor-pointer rounded-[16px] p-3 bg-surface-level-1 border-thin border-surface-level-2 hover:bg-surface-level-2 active:bg-surface-level-3"
            for="secondary">
          <input id="secondary"
                 v-model="$keyColors.secondary"
                 name="secondary"
                 type="color"
                 v-on:input="onColorChange">
          <span class="flex h-full flex-col justify-center">
            <span class="leading-tight font-[400] text-[15px]">
              Secondary
            </span>
          </span>
        </label>
      </fieldset>
      <fieldset>
        <label
            class="grid grid-cols-[auto,1fr] gap-x-5 cursor-pointer rounded-[16px] p-3 bg-surface-level-1 border-thin border-surface-level-2 hover:bg-surface-level-2 active:bg-surface-level-3"
            for="tertiary">
          <input id="tertiary"
                 v-model="$keyColors.tertiary"
                 name="tertiary"
                 type="color"
                 v-on:input="onColorChange">
          <span class="flex h-full flex-col justify-center">
            <span class="leading-tight font-[400] text-[15px]">
              Tertiary
            </span>
          </span>
        </label>
      </fieldset>
      <fieldset>
        <label
            class="grid grid-cols-[auto,1fr] gap-x-5 cursor-pointer rounded-[16px] p-3 bg-surface-level-1 border-thin border-surface-level-2 hover:bg-surface-level-2 active:bg-surface-level-3"
            for="neutral">
          <input id="neutral"
                 v-model="$keyColors.neutral"
                 name="neutral"
                 type="color"
                 v-on:input="onColorChange">
          <span class="flex flex-col gap-1 pt-1">
            <span class="leading-tight font-[400] text-[15px]">
              Neutral
            </span>
            <span class="tracking-wider text-[12px]">
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
  @apply h-12 w-12 cursor-pointer appearance-none rounded-full border-none p-0 outline outline-surface outline-[2px] -outline-offset-1;

  &::-webkit-color-swatch,
  &::-webkit-color-swatch-wrapper {
    @apply rounded-full p-0;
  }
}
</style>
