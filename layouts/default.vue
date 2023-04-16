<script lang="ts" setup>

import {useSideSheetStore} from "~/stores/useSideSheetStore";
import {storeToRefs} from "pinia";

const store = useSideSheetStore()
const {isModalAndOpened, isOpened, isModal} = storeToRefs(store)
const {open, close} = store


</script>

<template>
  <div
      class="overflow-x-hidden scrollbar-thin scrollbar-thumb-surface-variant scrollbar-thumb-rounded-sm h-[100dvh] w-[100dvw] bg-background text-on-background"
  >
    <div class="flex h-full w-full justify-center ">
      <NavigationDrawer/>
      <div class="w-full">
        <slot/>
      </div>
      <SideSheet/>
      <Transition>
        <div v-if="isModalAndOpened"
             class="fixed inset-0 backdrop-filter scrim bg-surface/80 z-20 cursor-default"
             v-on:click="()=>close()"/>
      </Transition>
    </div>
  </div>
</template>

<style lang="postcss">
.v-enter-active,
.v-leave-active {
  transition: opacity 280ms cubic-bezier(0.4, 0.1, 0.2, 1);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.slide-to-right-enter-active,
.slide-to-right-leave-active {
  transition: all 280ms cubic-bezier(0.4, 0.6, 0.4, 1);
}

.slide-to-right-enter-from,
.slide-to-right-leave-to {
  transform: translateX(100%);
}


.slide-to-left-enter-active,
.slide-to-left-leave-active {
  transition: all 280ms cubic-bezier(0.4, 0.6, 0.4, 1);
}

.slide-to-left-enter-from,
.slide-to-left-leave-to {
  transform: translateX(-100%);
}
</style>
