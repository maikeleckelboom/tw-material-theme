<script lang="ts" setup>
import {cva} from "class-variance-authority"
import Badge from "~/components/Navigation/Badge.vue";
import {useDragPercentageStore} from "~/stores/useDragPercentageStore";

interface Props {
  label?: string
  icon?: string | string[]
  href?: string
  active?: boolean
  badge?: (string | number) | { value: (string | number), label: string }
}

const props = withDefaults(defineProps<Props>(), {})

const {label, icon, href, badge, active} = toRefs(props)

const componentName = shallowRef(href?.value ? resolveComponent('NuxtLink') : 'button')

const componentBinds = computedEager(() => {
  if (!href?.value) return {}
  return {href: href.value}
})

const routerLinkClassList = computedEager(() => (cva([
  'relative',
  'w-full',
  'items-center',
  'h-[56px]',
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
  'after:top-0',
  'after:w-full',
  '@[150px]:after:top-0',
  '@[150px]:after:h-full',
  '@[150px]:icon:top-0',
  'icon:relative',
  'icon:top-1',
  'after:h-[32px]',
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
  },
}) as (p: Props) => string)(props))

const {percentage} = storeToRefs(useDragPercentageStore())
const opacity = computed(() => {
  if (percentage.value < 0.5) return 0
  return (percentage.value - 0.5) * 4
})
</script>

<template>
  <component :is="componentName" :class="routerLinkClassList" v-bind="componentBinds">
    <slot>
      <span :class="[
          'grid',
          '@[150px]:grid-cols-[auto,1fr]',
          '@[150px]:items-center',
          '@[150px]:justify-start',
          '@[150px]:px-4',
          '@[150px]:gap-x-4',
          '@[150px]:place-items-start',
          'items-start',
          'relative',
          'place-items-center',
          'px-0',
          'h-[56px]',
          'gap-1',
      ]">
        <slot name="icon" v-bind="{icon}">
          <Icon :name="Array.isArray(icon) ? active && icon.length > 1 ? icon.at(1) : icon.at(0) : icon"
                class="h-4 w-4"/>
        </slot>
        <span :class="['text-label-large','text-on-surface-variant']" class=" label-text">
          <slot name="label" v-bind="{label}">{{ label }}</slot>
        </span>
        <Badge v-if="badge"
               :class="[
                   'absolute',
                   'text-on-error',
                   'bg-error',
                   'right-[24px]',
                   'w-[12px]',
                   '@[150px]:bg-transparent',
                   '@[150px]:text-on-surface',
                   '@[150px]:left-auto'
               ]"
               :style="{
                  opacity: opacity
               }"
               :value="badge">
        </Badge>
      </span>
    </slot>
  </component>
</template>
