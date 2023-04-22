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
  'button:flex-1',
  'icon:w-[18px]',
  'icon:h-[18px]',
  'is-active:bg-error'
], {
  variants: {
    size: {
      sm: [
        'h-[36px]',
        'text-title-small'
      ],
      md: [
        'h-[48px]',
        'text-title-medium'
      ],
      lg: [
        'h-[48px]',
        'text-title-medium'
      ]
    }
  }
})

const classList = computed(() => twMerge(createClassList(props)))

const slots = useSlots()

const slotItems = computed(() => {
  const slotCols = slots.columns?.() ?? []
  if (slotCols.length) return slotCols
  const defaultSlot = slots.default?.() ?? []
  if (defaultSlot.length) return defaultSlot
  return []
})

const current = ref<string>('schemes')

const columnNames = computed(() => unref(slotItems).map((item, index) => {
  if ('props' in item) {
    return item.props!.name
  }
  return index
}) ?? [])

const activeColumnName = computed(() => {
  const items = unref(slotItems)
  if (!items.length) return ''
  const index = unref(columnNames).indexOf(unref(current))
  return items[index].props?.name ?? ''
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
  <div :class="[classList, current === activeColumnName ? 'is-active' : '']">
    <slot name="columns" v-bind="{current}"/>
  </div>
  <div
      class="flex w-full flex-col overflow-y-auto py-2 scrollbar scrollbar-rounded-xl">
    <slot :name="current" v-bind="{current}"/>
  </div>
</template>
