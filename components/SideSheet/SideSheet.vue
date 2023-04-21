<script lang="ts" setup>
import {useSideSheetStore} from "~/stores/useSideSheetStore";
import {storeToRefs} from "pinia";
import {cva} from "class-variance-authority";
import Tabs from "~/components/Button/Tabs.vue";
import {usePalettes} from "#imports";


const isDarkMode = computed(() => {
  const {$prefersDark} = useNuxtApp()
  return $prefersDark.value
})

const groupedSchemeColors = computed(() => joinSchemes(useLightScheme(), useDarkScheme()))


const store = useSideSheetStore()
const {isPinned, isOpened, isModal} = storeToRefs(store)
const {close, togglePin} = store

// ...
interface Props {
  isModal: boolean
}

const createClassList = cva([
  'right-0',
  'bottom-0',
  'top-0',
  'grid',
  'grid-rows-[auto,_auto,_1fr_,100px]',
  'justify-self-end',
  'bg-surface',
  'ps-[0px]',
  'h-[100dvh]',
  'w-full',
  'max-w-[400px]',
  'z-30'
], {
  variants: {
    isModal: {
      true: [
        'fixed z-10',
        'border-l',
        'border-outline-variant',
        'rounded-tl-3xl',
        'rounded-bl-3xl'
      ],
      false: [
        'relative',
      ],
    },
  },
}) as (props: Props) => string

const classList = computedEager(() => createClassList({isModal: isModal.value}))

const transitionAttrs = computedEager<string>(() => '')
// (isModal.value || isOpened.value ? 'slide-to-right' : 'slide-to-left'))

const palettes = usePalettes()
</script>

<template>
  <Transition :name="transitionAttrs">
    <aside v-if="isOpened" :class="classList" data-component="side-sheet">
      <header>
        <div class="flex items-center justify-start">
          <button v-if="isModal"
                  class="mx-4 my-2 flex items-center justify-center rounded-full w-[40px] h-[40px] hover:bg-secondary-container/20"
                  v-on:click="()=>close()">
            <Icon class="w-[24px] h-[24px] text-on-secondary-container" name="ic:outline-arrow-back"/>
          </button>
        </div>
      </header>
      <Tabs>
        <template #columns="props">
          <button
              class="flex items-center justify-center gap-2 hover:bg-surface-level-2 active:bg-surface-level-3"
              name="schemes">
            <Icon v-if="props?.current === 'schemes'" name="ic:check"/>
            Schemes
          </button>
          <button class="flex items-center justify-center gap-2 hover:bg-surface-level-2 active:bg-surface-level-3"
                  name="palettes">
            <Icon v-if="props?.current === 'palettes'" name="ic:check"/>
            Palettes
          </button>
          <button
              class="flex items-center justify-center gap-2 hover:bg-surface-level-2 active:bg-surface-level-3"
              name="extended">
            <Icon v-if="props?.current === 'extended'" name="ic:check"/>
            Extended
          </button>
        </template>
        <template #schemes>
          <div v-for="(color, key) in groupedSchemeColors" :key="key"
               class="flex items-center gap-x-8 p-2 px-8">
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
        </template>
        <template #palettes>
          <div v-for="(palette, key) in palettes" :key="key" class="grid gap-3 px-3">
            <p class="text-title-medium font-bold capitalize">
              {{ key }}
            </p>
            <div class="flex flex-row gap-2">
              <label for="hue">Hue</label>
              <input id="hue" v-model="palette.hue" class="flex-1" max="360" min="0" type="range"/>
            </div>
            <div class="flex flex-row gap-2">
              <label for="tone">Tone</label>
              <input id="tone" class="flex-1" max="100" min="0" type="range"/>
            </div>
          </div>
        </template>
        <template #extended>
          Extended
        </template>
      </Tabs>
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
  </Transition>
</template>
