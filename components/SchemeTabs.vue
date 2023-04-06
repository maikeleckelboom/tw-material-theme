<script lang="ts" setup>

import {Scheme} from "@material/material-color-utilities";
import {ComputedRef} from "vue";
import {options} from "postcss-nesting/dist/lib/options";

const lightScheme = useLightScheme()
const darkScheme = useDarkScheme()
const scheme = useScheme()

type Option = {
  label: string
  icon: string | [string, string]
  value: string
}


// const options = ref<Option[]>([
//   {label: 'Palettes', icon: ['ic:outline-palette', "ic:palette"], value: 'palettes'},
//   {label: 'Schemes', icon: ['ic:outline-select-all', "ic:select-all"], value: 'scheme'},
//   {label: 'Extended', icon: ['ic:baseline-add-circle-outline', "ic:baseline-add-circle"], value: 'custom'},
// ])


const options = ref<Option[]>([
  {label: 'Light', icon: ['ic:outline-wb-sunny', "ic:wb-sunny"], value: 'light'},
  {label: 'Dark', icon: ['ic:outline-nightlight', "ic:nightlight"], value: 'dark'},
])


const current = ref(options.value.at(0))
const changeCurrent = (option: Option) => {
  current.value = option
}
</script>

<template>
  <div class="grid grid-cols-3 h-[48px]"
       data-component="segmented-buttons">
    <div
        v-for="option in options"
        :key="option.value"
        :class="{
          'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/90 active:bg-secondary-container': option.value === current.value,
          'text-on-surface-variant': option.value !== current.value
        }"
        class="flex h-full cursor-pointer flex-row items-center justify-center p-2 border-thin space-x-3 border-surface-level-2 hover:border-surface-level-5
        text-on-surface-variant hover:bg-surface-level-1 hover:text-on-surface active:bg-surface-level-2
        [&:first-child]:rounded-l-3xl [&:last-child]:rounded-r-3xl"
        v-on:click="changeCurrent(option)">
      <Icon :name="option.icon.at(option.value === current ? 1 : 0)" class="h-5 w-5"/>
      <span class="select-none text-md font-[500]">{{ option.label }}</span>
    </div>
  </div>
</template>
