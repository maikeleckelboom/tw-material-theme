<script lang='ts' setup>
import {cva} from "class-variance-authority"

type Intent =
    | 'elevated'
    | 'filled'
    | 'filled-tonal'
    | 'outlined'
    | 'text'
    | 'icon'
    | 'fab'
    | 'extended-fab'

type Size = 'small' | 'medium' | 'large'

interface Props {
  intent?: Intent
  size?: Size
  prefixIcon?: string
  suffixIcon?: string
  stretch?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  intent: 'filled',
  size: 'medium',
  stretch: false,
})

const {
  intent,
  size,
  prefixIcon,
  suffixIcon,
  stretch
} = toRefs(props)

const buttonVariants = cva(
    [
      'flex',
      'items-center',
      'justify-center',
      'gap-4',
      'outline-transparent',
      'relative',
      'overflow-hidden',
      'active:outline-offset-0',
      'disabled:pointer-events-none',
      'disabled:opacity-60',
      'disabled:border-outline-variant',
      'transition-all',
      'duration-180',
      'cubic-bezier-0.4-0.0-0.2-1',
      'font-medium',
    ],
    {
      variants: {
        stretch: {
          true: [
            'w-full'
          ],
          false: [
            'w-auto'
          ],
        },
        intent: {
          elevated: [
            'h-fit',
            'w-fit',
            'shadow-lg',
            'shadow-shadow',
            'bg-surface-level-1',
            'text-on-surface',
            'rounded-full',
          ],
          filled: [
            'h-fit',
            'w-fit',
            'bg-primary',
            'text-on-primary',
            'rounded-full',
          ],
          'filled-tonal': [
            'h-fit',
            'w-fit',
            'bg-secondary-container',
            'text-on-secondary-container',
            'rounded-full',
          ],
          outlined: [
            'h-fit',
            'w-fit',
            'bg-transparent',
            'border',
            'border-outline-variant',
            'rounded-full',
          ],
          text: [
            'h-fit',
            'w-fit',
            'bg-transparent',
            'text-primary',
            'rounded-full',
          ],
          icon: [
            'bg-primary',
            'text-on-primary',
            'w-fit',
            'aspect-square',
            'before:bg-inverse-primary',
            'icon:w-[24px]',
            'icon:h-[24px]',
            'rounded-full',

          ],
          fab: [
            'bg-primary-container',
            'text-on-primary-container',
            'rounded-2xl',
            'aspect-square',
          ],
          'extended-fab': [
            'bg-primary-container',
            'text-on-primary-container',
            'rounded-2xl',
          ],
        },
        size: {
          small: [
            'text-sm',
            'py-3',
            'px-3',
            'h-[36px]'
          ],
          medium: [
            'text-base',
            'py-3',
            'px-5'
          ],
          large: [
            'text-lg',
            'py-3',
            'px-6',
          ],
        },
      },
      compoundVariants: [
        {
          intent: 'icon',
          size: 'small',
          class: [],
        },
        {
          intent: 'icon',
          size: 'medium',
          class: [],
        },

        // Border radius
        // ----------------
        // rounded-sm       -   2px
        // rounded-default  -   4px
        // rounded-md       -   6px
        // rounded-lg       -   8px
        // rounded-xl       -   12px
        // rounded-2xl      -   16px
        // rounded-3xl      -   24px

        // Large FAB
        // ----------------
        // Container height: 96dp
        // Container shape: 28dp
        // Container width: 96dp
        // Padding: 16dp
        // Icon size: 36dp

        // Medium FAB
        // ----------------
        // Container height: 56dp
        // Container shape: 16dp corner radius
        // Container width: 56dp
        // Padding: 16dp
        // Icon size: 24dp

        // Small FAB
        // ----------------
        // Layout attribute: Value
        // Container height: 40dp
        // Container shape: 12dp corner radius
        // Container width: 40dp
        // Padding between small FAB and FAB: 24dp
        // Padding between small FABs: 16dp
        // Icon size: 24dp

        // Fab, Extended Fab - Small
        {
          intent: [
            'fab',
            'extended-fab',
          ],
          size: 'small',
          class: [
            'h-[40px]',
            'rounded-xl',
            'icon:w-[24px]',
            'icon:h-[24px]',
          ],
        },
        // Fab, Extended Fab - Medium
        {
          intent: [
            'fab',
            'extended-fab',
          ],
          size: 'medium',
          class: [
            'h-[56px]',
            'rounded-2xl',
            'icon:w-[24px]',
            'icon:h-[24px]',
          ],
        },
        // Fab, Extended Fab - Large
        {
          intent: 'fab',
          size: 'large',
          class: [
            'h-[96px]',
            'w-[96px]',
            'rounded-3.5xl',
            'w-fit',
            'icon:w-[36px]',
            'icon:h-[36px]',
          ],
        },
        {
          intent: [
            'elevated',
            'filled',
            'filled-tonal',
            'outlined',
            'text',
            'icon',
            'fab',
            'extended-fab'
          ],
          class: [
            'before:z-0',
            'before:opacity-0',
            'before:transition-all',
            'before:duration-180',
            'before:ease-in-out',
            'before:content',
            'before:absolute',
            'before:inset-0',
            'before:bg-primary',
            'before:opacity-0',
            'before:pointer-events-none',
            'before:z-0',
            'before:transition-all',
            'before:duration-180',
            'hover:before:opacity-[0.08]',
            'hover:before:active:opacity-[0.18]',
            'active:before:opacity-[0.16]',
            'focus-visible:before:opacity-[0.12]',
          ],
        },
        {
          intent: [
            'fab',
            'extended-fab',
            'filled',
            'icon'
          ],
          class: [
            'before:bg-primary/50',
          ]
        }
      ],
      defaultVariants: {
        intent: 'filled',
        size: 'small',
      },
    }
)


const buttonClasses = buttonVariants({
  intent: intent.value,
  size: size.value,
  stretch: stretch.value,
})
</script>

<template>
  <button :class="buttonClasses" :data-intent="intent" :data-size="size" class="common-button">
    <slot name="prefix-icon">
      <Icon v-if="prefixIcon" :name="prefixIcon"/>
    </slot>
    <span class="flex">
      <slot/>
    </span>
    <slot name="suffix-icon">
      <Icon v-if="suffixIcon" :name="suffixIcon"/>
    </slot>
  </button>
</template>
