<script lang="ts" setup>
import {storeToRefs} from "#imports";

const store = useSideSheetStore()
const {percentage, isClosed, isModal} = storeToRefs(store)
const {close} = store

const opacity = computed(() => {
  return percentage.value / 2
})

</script>

<template>
  <div v-if="isModal && !isClosed" :style="{opacity}" class="fixed inset-0 z-30 bg-scrim" v-on:click="close() "/>
</template>
