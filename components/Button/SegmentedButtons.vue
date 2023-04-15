<script lang="ts" setup>
import {cva} from "class-variance-authority"
import {twMerge} from "tailwind-merge"

interface Props {
  size?: 'sm' | 'md' | 'lg',
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})


const createClassList: (p: Props) => string = cva([
  'flex',
  'flex-row',
  'w-full',
  'nth-1:rounded-tl-3xl',
  'nth-1:rounded-bl-3xl',
  'nth-last-1:rounded-tr-3xl',
  'nth-last-1:rounded-br-3xl',
  'button:border',
  'button:border-outline',
  'button:text-on-surface',
  'button:font-medium',
  'button:cursor-pointer',
  'button:flex',
  'button:flex-1',
  'button:items-center',
  'button:justify-center',
  'button:min-w-[48px]',
  'button:gap-[12px]',
  'icon:w-[18xpx]',
  'icon:h-[18px]',
  'active:bg-secondary-container/30',
], {
  variants: {
    size: {
      sm: [
        'h-[36px]',
        'text-[15px]',
      ],
      md: [
        'h-[40px]',
        'text-[16px]'
      ],
      lg: [
        'h-[48px]',
        'text-[16px]'
      ]
    }
  }
})

const classList = computed(() => twMerge(createClassList(props)))
</script>

<template>
  <div :class="classList">
    <slot>
      <button class="bg-surface hover:bg-secondary-container/30" data-active="true">
        <Icon class="icon" name="ic:check"/>
        Baseline
      </button>
      <button class="bg-surface hover:bg-secondary-container/30">
        Surface
      </button>
      <button class="bg-surface hover:bg-secondary-container/30">
        Extended
      </button>
    </slot>
  </div>
</template>
