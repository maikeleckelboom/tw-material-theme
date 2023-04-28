<script lang="ts" setup>
import {useDialog} from "~/modules/dialog/runtime/plugin";

const props = defineProps<{
  name?: string;
  transitionAttrs?: Record<string, any>;
}>()

const name = computed(() => props.name || 'default')

const componentRef = ref<HTMLElement>()

const {instance} = useDialog()

watch(componentRef, () => {
  if (instance.value) {
    // Save component instance to access returnValue
    instance.value.component = componentRef.value
  }
})


const isFullscreen = computed(() => instance.value?.props?.type === 'full-screen')
</script>

<template>
  <Component
      :is="instance?.dialog ?? 'div'"
      ref="componentRef"
      v-bind="instance?.props">
    <slot/>
  </Component>
</template>
