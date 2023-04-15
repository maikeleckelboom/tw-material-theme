<script lang="ts" setup>
import {cva} from "class-variance-authority";
import {twMerge} from "tailwind-merge";

type Intent = "elevated" | "filled" | "filled-tonal" | "outlined" | "text" | "fab" | "extended-fab";
type Size = "small" | "medium" | "large";
type Color = "primary" | "secondary" | "tertiary" | "surface";

interface Props {
  dir?: "ltr" | "rtl";
  icon?: string;
  intent?: Intent;
  size?: Size;
  stretch?: boolean;
  color?: Color;
}

const variants = cva(
    [
      "flex",
      "items-center",
      "justify-center",
      "flex",
      "items-center",
      "justify-center",
      "gap-3",
      "shrink-0",
      "relative",
      "overflow-hidden",
      "before:z-0",
      "before:opacity-0",
      "before:content",
      "before:absolute",
      "before:inset-0",
      "before:bg-current",
      "before:pointer-events-none",
      "hover:before:opacity-[0.08]",
      "hover:before:active:opacity-[0.18]",
      "active:before:opacity-[0.16]",
      "label-text:text-ellipsis",
      "label-text:font-semibold",
      "label-text:capitalize",
      "label-text:shrink-0",
      "icon:shrink-0",
    ],
    {
      variants: {
        dir: {
          ltr: "flex-row",
          rtl: "flex-row-reverse",
        },
        stretch: {
          true: "w-full",
          false: "w-fit",
        },
        intent: {
          elevated: [
            "bg-surface-level-2",
            "text-primary",
            "shadow-lg",
            "shadow-shadow",
            "hover:shadow-xl",
            "active:shadow-lg ",
          ],
          filled: ["bg-primary", "text-on-primary"],
          "filled-tonal": [
            "bg-secondary-container",
            "text-on-secondary-container",
          ],
          outlined: [
            "bg-transparent",
            "text-primary",
            "border",
            "border-outline",
          ],
          text: [
            "bg-transparent",
            "label-text:text-primary"
          ],
          fab: [
            // ...
          ],
          "extended-fab": [
            // ...
          ],
        },
        size: {
          small: ["p-3", "label-text:text-sm", 'h-[36px]', "icon:w-[24px]", "icon:h-[24px]"],
          medium: [
            "label-text:text-base",
            "p-4",
            "icon:w-[24px]",
            "icon:h-[24px]",
            'h-[48px]'
          ],
          large: [
            "label-text:text-lg",
            "p-5",
            "icon:w-[24px]",
            "icon:h-[24px]"
            , 'h-[56px]'
          ],
        },
        color: {
          primary: "",
          secondary: "",
          tertiary: "",
          surface: "",
        },
      },
      compoundVariants: [
        {
          intent: ["fab", "extended-fab"],
          color: "primary",
          class: "bg-primary-container text-on-primary-container",
        },
        {
          intent: ["fab", "extended-fab"],
          color: "secondary",
          class: "bg-secondary-container text-on-secondary-container",
        },
        {
          intent: ["fab", "extended-fab"],
          color: "tertiary",
          class: "bg-tertiary-container text-on-tertiary-container",
        },
        {
          intent: ["fab", "extended-fab"],
          color: "surface",
          class: "bg-surface-level-2 text-on-surface-level-2",
        },
        {
          intent: ["elevated", "filled", "filled-tonal", "outlined", "text"],
          class: "rounded-full",
        },
        {
          intent: "fab",
          size: "small",
          class: "rounded-xl h-[40px] w-[40px] icon:w-[24px] icon:h-[24px]",
        },
        {
          intent: "fab",
          size: "medium",
          class: "rounded-2xl h-[56px] w-[56px] icon:w-[24px] icon:h-[24px]",
        },
        {
          intent: "fab",
          size: "large",
          class: "rounded-3.5xl h-[96px] w-[96px] icon:w-[40px] icon:h-[40px]",
        },
        {
          intent: "extended-fab",
          size: "small",
          class: "rounded-xl h-[40px] icon:w-[24px] icon:h-[24px]",
        },
        {
          intent: "extended-fab",
          size: "medium",
          class: "rounded-2xl h-[56px] icon:w-[24px] icon:h-[24px]",
        },
        {
          intent: "extended-fab",
          size: "large",
          class: "rounded-3.5xl h-[96px] icon:w-[40px] icon:h-[40px]",
        },
      ],
    }
);

const props = withDefaults(defineProps<Props>(), {
  intent: "filled",
  size: "small",
  dir: "ltr",
});

const buttonClasses = computed(() => twMerge(variants(props)));
</script>

<template>
  <button :class="buttonClasses"
          data-component=button">
    <slot name="icon">
      <Icon v-if="icon" :name="icon"/>
    </slot>
    <span class="label-text">
      <slot/>
    </span>
  </button>
</template>
