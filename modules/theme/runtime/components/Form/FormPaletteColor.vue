<script lang="ts" setup>
import Chroma from "chroma-js"
import {argbFromHex, CustomColor, hexFromArgb, TonalPalette} from "@material/material-color-utilities"
import {HctColorModel} from "~~"
import {capitalize} from "@vue/runtime-core";

interface Props {
  name: string
  value: string
}

const props = defineProps<Props>()

const formModel = reactive<HctColorModel>({
  hue: 0,
  chroma: 0,
  tone: 0
})

type Bounds = {
  min: number
  max: number
}

type FormModelBounds = {
  [key in keyof typeof formModel]: Bounds
}

const formModelBounds: FormModelBounds = {
  hue: {min: 0, max: 360},
  chroma: {min: 0, max: 150},
  tone: {min: 0, max: 100}
} as const


onBeforeMount(() => {
  const keyColor = argbFromHex(props.value)
  const palette = TonalPalette.fromInt(keyColor)
  formModel.hue = round(palette.hue, 2)
  formModel.chroma = round(palette.chroma, 2)
  formModel.tone = round(palette.tone(50), 2)
})

const hueSpec = computed(() => ({
  background: `linear-gradient(to right, ${Chroma
      .scale(['#f00', '#0f0', '#00f', '#f00'])
      .mode('lab')
      .colors(formModelBounds.hue.max)
      .join(', ')
  })`
}))

const chromaSpec = computed(() => ({
  background: `linear-gradient(to right, ${Chroma
      .scale(['#000', '#fff'])
      .mode('lab')
      .colors(formModelBounds.chroma.max)
      .map((color, step) => hexFromArgb(TonalPalette
          .fromHueAndChroma(formModel.hue, formModel.chroma)
          .tone(step) as number))
      .join(', ')})`
}))

const toneSpec = computed(() => ({
  background: `linear-gradient(to right, ${Chroma
      .scale(['#000', '#fff'])
      .mode('lab')
      .colors(formModelBounds.tone.max)
      .join(', ')})`
}))

const round = (value: number, precision: number) => {
  const {pow, round} = Math
  const multiplier = pow(10, precision || 0)
  return round(value * multiplier) / multiplier
}
</script>

<template>
  <form
      class="m-4 mx-auto flex flex-col justify-center p-4 max-w-screen-compact bg-surface-level-2">
    <h1>{{ capitalize(name) }}</h1>
    <fieldset class="my-2 flex flex-row">
      <div class="flex w-full flex-col">
        <div class="flex w-full">
          <label class="text-title-small" for="hue">
            Hue
          </label>
        </div>
        <div class="grid grid-cols-[1fr,auto] gap-x-4 gap-y-2">
          <input id="hue" v-model="formModel.hue" max="360" min="0" step="0.1" type="range">
          <span class="tabular-nums text-label-small">{{ round(formModel.hue, 2) }}</span>
        </div>
        <div :style="hueSpec" class="h-8 w-full rounded-full"></div>
      </div>
    </fieldset>
    <fieldset class="my-2 flex flex-row">
      <div class="flex w-full flex-col gap-2">
        <div class="flex w-full">
          <label class="text-title-small" for="chroma">
            Chroma
          </label>
        </div>
        <div class="grid grid-cols-[1fr,auto] gap-x-4 gap-y-2">
          <input id="chroma" v-model="formModel.chroma" max="150" min="0" step="0.1" type="range">
          <span class="tabular-nums text-label-small">{{ round(formModel.chroma, 2) }}</span>
        </div>
        <div :style="chromaSpec" class="h-8 w-full rounded-full"></div>
      </div>
    </fieldset>
    <fieldset class="my-2 flex flex-row">
      <div class="flex w-full flex-col gap-2">
        <div class="flex">
          <label class="text-title-small" for="tone">
            Tone
          </label>
        </div>
        <div class="grid grid-cols-[1fr,auto] gap-x-4 gap-y-2">
          <input id="tone" v-model="formModel.tone" max="100" min="0" step="0.1" type="range">
          <span class="tabular-nums text-label-small">{{ round(formModel.tone, 2) }}</span>
        </div>
        <div :style="toneSpec" class="h-8 w-full rounded-full"></div>
      </div>
    </fieldset>
  </form>
</template>
