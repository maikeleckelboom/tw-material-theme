<script lang="ts" setup>
import { tv } from "tailwind-variants";

interface Props {
  type?: "standard" | "inset";
}

const props = withDefaults(defineProps<Props>(), {
  type: "standard",
});

const divider = tv({
  base: ["border-t", "border-outline-variant", "my-[8px]"],
  variants: {
    type: {
      standard: "w-full",
      inset: "w-[calc(100%_-_32px)] ml-[16px]",
    },
  },
  defaultVariants: {},
});

const dividerClasses = computed(() => divider(props));
</script>

<template>
  <div :class="dividerClasses">
    <slot />
  </div>
</template>
