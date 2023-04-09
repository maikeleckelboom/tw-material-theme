<script lang='ts' setup>
import {cva, VariantProps} from "class-variance-authority"
// Large FAB
// ----------------
// Container height: 96dp
// Container shape: 28dp
// Container width: 96dp
// Padding: 16dp
// Icon size: 36dp
// ----------------
// Medium FAB
// ----------------
// Container height: 56dp
// Container shape: 16dp corner radius
// Container width: 56dp
// Padding: 16dp
// Icon size: 24dp
// ----------------
// Small FAB
// ----------------
// Layout attribute: Value
// Container height: 40dp
// Container shape: 12dp corner radius
// Container width: 40dp
// Padding between small FAB and FAB: 24dp
// Padding between small FABs: 16dp
// Icon size: 24dp
// ----------------
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

type Variant = 'primary' | 'secondary' | 'tertiary' | 'surface' | undefined

type Container = 'contained' | 'standard'


// style: outlined, filled, filled-tonal, elevated, none
// size: small, medium, large
// intent: text, icon, fab, extended-fab, (utlined, filled, filled-tonal, elevated)
// variant: primary, secondary, tertiary, surface

interface Props {
  intent?: Intent
  size?: Size
  prefixIcon?: string
  suffixIcon?: string
  stretch?: boolean
  variant?: Variant
  container?: Container
  state?: 'selected' | 'unselected'
}

const props = withDefaults(defineProps<Props>(), {
  intent: 'filled',
  size: 'medium',
  stretch: false,
  container: 'standard',
  variant: undefined,
  state: undefined
})

const {
  intent,
  size,
  prefixIcon,
  suffixIcon,
  stretch,
  variant,
  container,
  state
} = toRefs(props)

const buttonVariants = cva(
    [
      'flex',
      'items-center',
      'justify-center',
      'gap-3',
      'relative',
      'overflow-hidden',
      'shrink-0',
      'label-text:text-ellipsis',
      'label-text:font-semibold',
      'label-text:capitalize',
      'label-text:shrink-0',
      'icon:shrink-0',
      'shadow-xs',
      'before:z-0',
      'before:opacity-0',
      'before:transition-all',
      'before:duration-180',
      'before:ease-in',
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
    {
      variants: {
        state: {
          // todo: CHANGE OR DELETE (did this very late at night)
          selected: [
            'before:opacity-[0.12]',
            'before:z-1',
          ],
          unselected: [
            // Look-up https://m3.material.io/components/buttons/icons#specs
            // for the correct values

          ],
        },
        stretch: {
          true: 'w-full',
          false: 'w-fit',
        },
        intent: {
          elevated: [
            'shadow-md',
            'shadow-shadow',
            'bg-surface-level-2',
            'text-on-surface',
            'rounded-full',
            'font-semibold',
            'shadow-shadow',
            'hover:shadow-lg',
            'active:shadow-md',
            'text-primary'
          ],
          filled: [
            'bg-primary',
            'text-on-primary',
            'rounded-full',
          ],
          'filled-tonal': [
            'bg-secondary-container',
            'text-on-secondary-container',
            'rounded-full',
          ],
          outlined: [
            'bg-transparent',
            'text-primary',
            'border-thin',
            'border-outline',
            'rounded-full',
          ],
          text: [
            'bg-transparent',
            'text-primary',
            'rounded-full',
          ],
          icon: [
            'text-primary',
            'w-fit',
            'h-fit',
            'aspect-square',
            'rounded-full',
            'before:bg-inverse-primary',
          ],
          fab: [
            'aspect-square',
          ],
          'extended-fab': [],
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
            'px-5',
          ],
          large: [
            'text-lg',
            'py-3',
            'px-6',
          ],
        },
        variant: {
          primary: '',
          secondary: '',
          tertiary: '',
          surface: '',
        },
        container: {
          standard: '',
          contained: []
        },
      },
      compoundVariants: [
        {
          intent: ['fab', 'extended-fab'],
          variant: 'primary',
          class: ['bg-primary-container', 'text-on-primary-container'],
        },
        {
          intent: ['fab', 'extended-fab'],
          variant: 'secondary',
          class: ['bg-secondary-container', 'text-on-secondary-container'],
        },
        {
          intent: ['fab', 'extended-fab'],
          variant: 'tertiary',
          class: ['bg-tertiary-container', 'text-on-tertiary-container'],
        },
        {
          intent: ['fab', 'extended-fab'],
          variant: 'surface',
          class: ['bg-surface-level-2', 'text-on-surface'],
        },

        // Variants can only be applied
        // when container is contained
        // or intent is fab or extended-fab
        {
          intent: 'icon',
          container: 'contained',
          variant: 'primary',
          class: ['bg-primary-container', 'label-text:text-on-primary-container'],
        },
        {
          intent: 'icon',
          container: 'contained',
          variant: 'secondary',
          class: ['bg-secondary-container', 'label-text:text-on-secondary-container'],
        },
        {
          intent: 'icon',
          container: 'contained',
          variant: 'tertiary',
          class: ['bg-tertiary-container', 'label-text:text-on-tertiary-container'],
        },
        {
          intent: 'icon',
          container: 'contained',
          variant: 'surface',
          class: ['bg-surface-level-2', 'label-text:text-primary'],
        },

        // Icon Sizes for each intent
        {
          intent: 'icon',
          size: 'small',
          class: [
            'icon:w-[24px]',
            'icon:h-[24px]',
          ],
        },
        {
          intent: 'icon',
          size: 'medium',
          class: [
            'icon:w-[34px]',
            'icon:h-[34px]',
          ],
        },
        {
          intent: 'icon',
          size: 'large',
          class: [
            'icon:w-[48px]',
            'icon:h-[48px]',
          ],
        },


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
        {
          intent: [
            'fab',
            'extended-fab',
          ],
          size: 'medium',
          class: [
            'h-[56px]',
            'rounded-2xl',
            'icon:w-[32px]',
            'icon:h-[32px]',
          ],
        },
        {
          intent: [
            'fab',
            'extended-fab',
          ],
          size: 'large',
          class: [
            'h-[96px]',
            'w-[96px]',
            'rounded-3.5xl',
            'w-fit',
            'icon:w-[40px]',
            'icon:h-[40px]',
          ],
        },
      ],
    }
)
export type TypeButtonVariantProps = VariantProps<typeof buttonVariants>;
type Optional<T> = { [P in keyof T]?: T[P] };

type ButtonProps = Optional<TypeButtonVariantProps> & {
  intent?: Intent;
  size?: Size;
  stretch?: boolean;
  container?: Container;
  variant: Variant
  state?: string
}

const buttonVariantInput: ButtonProps = {
  intent: intent.value,
  size: size.value,
  stretch: stretch.value,
  container: container.value,
  variant: variant.value,
  state: state.value,
}

const buttonClasses = buttonVariants(buttonVariantInput)

</script>

<template>
  <button :class="buttonClasses"
          class="common-button">
    <slot name="prefix-icon">
      <Icon v-if="prefixIcon" :name="prefixIcon"/>
    </slot>
    <span class="label-text">
      <slot/>
    </span>
    <slot name="suffix-icon">
      <Icon v-if="suffixIcon" :name="suffixIcon"/>
    </slot>
  </button>
</template>
