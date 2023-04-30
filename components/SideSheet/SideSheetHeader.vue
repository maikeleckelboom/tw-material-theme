<script lang="ts" setup>
import {SIDE_SHEET_INJECTION_KEY} from "~/global/keys"
import IconButton from "~/components/Button/IconButton.vue"

const {isModal, close, open} = inject(SIDE_SHEET_INJECTION_KEY)!

const props = defineProps<{
  headline?: string,
}>()

const {headline} = toRefs(props)

const showBackButton = ref<boolean>(false)
</script>

<template>
  <header v-if="isModal" class="pointer-events-none h-[72px] flex">
    <div
        class="flex w-full flex-row items-center gap-2 gap-x-2 py-[12px] px-[24px]">
      <IconButton
          v-if="showBackButton"
          class="pointer-events-auto"
          icon="ic:outline-arrow-back"
          v-on:click="close()"
      />
      <slot>
        <p v-if="headline" class="text-title-large">
          {{ headline }}
        </p>
      </slot>
      <IconButton
          v-if="isModal"
          class="pointer-events-auto ml-auto justify-self-end"
          icon="ic:outline-close"
          v-on:click="close()"
      />
    </div>
  </header>
</template>
