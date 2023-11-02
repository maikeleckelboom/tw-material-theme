<script lang="ts" setup>
const store = useSideSheetStore()
const {open} = store
const {isOpened} = storeToRefs(store)
</script>

<template>
  <div class="w-full relative overflow-hidden">
    <Button :disabled="isOpened"
            class="m-4"
            v-on:click="open()">
      Open Side Sheet
    </Button>
  </div>
</template>
