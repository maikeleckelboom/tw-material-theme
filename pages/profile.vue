<script lang="ts" setup>
import CircleOut from "~/components/CircleOut.vue";

const {open} = useSideSheetStore()
</script>

<template>
  <div class="w-full">
    <!-- test box -->
    <div class="flex bg-surface-level-2 h-[100px] w-[100px]">
      <CircleOut/>
    </div>
    <Button class="m-4" v-on:click="open()">
      Open Side Sheet
    </Button>
  </div>
</template>
