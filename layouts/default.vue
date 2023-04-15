<script lang="ts" setup>

import {cva} from "class-variance-authority";
import {twMerge} from "tailwind-merge";
import {useSideSheetStore} from "~/stores/useSideSheetStore";
import {storeToRefs} from "pinia";

const store = useSideSheetStore()
const {isPinned, isOpened, isModal} = storeToRefs(store)
const {close} = store


const createClassList = cva([
  'right-0',
  'bottom-0',
  'top-0',
  'grid',
  'grid-rows-[auto,_auto_1fr_,100px]',
  'bg-surface',
  'ps-[24px]',
  'pe-[24px]',
  'h-[100dvh]',
  'w-full',
  'max-w-[400px]',
  'z-20'
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
}) as (props: { isModal: boolean }) => string

const classList = computedEager(() => twMerge(createClassList({isModal: isModal.value})))

</script>

<template>
  <div
      class="overflow-x-hidden scrollbar-thin scrollbar-thumb-surface-variant scrollbar-thumb-rounded-sm h-[100dvh] w-[100dvw] bg-background text-on-background"
  >
    <div class="flex">
      <div class="rail h-screen bg-surface-level-2 p-2">
        <FormColorMode/>

      </div>
      <slot/>
      <SideSheet
          v-if="isOpened"
          :class="classList"
      />
    </div>
  </div>
</template>
