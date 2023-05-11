<script lang="ts" setup>
import { Ref } from "vue";

interface Item {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  style?: {
    width?: string;
  };
}

interface Props {
  item: Item;
}

const props = defineProps<Props>();

const { item } = toRefs(props);

const { image } = toRefs(item.value);

const target = useCurrentElement() as Ref<HTMLElement>;

const isVisible = ref<boolean>(false);

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], _observerElement) => {
    isVisible.value = isIntersecting;
  },
  { threshold: 0.2 }
);

defineExpose({
  stop,
  isVisible,
});
</script>
<template>
  <div
    class="relative flex h-80 flex-col overflow-hidden rounded-xl flex-shrink-0 min-w-14 w-1/3 bg-surface-level-1 carousel-item"
    tabindex="0"
  >
    <img :src="item.image" alt="" class="absolute inset-0 w-full h-full" />
    <div class="absolute inset-x-0 bottom-2 mx-auto p-2 text-center">
      <p class="truncate text-title-large text-on-surface-dark">
        {{ item.title }}
      </p>
      <p class="truncate text-body-medium text-on-surface-variant-dark">
        {{ item.subtitle }}
      </p>
    </div>
  </div>
</template>

<style lang="postcss" module>
.carousel-item--image {
  background: v-bind(image);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: var(--parallax-amount);
  height: 100%;
  transition: background-position 0.2s ease-in-out;
}
</style>
