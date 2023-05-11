<script lang="ts" setup>
interface Props {
  height?: number | string;
  width?: number | string;
  axis?: "x" | "y";
}

const props = withDefaults(defineProps<Props>(), {
  axis: "x",
});

const height = computed(() => (props.axis === "x" ? props.height : "100%"));
const width = computed(() => (props.axis === "y" ? props.width : "100%"));

const scale = computed(() => {
  if (props.axis === "x") return width.value / 100;
  return height.value / 100;
});

const transform = computed(() => {
  if (props.axis === "x") return `scaleX(${props.width})`;
  return `scaleY(${props.height})`;
});
</script>

<template>
  <div class="component--spacer" data-component="Spacer" />
</template>

<style lang="postcss" module>
.component--spacer[data-component="Spacer"] {
  position: relative;
  height: 1px;
  width: 1px;
  transform-origin: 0 0;

  transform: scale(v-bind(scale));
}
</style>
