<script lang="ts" setup>

import {animate} from "popmotion";
import {useRefHistory} from "@vueuse/core";

const exoticColors = shallowRef<{
  name: string;
  value: string;
}[]>([
  {
    name: "Mystic Mauve",
    value: "#8D5EB7",
  },
  {
    name: "Aurora Green",
    value: "#78D1BD",
  },
  {
    name: "Electric Lavender",
    value: "#BFAEEA",
  },
  {
    name: "Solar Flare",
    value: "#F9A24E",
  },
  {
    name: "Galactic Gold",
    value: "#F7C200",
  },
  {
    name: "Cosmic Cobalt",
    value: "#005CAF",
  },
  {
    name: "Nebula Pink",
    value: "#E8747C",
  },
  {
    name: "Celestial Cyan",
    value: "#0097C4",
  },
  {
    name: "Lunar Lilac",
    value: "#C1B8E6",
  },
  {
    name: "Supernova Yellow",
    value: "#FFE338",
  }
])


const customColors = useCustomColors()

const addCustomColor = (blend: boolean = false) => {
  const {name, value} = exoticColors.value[Math.floor(Math.random() * exoticColors.value.length)]
  if (customColors.value.find((color) => color.name === name)) {
    console.warn(
        `Color "${name}" already exists and will not be added. \n`,
        `---\n`,
        `TODO: Developer todo: resolve this issue. \n`
    )
  }
  customColors.value.push({name, value, blend: false})
  nextTick(scrollToBottom)
}

const animateToBottom = async (el: Element) => {
  const duration = 480 * (el.scrollHeight - el.scrollTop) / el.scrollHeight
  console.log(duration)
  return new Promise((resolve) => animate({
    from: el.scrollTop,
    to: el.scrollHeight,
    duration,
    onUpdate: (value: number) => el.scrollTop = value,
    onComplete: () => resolve(true),
  }))
}


const scrollToBottom = () => {
  const aside = document.querySelector('#__nuxt aside')
  const main = document.querySelector('#__nuxt main')
  if (!aside || !main) return
  Promise.all([animateToBottom(aside), animateToBottom(main)])
}

const removeCustomColor = (index: number): void => {
  customColors.value.splice(index, 1)
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col">
      <h2 class="mt-1 text-xl mb-2.5">
        Custom Colors
      </h2>
      <p class="text-sm leading-tight text-on-surface-variant">
        Input a custom color that automatically gets assigned a set of complementary tones.
      </p>
    </div>
    <form class="flex flex-col gap-4">
      <div v-for="(color, key) in customColors" :key="key"
           class="flex cursor-pointer gap-4 rounded-2xl p-3 text-sm leading-5 bg-surface-level-1 border-[thin] border-surface-level-2 hover:bg-surface-level-2">
        <input :id="color.name"
               v-model="color.value"
               class="shrink-0"
               type="color"/>
        <input v-model="color.name"
               :name="color.name"
               class="w-full border-none bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none"
               type="text"/>

        <button
            class="flex aspect-square items-center justify-center self-center rounded-full bg-transparent h-[38px] hover:bg-surface-level-2"
            v-on:click.stop.prevent="removeCustomColor(key)">
          <Icon name="ic:outline-delete"/>
        </button>
        <label :for="key + 'blend'">
          <input :id="key + 'blend'" v-model="color.blend" class="peer" type="checkbox"/>
          <Icon class="pointer-events-none absolute h-5 w-5 opacity-0 peer-checked:opacity-100" name="ic:round-check"/>
        </label>
      </div>
    </form>

    <button
        class="mt-4 flex w-full items-center justify-start gap-4 rounded-2xl border-transparent p-3 hover:bg-surface-level-1 hover:border-surface-level-2 border-thin"
        v-on:click="addCustomColor">
      <Icon class="h-10 w-10 rounded-full p-2 bg-surface-level-2" name="ic:outline-add"/>
      <span class="text-md">Add a color</span>
    </button>

  </div>
</template>

<style lang="postcss">
label[for$="blend"] {
  @apply relative grid cursor-pointer place-items-center items-center rounded-md text-primary;
}

input[type="checkbox"] {
  @apply
  relative
  h-[28px]
  w-[28px]
  appearance-none
  rounded-md
  border
  border-outline-variant
  bg-surface
  hover:bg-surface-level-1
  cursor-pointer
  z-[1]
  hover:after:ring-offset-2
  hover:after:ring-primary
  checked:bg-surface-level-1;
}
</style>
