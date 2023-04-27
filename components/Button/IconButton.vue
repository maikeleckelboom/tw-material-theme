<script lang="ts" setup>
import {cva} from "class-variance-authority";

interface Props {
  type?: 'standard' | 'contained',
  icon?: string | string[],
  title?: string,
  size?: 'small' | 'medium' | 'large',
}

const props = withDefaults(defineProps<Props>(), {
  type: 'standard',
  icon: 'mdi:outline-triangle',
  title: '',
  size: 'medium',
})

const {type, icon, title, size} = toRefs(props)

const createClassList = cva([
  'rounded-full',
  'flex',
  'items-center',
  'justify-center',
  'outline-offset-2',
  'transition-all',
  'relative',
  'overflow-hidden',

  'active:outline-offset-0',
  'active:bg-secondary-container/90',

], {
  variants: {
    type: {
      standard: [
        'bg-transparent',
        'hover:bg-secondary-container',
        'hover:bg-opacity-40',
        'hover:text-secondary-text',
        'text-primary-text',
        'border-transparent',
        'hover:border-secondary-container',
      ],
      contained: [
        'bg-secondary-container',
        'hover:bg-secondary-container/90',
        'hover:bg-opacity-10',
        'hover:text-secondary-text',
        'text-primary-text',
        'border-transparent',
        'hover:border-secondary-container',
        'hover:border-opacity-10',
      ],
    },
    size: {
      small: [
        'w-[36px]',
        'h-[36px]',
        'icon:w-[24px]',
        'icon:h-[24px]'
      ],
      medium: [
        "icon:w-[24px]",
        "icon:h-[24px]",
        'h-[48px]',
        'w-[48px]'
      ],
      large: [
        'icon:w-[24px]',
        'icon:h-[24px]',
        'h-[56px]',
        'w-[56px]'
      ],
    },
  },
}) as (props: Props) => string

const classList = computed(() => createClassList(props))
</script>

<template>
  <button v-ripple :class="classList">
    <span class="pointer-events-none">
      <slot>
        <Icon :name="icon" :title="title"/>
      </slot>
    </span>
  </button>
</template>


