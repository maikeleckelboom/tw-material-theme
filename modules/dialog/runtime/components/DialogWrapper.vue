<script lang="ts" setup>
const component = ref<HTMLElement>();

const { instance } = useDialog();

watch(component, () => {
  if (!instance.value) return;
  instance.value.component = markRaw(component);
});

const dialog = computed(() => instance.value?.dialog);

const props = computed(() => instance.value?.props ?? {});
</script>

<template>
  <Component :is="dialog" ref="component" v-bind="props" />
</template>
