<script lang="ts" setup>
import SegmentedButtons from "~/components/Button/SegmentedButtons.vue";
import {useSideSheetStore} from "~/stores/useSideSheetStore";
import {storeToRefs} from "pinia";


const isDarkMode = computed(() => {
  const {$isDarkMode} = useNuxtApp()
  return $isDarkMode.value
})

const groupedSchemeColors = computed(() => joinSchemes(useLightScheme(), useDarkScheme()))


const store = useSideSheetStore()
const {isPinned, isOpened, isModal} = storeToRefs(store)
const {close} = store
</script>

<template>
  <aside class="justify-self-end px-[18px]" data-component="side-sheet">

    <header class=" py-[12px] grid grid-cols-[auto,_1fr,_auto] gap-[12px] "
            data-name="side-sheet-header">
      <div class="flex items-center justify-start">
        <button v-if="isModal"
                class="flex items-center justify-center rounded-full w-[40px] h-[40px] hover:bg-secondary-container/20"
                v-on:click="()=>close()">
          <Icon class="w-[24px] h-[24px] text-on-secondary-container" name="ic:outline-arrow-back"/>
        </button>
      </div>
      <div class="flex items-center justify-start">
        <h1 class="text-xl font-medium text-on-secondary-container">
          Colors
        </h1>
      </div>
      <div v-if="false" class="flex items-center justify-end gap-4">
        <button v-on:click="close">
          <Icon class="w-[24px] h-[24px] text-on-secondary-container" name="ic:outline-close"/>
        </button>
      </div>
    </header>

    <div class="sticky top-0 left-0 mb-4 flex">
      <SegmentedButtons/>
    </div>


    <div
        class="flex flex-col gap-x-4 overflow-y-auto scrollbar divide-y divide-outline-variant/50">
      <div v-for="(color, key) in groupedSchemeColors" :key="key"
           class="flex items-center gap-x-8 p-2">
        <div class="relative flex flex-row">
          <div :class="isDarkMode ? 'z-0 scale-90' : 'z-20 scale-100'"
               :style="{backgroundColor: color.color}"
               class="relative rounded-full border-2 w-[24px] h-[24px] border-surface"
          />
          <div :class="isDarkMode ? 'z-20 scale-100' : 'z-0 scale-90'"
               :style="{backgroundColor: color.darkColor}"
               class="absolute left-4 rounded-full border-2 w-[24px] h-[24px] border-surface"
          />
        </div>
        <div class="flex flex-col">
          <p class="text-sm font-medium">
            {{ color.name }}
          </p>
          <p class="text-xs font-normal text-on-secondary-container/60">
            {{ color.color }}
            <span class="text-on-secondary-container/60">/</span>
            {{ color.darkColor }}
          </p>
        </div>
      </div>
    </div>


    <footer class="flex items-center py-[24px]"
            data-name="side-sheet-footer">
      <div class="flex items-center justify-start gap-3 px-[24px]"
           data-name="side-sheet-actions">
        <button
            class="rounded-3xl px-6 bg-primary h-[38px] text-on-primary relative overflow-hidden hover:after:opacity-50 active:after:opacity-100 after:opacity-0 after:content[''] after:w-full after: after:h-full after:absolute after:inset-0 after:bg-inverse-primary/20"
            data-name="filled-button">
            <span class="relative text-sm font-medium text-on-primary z-[1]">
              Save
            </span>
        </button>
        <button
            class="rounded-3xl border bg-transparent px-5 h-[38px] border-surface-variant hover:bg-secondary-container/20 active:bg-secondary-container/30"
            data-name="outlined-button"
            v-on:click="close">
            <span class="text-sm font-medium text-primary">
              Cancel
            </span>
        </button>
      </div>
    </footer>
  </aside>
</template>
