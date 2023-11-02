<script lang="ts" setup>
import {SIDE_SHEET_INJECTION_KEY} from "~/global/keys";

const {close} = inject(SIDE_SHEET_INJECTION_KEY, {
  isModal: false,
  isOpened: false,
  close: () => {
  },
  open: () => {
  },
})
</script>

<template>
  <footer class="pointer-events-none flex items-center py-[24px]"
          data-name="side-sheet-footer">
    <div class="pointer-events-auto flex items-center justify-start gap-3 px-[24px]">
      <Button size="sm">
        Save
      </Button>
      <Button intent="outlined" size="sm" v-on:click="close()">
        Cancel
      </Button>
    </div>
  </footer>
</template>
