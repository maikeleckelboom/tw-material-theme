<script lang="ts" setup>
import type { KeyColors } from "~";
import { hexFromArgb, TonalPalette } from "@material/material-color-utilities";
import Chroma from "chroma-js";
import { capitalize } from "@vue/runtime-core";

interface Props {
  keyColorName: keyof KeyColors;
}

const props = defineProps<Props>();

const { bounds, hex, hue, chroma, tone, triggerUpdate } = useCorePaletteColor(
  props.keyColorName
);

const hueSpectrum = computed(() => ({
  background: `linear-gradient(to right, ${Chroma.scale([
    "#f00",
    "#0f0",
    "#00f",
    "#f00",
  ])
    .mode("lab")
    .colors(bounds.hue.max - bounds.hue.min)
    .join(", ")})`,
}));

const chromaSpectrum = computed(() => ({
  background: `linear-gradient(to right, ${Chroma.scale(["#000", "#fff"])
    .mode("lab")
    .colors(bounds.chroma.max - bounds.chroma.min)
    .map((color, step) =>
      hexFromArgb(
        TonalPalette.fromHueAndChroma(hue.value, chroma.value).tone(
          step
        ) as number
      )
    )
    .join(", ")})`,
}));

const toneSpectrum = computed(() => ({
  background: `linear-gradient(to right, ${Chroma.scale(["#000", "#fff"])
    .mode("lab")
    .colors(bounds.tone.max - bounds.tone.min)
    .join(", ")})`,
}));

defineExpose({
  triggerUpdate,
});
</script>

<template>
  <form class="flex max-w-full flex-col justify-center w-[320px]">
    <fieldset>
      <div class="grid grid-cols-[1fr,_auto] gap-x-4 gap-y-2 pr-2 items-center">
        <label class="text-label-large" for="hex">
          {{ capitalize(keyColorName) }}
        </label>
        <input v-model="hex" type="color" />
      </div>
    </fieldset>
    <fieldset class="my-2 flex flex-col gap-2">
      <div class="grid grid-cols-[1fr,_auto] gap-x-4 gap-y-2 pr-2 items-center">
        <label class="text-label-large" for="hue"> Hue </label>
        <input
          v-model.number="hue"
          :max="bounds.hue.max"
          :min="bounds.hue.min"
          class="rounded-sm p-2 tabular-nums outline-none w-18 text-on-surface-variant bg-surface-level-2 border-thin border-outline-variant focus:bg-surface-level-3 focus:border-primary"
          step="1"
          type="number"
        />
      </div>
      <input
        id="hue"
        v-model.number="hue"
        :max="bounds.hue.max"
        :min="bounds.hue.min"
        class="mb-2 h-5 accent-primary"
        step="1"
        type="range"
      />
      <div :style="hueSpectrum" class="h-4 w-full rounded-full" />
    </fieldset>
    <fieldset class="my-2 flex flex-col gap-2">
      <div class="grid grid-cols-[1fr,_auto] gap-x-4 gap-y-2 pr-2 items-center">
        <label class="text-label-large" for="chroma"> Chroma </label>
        <input
          v-model.number="chroma"
          :max="bounds.chroma.max"
          :min="bounds.chroma.min"
          class="rounded-sm p-2 tabular-nums outline-none w-18 text-on-surface-variant bg-surface-level-2 border-thin border-outline-variant focus:bg-surface-level-3 focus:border-primary"
          step="1"
          type="number"
        />
      </div>
      <input
        id="chroma"
        v-model.number="chroma"
        :max="bounds.chroma.max"
        :min="bounds.chroma.min"
        class="mb-2 h-5 accent-primary"
        step="1"
        type="range"
      />
      <div :style="chromaSpectrum" class="h-4 w-full rounded-full" />
    </fieldset>

    <fieldset class="my-2 flex flex-col gap-2">
      <div
        class="grid grid-cols-[1fr,_auto] gap-x-4 gap-y-2 pr-2 h-[42px] items-center"
      >
        <label class="text-label-large" for="tone"> Tone </label>
        <input
          v-model.number="tone"
          :max="bounds.tone.max"
          :min="bounds.tone.min"
          class="appearance-none rounded-sm p-2 tabular-nums outline-none accent-error w-18 text-on-surface-variant bg-surface-level-2 border-thin border-outline-variant focus:bg-surface-level-3 focus:border-primary"
          step="1"
          type="number"
        />
      </div>
      <input
        id="tone"
        v-model.number="tone"
        :max="bounds.tone.max"
        :min="bounds.tone.min"
        class="mb-2 h-5 accent-primary"
        step="1"
        type="range"
      />
      <div :style="toneSpectrum" class="h-4 w-full rounded-full" />
    </fieldset>
  </form>
</template>
