<script lang="ts" setup>
import {defineProps} from 'vue'
import autoAnimate from '@formkit/auto-animate'

interface Props {
  opened?: boolean
  onToggle?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  opened: false,
  onToggle: () => ({})
})

const handle = ref<HTMLElement>()
</script>

<template>
  <section>
    <div class="grid cursor-pointer pt-2 pb-4 group ga grid-cols-[1fr_auto]"
         v-on:click="onToggle()">
      <h1 class="text-2xl">
        <slot name="title">
          Light Scheme
        </slot>
      </h1>
      <div ref="handle"
           class="flex rotate-180 flex-col items-center justify-center self-center">
        <Icon :key="opened" :class="opened ? '-rotate-90' : 'rotate-0'"
              :name="`ic:round-arrow-drop-${opened ? 'down' : 'up'}`"
              class="transition-all duration-200 group-hover:scale-[1.5] group-hover:rotate-[90deg]"
        />
      </div>
    </div>
    <div v-if="opened" ref="content">
      <slot></slot>
    </div>
  </section>
</template>

<style>
.spark-gif {
  object-fit: scale-down;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  position: absolute;
  height: 40px;
  width: 40px;
}
</style>
