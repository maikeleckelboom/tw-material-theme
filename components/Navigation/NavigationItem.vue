<script lang="ts" setup>
import {cva} from "class-variance-authority"
import Badge from "~/components/Navigation/Badge.vue"
import {useRailDrawerStore} from "~/stores/useRailDrawerStore"
import {tv} from "tailwind-variants";
import {Ref} from "vue";

interface Props {
  label?: string
  icon?: string | string[]
  path?: string
  active?: boolean
  badge?: (string | number) | { value: (string | number), label: string }
}

const props = withDefaults(defineProps<Props>(), {})

const {label, icon, path, badge, active} = toRefs(props)

const componentName = shallowRef(path?.value ? resolveComponent('NuxtLink') : 'button')

const componentBinds = computedEager(() => {
  if (!path?.value) return {}
  return {href: path.value}
})

const {percentage, context} = storeToRefs(useRailDrawerStore())

const opacity = computed(() => {
  if (percentage.value < 0.5) return 0
  return (percentage.value - 0.5) * 4
})

const createClassList = tv({
  slots: {
    base: [
      'relative',
      'rounded-t-lg',
      'rounded-b-lg',
      'w-full',
      // 'min-h-14',
      'py-8',
      'h-full',
      'outline-none',
      'icon:relative',
      'icon:top-1',
      'icon:h-6',
      'icon:w-6',
      'icon:z-20',
      'label-text:z-10',
      'label-text:text-label-small',


      'after:h-full',
      'after:z-10',
      'after:top-0',
      'after:left-[calc(50%_-_32px)]',
      'after:mx-auto',
      'after:absolute',
      'after:pointer-events-none',
      'after:bg-secondary-container',
      'after:transition-all',
      'after:duration-200',
      'after:rounded-full',
      'after:w-full',
      'after:max-w-[64px]',
      'after:max-h-[32px]',

      '@[150px]:after:max-h-full',
      '@[150px]:after:max-w-full',
      '@[150px]:after:left-0',
      '@[150px]:after:top-0',
      '@[150px]:icon:top-0',
      '@[150px]:label-text:text-label-medium',
      '@[150px]:overflow-hidden',
      '@[150px]:rounded-full',

      'group',
    ],
    container: [
      'grid',
      'items-start',
      'relative',
      'overflow-hidden',
      'place-items-center',
      '@[150px]:rounded-3.5xl',
      'px-0',
      'h-14',
      'gap-1',
      'z-30',
      'all:pointer-events-none',
      '@[150px]:grid-cols-[auto,1fr]',
      '@[150px]:items-center',
      '@[150px]:justify-start',
      '@[150px]:px-4',
      '@[150px]:gap-x-4',
      '@[150px]:gap-y-0',
      '@[150px]:place-items-start',
    ],
    badge: [
      'absolute',
      'text-on-error',
      'bg-error',
      'p-2',
      'right-[24px]',
      'w-[12px]',
      '@[150px]:bg-transparent',
      '@[150px]:text-on-surface',
      '@[150px]:left-auto'
    ]
  },
  variants: {
    active: {
      false: {
        base: [
          'icon:text-on-surface',
          'after:opacity-0',
          'after:scale-50',
          'hover:after:scale-100',
          'hover:after:opacity-[0.40]',
          'hover:text-on-secondary-container',
          'hover:icon:text-on-secondary-container',
          'focus-visible:after:opacity-[0.6]',
          'focus-visible:after:bg-tertiary-container',
          'focus-visible:after:scale-100',
        ]
      },
      true: {
        base: [
          'text-on-secondary-container',
          'icon:text-on-secondary-container',
          'after:opacity-[0.6]',
          'after:scale-100',
          'hover:after:opacity-[0.80]',
        ]
      },
    },
  },
})


const {base, container, badge: badgeV} = createClassList(props)

const el = useCurrentElement() as Ref<HTMLElement>

const containerQueryActive = ref<boolean>(false)

useResizeObserver(el, () => {
  const {width} = el.value.getBoundingClientRect()
  containerQueryActive.value = width >= (150 - (12 * 2))
})
</script>

<template>
  <component :is="componentName" :class="base()" tabindex="0" v-bind="componentBinds">
    <slot>
      <span v-ripple="containerQueryActive" :class="container()">
        <slot name="icon" v-bind="{icon}">
          <Icon :name="Array.isArray(icon) ? active && icon.length > 1 ? icon.at(1) : icon.at(0) : icon"
                class="relative z-40 h-4 w-4"/>
        </slot>
        <slot name="label" v-bind="{label}">
          <span class="label-text">
            {{ label }}
          </span>
        </slot>
        <Badge v-if="badge"
               :class="badgeV()"
               :style="{opacity}"
               :value="badge">
        </Badge>
      </span>
    </slot>
  </component>
</template>
