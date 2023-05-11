<script lang="ts" setup>
type Item = {
  label: string;
  icon: string;
  href?: string;
  active?: boolean;
};

interface Props {
  items: Item[];
}

const props = defineProps<Props>();

const { items } = toRefs(props);
</script>

<template>
  <ul data-component="Navigation">
    <li v-for="item in items" :key="item.label">
      <NavigationItem v-bind="item" />
    </li>
  </ul>
</template>
