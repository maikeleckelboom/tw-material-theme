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
  'button:cursor-pointer',
  'button:flex-1',
  'icon:w-[18px]',
  'icon:h-[18px]'], {
  variants: {
    size: {
      sm: [
        'h-[36px]',
        'text-[15px]',
      ],
      md: [
        'h-[48px]',
        'text-title-medium'
      ],
      lg: [
        'h-[48px]',
        'text-[16px]'
      ]
    }
  }
})

const classList = computed(() => twMerge(createClassList(props)))

const current = ref<string>('')

const slots = useSlots()

const slotItems = computed(() => {
  const slotCols = slots.columns?.() ?? []
  if (slotCols.length) return slotCols
  const defaultSlot = slots.default?.() ?? []
  if (defaultSlot.length) return defaultSlot
  return []
})


const columnNames = computed(() => {
  const items = unref(slotItems)
  if (!items.length) return []
  return items.map((item) => {
    if ('props' in item) {
      return item.props!.name
    }
    return ''
  })
})

const activeColumnName = computed(() => {
  const items = unref(slotItems)
  if (!items.length) return ''
  const key = unref(current)
  if (!key) return ''

  const index = unref(columnNames).indexOf(key)
  if (index === -1) return ''
  return items[index].props!.name
})

watchEffect(() => {
  unref(slotItems)?.forEach((item, index) => {
    if ('props' in item) {
      item.props!.onClick = () => current.value = item.props!.name
    }
  })
})
</script>

<template>
  <div :class="[classList, current === activeColumnName ? 'active' : '']">
    <slot name="columns" v-bind="{current}"/>
  </div>
  <div class="flex flex-row w-full">
    <slot :name="current" v-bind="{current}"/>
  </div>
</template>
