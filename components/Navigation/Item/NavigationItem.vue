<script lang="ts" setup>
import {cva} from "class-variance-authority"

interface Props {
  label?: string
  icon?: string | string[]
  href?: string
  active?: boolean
  badge?: (string | number) | { value: (string | number), label: string }
}

const props = defineProps<Props>()

const {label, icon, href, badge, active} = toRefs(props)

const createClassList = cva([
  'w-full',
  'rounded-full',
  'cursor-pointer',
  'relative',
  'h-[58px]',
  'after:content',
  'after:absolute',
  'after:pointer-events-none',
  'after:bg-secondary-container',
  'after:transition-all',
  'after:duration-200',

  'after:w-full',
  'after:h-full',

  'after:inset-0',
  'after:rounded-full',


  'hover:after:opacity-[0.40]',
  'hover:after:scale-100',

  'label-text:z-10',

  'icon:h-[24px]',
  'icon:w-[24px]',
  'icon:z-10',


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
      ],
    },
    type: {}
  }
}) as (p: Props) => string

const classList = computedEager(() => createClassList(props))

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
      <span class="
            h-full
            p-4
            px-[16px]
            grid
            grid-cols-[24px,_1fr,_auto]
            gap-x-[14px]
            items-center
            w-full
      ">
        <slot name="icon" v-bind="{icon}">
          <Icon :name="Array.isArray(icon) ? active && icon.length > 1 ? icon.at(1) : icon.at(0) : icon"
                class="h-4 w-4"/>
        </slot>
        <span
            class="
             label-text
             leading-tight
             tracking-tight
             text-[15px]
             text-on-surface-level-1">
          <slot name="label" v-bind="{label}">
            {{ label }}
          </slot>
        </span>
        <span
            class="
              z-10
              flex
              h-fit
              w-fit
              items-center
              justify-center
              rounded-full
              text-xs
              tabular-nums
              leading-tight
              tracking-wide
              p-[4px]"
            data-component="Badge">
          <slot name="badge" v-bind="{badge}">
            {{ badge }}
          </slot>
        </span>
      </span>
    </slot>
  </component>
</template>
