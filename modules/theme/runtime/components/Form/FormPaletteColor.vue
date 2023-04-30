<script lang="ts" setup>
import Chroma from "chroma-js"
import {hexFromArgb, TonalPalette} from "@material/material-color-utilities"
import {useCorePaletteColor, round} from "~/modules/theme/runtime/composables/useCorePaletteColor"
import {KeyColors} from "~";

interface Props {
  keyColorName: keyof KeyColors
}

const props = defineProps<Props>()


const {
  model,
  bounds,
  hex
} = useCorePaletteColor(props.keyColorName)

const hueSpectrum = computed(() => ({
  background: `linear-gradient(to right, ${Chroma
      .scale(['#f00', '#0f0', '#00f', '#f00'])
      .mode('lab')
      .colors(bounds.hue.max)
      .join(', ')
  })`
}))

const chromaSpectrum = computed(() => ({
  background: `linear-gradient(to right, ${Chroma
      .scale(['#000', '#fff'])
      .mode('lab')
      .colors(bounds.chroma.max)
      .map((color, step) => hexFromArgb(TonalPalette
          .fromHueAndChroma(model.hue, model.chroma)
          .tone(step) as number))
      .join(', ')})`
}))

const toneSpectrum = computed(() => ({
  background: `linear-gradient(to right, ${Chroma
      .scale(['#000', '#fff'])
      .mode('lab')
      .colors(bounds.tone.max)
      .join(', ')})`
}))

const round = (value: number, precision: number = 0) => {
  const {pow, round} = Math
  const multiplier = pow(10, precision)
  return round(value * multiplier) / multiplier
}

const onNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseFloat(target.value)
}
</script>

<template>
  <form
      class="m-4 mx-auto flex flex-col justify-center p-4 max-w-screen-compact bg-surface-level-2">

    <fieldset class="my-2 flex flex-col gap-2">
      <!-- hex -->

      <div class="grid grid-cols-[1fr,_auto] gap-x-4 gap-y-2 pr-2 items-center">
        <label class="text-label-large" for="hex">
          Hex
        </label>
        <input :value="hex"
               class="rounded-sm p-2 tabular-nums outline-none w-18 text-on-surface-variant bg-surface-level-2 border-thin border-outline-variant focus:bg-surface-level-3 focus:border-primary"
               type="text">
      </div>

      <!-- -->
      <div class="grid grid-cols-[1fr,_auto] gap-x-4 gap-y-2 pr-2 items-center">
        <label class="text-label-large" for="hue">
          Hue
        </label>
        <input :max="bounds.hue.max"
               :min="bounds.hue.min"
               :value="round(model.hue)"
               class="rounded-sm p-2 tabular-nums outline-none w-18 text-on-surface-variant bg-surface-level-2 border-thin border-outline-variant focus:bg-surface-level-3 focus:border-primary"
               step="1"
               type="number">
      </div>
      <input id="hue"
             v-model="model.hue"
             :max="bounds.hue.max"
             :min="bounds.hue.min"
             class="mb-2 h-5"
             step="1"
             type="range">
      <div :style="hueSpectrum"
           class="h-4 w-full rounded-full"/>
    </fieldset>


    <fieldset class="my-2 flex flex-col gap-2">
      <div class="grid grid-cols-[1fr,_auto] gap-x-4 gap-y-2 pr-2 items-center">
        <label class="text-label-large" for="chroma">
          Chroma
        </label>
        <input
            :max="bounds.chroma.max"
            :min="bounds.chroma.min"
            :value="round(model.chroma)"
            class="rounded-sm p-2 tabular-nums outline-none w-18 text-on-surface-variant bg-surface-level-2 border-thin border-outline-variant focus:bg-surface-level-3 focus:border-primary"
            step="1"
            type="number"
            v-on:input="onNumberInput">
      </div>
      <input id="chroma"
             v-model="model.chroma"
             :max="bounds.chroma.max"
             :min="bounds.chroma.min"
             class="mb-2 h-5"
             step="1"
             type="range">
      <div :style="chromaSpectrum"
           class="h-4 w-full rounded-full"/>
    </fieldset>

    <fieldset class="my-2 flex flex-col gap-2">
      <div class="grid grid-cols-[1fr,_auto] gap-x-4 gap-y-2 pr-2 h-[42px] items-center">
        <label class="text-label-large" for="tone">
          Tone
        </label>
        <input :max="bounds.tone.max"
               :min="bounds.tone.min"
               :value="round(model.tone)"
               class="rounded-sm appearance-none p-2 tabular-nums outline-none accent-error w-18 text-on-surface-variant bg-surface-level-2 border-thin border-outline-variant focus:bg-surface-level-3 focus:border-primary"
               step="1"
               type="number"
               v-on:input="onNumberInput">
      </div>
      <input id="tone"
             v-model="model.tone"
             :max="bounds.tone.max"
             :min="bounds.tone.min"
             class="mb-2 h-5"
             step="1"
             type="range">
      <div :style="toneSpectrum"
           class="h-4 w-full rounded-full"/>
    </fieldset>
  </form>
</template>
