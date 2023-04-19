<script lang="ts" setup>
import {cva} from "class-variance-authority"
import Badge from "~/components/Navigation/Badge.vue";

interface Props {
  label?: string
  icon?: string | string[]
  href?: string
  active?: boolean
  badge?: (string | number) | { value: (string | number), label: string }
  type?: 'drawer' | 'rail' | 'bar'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'drawer'
})

const {label, icon, href, badge, active, type} = toRefs(props)

const classList = computedEager(() => (cva([
  'w-full',
  'cursor-pointer',
  'relative',
  'grid',
  'after:content',
  'after:top-0',
  'after:left-0',
  'after:right-0',
  'after:absolute',
  'after:pointer-events-none',
  'after:bg-secondary-container',
  'after:transition-all',
  'after:duration-200',
  'after:rounded-full',
  'after:z-0',
  'icon:h-[24px]',
  'icon:w-[24px]',
  'icon:z-10',
  'label-text:z-10',

], {
  variants: {
    active: {
      true: [
        'after:opacity-[0.60]',
        'after:scale-100',
        'hover:after:opacity-[0.80]',
      ],
      false: [
        'after:opacity-0',
        'after:scale-50',
        'hover:after:scale-100',
        'hover:after:opacity-[0.40]',
      ],
    },
    type: {
      drawer: [
        'h-[58px]',
        'rounded-full',
        'after:w-full',
        'after:h-full',
        'after:bottom-0',
      ],
      rail: [
        'w-[56px]',
        'min-h-[56px]',
        'py-2',
        'justify-center',
        'after:top-[4px]',
        'after:scale-100',
        'after:h-[32px]',
        // 'after:w-[56px]',
      ],
    }
  },
  compoundVariants: [
    {
      type: 'drawer',
      active: true,
      class: []
    },
    {
      type: 'rail',
      active: true,
      class: []
    }
  ]
}) as (p: Props) => string)(props))

const labelTextClassList = computedEager(() => (cva([], {
  variants: {
    type: {
      drawer: [
        'leading-tight',
        'tracking-tight',
        'text-[15px]',
      ],
      rail: [
        'text-label-medium',
        'text-on-surface-variant',
        'relative',
        'text-ellipsis',
        'overflow-hidden',
        'max-w-[80px]',
        'mt-0.5',
      ],
    }
  }
}) as (p: Props) => string)(props))

const innerContainerClassList = computedEager(() => (cva([
  'items-center',
], {
  variants: {
    type: {
      drawer: [
        'h-full',
        'p-4',
        'px-[16px]',
        'grid',
        'grid-cols-[24px,_1fr,_auto]',
        'gap-x-[14px]',
      ],
      rail: [
        'flex',
        'flex-col',
        'w-full',
        'gap-[4px]',
      ],
    }
  }
}) as (p: Props) => string)(props))

// TODO: Extract Badge component
const badgeClassList = computedEager(() => (cva([
  'px-[2px] py-[2px]',
  'rounded-[28px]',
  'tabular-nums',
  'z-10',
  'text-label-small',
  'leading-tight',
  'min-w-[24px]',
  'tracking-wide',

  'flex',
  'items-center',
  'justify-center',
], {
  variants: {
    type: {
      drawer: [
        'z-10',
        'flex',
        'h-fit',
        'w-fit',
        'items-center',
        'justify-center',
        'relative',
      ],
      rail: [
        'bg-error',
        'text-on-error',
        'absolute',
        'right-0',
        'top-0',
        'left-auto',
        'text-end',
        'transform',
      ],
    }
  }
}) as (p: Props) => string)(props))


const componentName = shallowRef(href?.value ? resolveComponent('NuxtLink') : 'button')

const componentBinds = computedEager(() => {
  if (!href?.value) return {}
  return {href: href.value}
})
</script>

<template>
  <component :is="componentName"
             :class="classList"
             data-component="NavigationItem"
             v-bind="componentBinds">
    <slot>
      <span :class="innerContainerClassList">
      <slot name="icon" v-bind="{icon}">
        <Icon :name="Array.isArray(icon) ? active && icon.length > 1 ? icon.at(1) : icon.at(0) : icon"
              class="h-4 w-4"/>
      </slot>
      <span :class="labelTextClassList" class="label-text">
          <slot name="label" v-bind="{label}">
            {{ label }}
          </slot>
        </span>
        <Badge v-if="badge" :parent="type" :value="badge"/>
      </span>
    </slot>
  </component>
</template>
