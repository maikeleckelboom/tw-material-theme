<script lang="ts" setup>
import {useSideSheetStore} from "~/stores/useSideSheetStore";
import {storeToRefs} from "pinia";

const store = useSideSheetStore()
const {isModalAndOpened, isOpened, isModal} = storeToRefs(store)
const {open, close} = store

</script>

<template>
  <div class="h-screen p-2 rail bg-surface-level-2">
    <button
        class="aspect-square rounded-full bg-transparent transition-all ease-out h-[40px] w-[40px] duration-180 hover:bg-surface-level-1 active:bg-surface-level-2"
        v-on:click="()=>open()">
      <Icon class="h-[24px] w-[24px]" name="ic:baseline-menu"/>
    </Button>
    <FormColorMode/>
  </div>
</template>
