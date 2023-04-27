<script lang="ts" setup>
const {open} = useSideSheetStore()
</script>

<template>
  <div class="w-full relative overflow-hidden">
    <Button class="m-4" v-on:click="open(240)">
      Open Side Sheet
    </Button>
  </div>
</template>
