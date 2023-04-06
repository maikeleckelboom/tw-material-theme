<script lang="ts" setup>
import {Scheme} from "@material/material-color-utilities"
import {styleFromToken} from "~/modules/theme/runtime/utils/styleFromToken"
import {humanize} from "../utils/humanize"

interface Props {
  scheme: Scheme,
  suffix?: string
  prefix?: string
}

const props = withDefaults(defineProps<Props>(), {
  suffix: '',
  prefix: 'md-sys-color-'
})

const exclude = [
  'background',
  'onBackground',
  'shadow',
  'scrim',
  'inverseSurface',
  'inversePrimary',
]

const filteredScheme = computed(() => Object.keys(props.scheme)
    .filter(key => !exclude.includes(key)))
</script>

<template>
  <div
      class="scheme-container">
    <div v-for="color in filteredScheme" :key="color"
         :style="styleFromToken(color, {prefix, suffix})"
         class="flex p-[max(6px,_12px)] relative overflow-hidden">
      <span class="h-auto text-sm font-medium leading-tight subpixel-antialiased">
        {{ humanize(color) }}
      </span>
    </div>
  </div>
</template>

<style lang="postcss">
.scheme-container {
  @apply grid grid-cols-scheme gap-y-1.5;

  > :last-child {
    /* Last item */
    @apply rounded-tr-lg rounded-br-lg;
  }

  > :nth-child(4n+1) {
    /* Every fourth item */
    @apply rounded-tl-lg rounded-bl-lg;
  }

  > :nth-child(4n) {
    /* Every last of each row */
    @apply rounded-tr-lg rounded-br-lg;
  }

  > :nth-child(-n+4) {
    /* First 4 */
    @apply h-[100px]
  }

  > :not(:nth-child(-n+4)) {
    /* All but first 4 */
    @apply h-[80px]
  }

  > :nth-child(n+17):nth-child(-n+20) {
    /* Last 4 */
    @apply mt-2;
  }
}

[data-section$="scheme" ] .scheme-container > :last-child {
  @apply col-span-2
}
</style>
