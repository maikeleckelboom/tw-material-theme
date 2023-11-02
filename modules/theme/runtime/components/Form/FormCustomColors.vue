<script lang="ts" setup>
import {animate} from "popmotion"
import chroma from "chroma-js"


const customColors = useCustomColors()
const isLoading = ref<boolean>(false)

async function fetchRandomNamedColor() {
  const randomHex = chroma.random().hex()
  const response = await fetch(`https://www.thecolorapi.com/id?format=json&hex=${randomHex.replace('#', '')}`)
  const {hex: {value}, name: {value: name}} = await response.json() as {
    hex: { value: string },
    name: { value: string }
  }
  return {name, value}
}

const addCustomColor = async (_: PointerEvent, blend: boolean = true) => {
  try {
    isLoading.value = true
    const {name, value} = await fetchRandomNamedColor()
    customColors.value.push({name, value, blend})
    await nextTick(scrollToBottom)
  } finally {
    isLoading.value = false
  }
}

const animateToBottom = async (el: Element) => new Promise(resolve => animate({
  from: el.scrollTop,
  to: el.scrollHeight,
  duration: 500 * (el.scrollHeight - el.scrollTop) / el.scrollHeight,
  onUpdate: (value: number) => el.scrollTop = value,
  onComplete: () => resolve(true),
}))

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
      <h2 class="mt-1 text-xl mb-1.5">
        Extended Colors
      </h2>
      <p class="text-sm leading-tight text-on-surface-variant">
        Input a custom color that automatically gets assigned a set of complementary tones.
      </p>
    </div>
    <form class="flex flex-col gap-4">
      <div v-for="(color, key) in customColors" :key="key"
           class="flex cursor-pointer gap-x-5 p-3 rounded-[16px] bg-surface-level-1 border-thin border-surface-level-2 hover:bg-surface-level-2 active:bg-surface-level-3"
      >
        <input :id="color.name"
               v-model="color.value"
               class="shrink-0"
               type="color"/>
        <input v-model="color.name"
               :name="color.name"
               class="w-full border-none text-[14px] bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none"
               type="text"/>

        <button
            class="flex aspect-square items-center justify-center self-center rounded-full bg-transparent h-[38px] hover:bg-surface-level-2"
            v-on:click.stop.prevent="removeCustomColor(key)">
          <Icon class="h-[20px] w-[20px]" name="ic:outline-delete"/>
        </button>
        <label :for="key + 'blend'"
               class="relative grid cursor-pointer place-items-center items-center rounded-md text-primary">
          <input :id="key + 'blend'"
                 v-model="color.blend"
                 class="relative h-7 w-7 appearance-none rounded-md border peer border-outline-variant bg-surface z-[1] checked:bg-surface-level-1 hover:after:ring-primary hover:after:ring-offset-2 hover:bg-surface-level-1"
                 type="checkbox"/>
          <Icon class="pointer-events-none absolute opacity-0 peer-checked:opacity-100 h-[20px] w-[20px]"
                name="ic:round-check"/>
        </label>
      </div>
    </form>
    <button :disabled="isLoading"
            class="mt-4 w-full rounded-2xl px-4 min-h-[64px]"
            v-on:click="addCustomColor">
        <span class="flex items-center justify-start gap-5">
        <span class="rounded-full p-2 bg-secondary-container/10">
          <Icon class="h-6 w-6 text-primary" name="ic:outline-add"/>
        </span>
        <span class="text-secondary">Add a color</span>
      </span>
    </button>
  </div>
</template>
