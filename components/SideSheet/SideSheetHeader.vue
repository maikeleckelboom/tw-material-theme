<script lang="ts" setup>
import {SIDE_SHEET_INJECTION_KEY} from "~/global/keys"
import IconButton from "~/components/Button/IconButton.vue"

const {isModal, close, open} = inject(SIDE_SHEET_INJECTION_KEY)!

const props = defineProps<{
  title?: string,
}>()

const {title} = toRefs(props)

const showBackButton = ref<boolean>(false)
</script>

<template>
  <header class="pointer-events-none ">
    <div
        class="flex flex-row  items-center gap-x-2 w-full py-[12px] px-[24px] ] gap-2 ">
      <IconButton
          v-if="showBackButton"
          class="pointer-events-auto"
          icon="ic:outline-arrow-back"
          v-on:click="close()"
      />
      <slot>
        <p v-if="title" class="text-title-large">
          {{ title }}
        </p>
      </slot>
      <IconButton
          class="pointer-events-auto justify-self-end ml-auto"
          icon="ic:outline-close"
          v-on:click="close()"
      />
    </div>
  </header>
</template>
