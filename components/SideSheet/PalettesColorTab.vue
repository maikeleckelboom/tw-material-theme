<script lang="ts" setup>
interface Props {
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const { name } = toRefs(props);
</script>

<template>
  <p class="text-title-medium font-bold capitalize">
    {{ name }}
  </p>
</template>
