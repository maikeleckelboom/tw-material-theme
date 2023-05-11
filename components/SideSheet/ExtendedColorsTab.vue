<script lang="ts" setup>
import chroma from "chroma-js";
import { animate } from "popmotion";

const customColors = useCustomColors() as Ref<
  {
    name: string;
    value: string;
    blend: boolean;
  }[]
>;

const getRandomNamedColor = async () => {
  const value = chroma.random().hex();
  const name = await fetch(
    `https://www.thecolorapi.com/id?hex=${value.replace("#", "")}`
  )
    .then((res) => res.json())
    .then((res) => res.name.value);
  return { name, value, blend: false };
};
const addCustomColor = async (_: PointerEvent, blend: boolean = true) => {
  const { name, value } = await getRandomNamedColor();
  customColors.value.push({ name, value, blend });
};

const removeCustomColor = (index: number) => {
  customColors.value.splice(index, 1);
};

const container = ref<HTMLElement>();
</script>

<template>
  <div class="p-4">
    <div>
      <div ref="container" class="flex flex-col gap-4">
        <div
          v-for="(color, key) in customColors"
          :key="key"
          class="flex cursor-pointer gap-x-5 px-3 p-2 rounded-[16px] bg-surface-level-1 border-thin border-surface-level-2 hover:bg-surface-level-2 active:bg-surface-level-3"
        >
          <input
            :id="color.name"
            v-model="color.value"
            class="shrink-0"
            type="color"
          />
          <input
            v-model="color.name"
            :name="color.name"
            class="w-full border-none text-[14px] bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none"
            type="text"
          />
          <button
            class="flex aspect-square items-center justify-center self-center rounded-full bg-transparent h-[38px] hover:bg-surface-level-2"
            v-on:click.stop.prevent="removeCustomColor(key)"
          >
            <Icon class="h-[20px] w-[20px]" name="ic:outline-delete" />
          </button>
          <label
            :for="key + 'blend'"
            class="relative grid cursor-pointer place-items-center items-center rounded-md text-primary"
          >
            <input
              :id="key + 'blend'"
              v-model="color.blend"
              class="relative h-7 w-7 appearance-none rounded-md border peer border-outline-variant bg-surface z-[1] checked:bg-surface-level-1 hover:after:ring-primary hover:after:ring-offset-2 hover:bg-surface-level-1"
              type="checkbox"
            />
            <Icon
              class="pointer-events-none absolute opacity-0 peer-checked:opacity-100 h-[20px] w-[20px]"
              name="ic:round-check"
            />
          </label>
        </div>
      </div>
      <button
        class="mt-4 w-full rounded-2xl px-4 min-h-[64px]"
        v-on:click="addCustomColor"
      >
        <span class="flex items-center justify-start gap-5">
          <span class="rounded-full p-2 bg-secondary-container/10">
            <Icon class="h-6 w-6 text-primary" name="ic:outline-add" />
          </span>
          <span class="text-secondary">Add a color</span>
        </span>
      </button>
    </div>
  </div>
</template>
