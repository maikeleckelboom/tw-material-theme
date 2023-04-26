<script lang="ts" setup>
import {SIDE_SHEET_INJECTION_KEY} from "~/global/keys"
import IconButton from "~/components/Button/IconButton.vue"

const {isModal, close, open} = inject(SIDE_SHEET_INJECTION_KEY, {
  isModal: false,
  isOpened: false,
  close: () => {
  },
  open: () => {
  },
})
</script>

<template>
  <header class=" pointer-events-none ">
    <div v-if="isModal"
         class="grid grid-cols-[auto,_1fr,_auto] items-center gap-x-2 w-full py-2 px-4 gap-2 ">
      <button
          class="flex items-center justify-center rounded-full w-[40px] h-[40px] hover:bg-secondary-container/20 pointer-events-auto"
          v-on:click="()=>close()">
        <Icon class="w-[24px] h-[24px] text-on-secondary-container" name="ic:outline-arrow-back"/>
      </button>
      <slot/>
      <IconButton
          class="pointer-events-auto"
          icon="ic:outline-close"
          v-on:click="close()"
      />
    </div>
  </header>
</template>
