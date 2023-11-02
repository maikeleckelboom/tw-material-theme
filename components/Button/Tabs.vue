<script lang="ts" setup>
import {cva} from "class-variance-authority"
import {capitalize} from "@vue/runtime-core"


/**
 * API Proposal
 * -------------
 *
 * type Column =
 *     | string
 *     | [string, string?]
 *     | [string, string?, [string?, string?]?]
 *     | [string, [string, string?], string?];
 *
 * type Columns = Column[]
 *
 * const allPossibleTabColumnStructures: Column[] = [
 *   'label',
 *   ['label', 'tooltip'],
 *   ['label', 'tooltip', ['icon', 'iconActive']],
 *   ['label', 'tooltip', ['icon']],
 *   ['label', ['icon', 'iconActive']],
 *   ['label', ['icon'], 'tooltip'],
 *   ['label', ['icon', 'iconActive'], 'tooltip'],
 * ];
 *
 */

type Columns = Array<string | [string, string?, string?]>;


interface Props {
  size?: 'sm' | 'md' | 'lg',
  type?: 'primary' | 'secondary',
  columns?: Columns,
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
})

const hasIcon = computed(() => {
  if (props?.columns?.length && props.columns.some(col => Array.isArray(col) && col.length > 1)) {
    return true
  }
  return unref(slotItems).some((item, index) => {
    if ('props' in item) {
      return !!item.props?.icon
    }
    return false
  })
})


const slots = useSlots()

const slotItems = computed(() => {
  const slotCols = slots.columns?.() ?? []
  if (slotCols.length) return slotCols
  const defaultSlot = slots.default?.() ?? []
  if (defaultSlot.length) return defaultSlot
  return []
})

const current = ref('schemes')


const getColumnLabel = (column: string | [string, string?, string?]) => {
  if (typeof column === 'string') {
    return capitalize(column);
  } else if (Array.isArray(column) && column.length > 0) {
    const [label] = column;
    return capitalize(label);
  }
  return column;
};

const columnNames = computed(() => {
  const {columns} = props;
  if (columns?.length) {
    return columns.map((column) => getColumnLabel(column));
  }
  return unref(slotItems).map((item, index) => {
    return 'props' in item ? item.props!.name : String(index);
  });
});


const activeColumnName = computed(() => {
  const items = unref(slotItems)
  if (!items.length) return ''
  const index = columnNames.value.indexOf(current.value)
  return items[index].props?.name ?? ''
})

watchEffect(() => {
  unref(slotItems)?.forEach((item) => {
    if ('props' in item) {
      item.props!.onClick = () => current.value = item.props!.name
    }
  })
})

const setActive = (column: string | string[]) => {
  const name = Array.isArray(column) ? column.at(0) : column
  current.value = name!.toLowerCase()
}

// TODO: Make a wrapper around cva to make it easier to use

const createClassList: (p: {
  icon?: boolean,
  active?: boolean,
}) => string = cva([
  'flex',
  'flex-row',
  'relative',
  'w-full',
  'button:flex-1',
  'text-title-small',
], {
  variants: {
    icon: {
      true: [
        'h-[64px]',
        'icon:h-6',
        'icon:w-6',
        'icon:text-on-surface-variant',

      ],
      false: [
        'h-[48px]',
      ]
    },
    active: {
      true: [
        'icon:text-primary',
      ],
      false: [],
    },
  },
  compoundVariants: []
})

const classList = computed(() => createClassList({
  ...props,
  icon: hasIcon.value,
  active: current.value === activeColumnName.value
}))

const classVariantsActiveIndicator = cva([
  'absolute',
  'bottom-0',
  'bg-primary',
  'h-[3px]',
  'z-10',
  'rounded-tl-3xl',
  'rounded-tr-3xl',
], {
  variants: {
    type: {
      primary: [],
      secondary: [],
    },
  },
  compoundVariants: []
}) as (props: {
  type?: 'primary' | 'secondary',
  active?: boolean,
}) => string

const activeIndicatorClassList = computed(() => classVariantsActiveIndicator({
  type: props.type,
  active: current.value === activeColumnName.value
}))


const columnRefs = ref<HTMLElement[]>([])

const columnRefsLabel = computed(() => {
  return columnRefs.value?.map(el => Array
      .from(el.children)
      .find(child => child.classList.contains('label-text'))
  ) ?? []
})


const isMounted = useMounted()

const indicatorContext = reactive({
  offsetLeft: 0,
  offsetWidth: 0,
})

const updateIndicatorContext = () => {

  const index = props.columns?.findIndex(col => Array.isArray(col)
      ? col.at(0) === current.value
      : col === current.value)

  if (!isMounted.value || (typeof index === 'undefined' || index === -1)) {
    return {
      offsetWidth: 0,
      offsetLeft: 0
    }
  }

  let {
    offsetWidth,
    offsetLeft,
    offsetParent
  } = columnRefsLabel.value[index] as HTMLElement


  if (offsetParent instanceof HTMLElement) {
    offsetLeft = offsetParent.offsetLeft + offsetLeft
  }

  return {
    offsetWidth,
    offsetLeft
  }
}

const activeIndicatorStyle = computed(() => ({
  left: `${indicatorContext.offsetLeft}px`,
  width: `${indicatorContext.offsetWidth}px`,
}))


const tabs = ref<HTMLElement>()
const indicator = ref<HTMLElement>()

const scope = effectScope()

scope.run(() => {
  watchEffect(() => {
    const {offsetWidth, offsetLeft} = updateIndicatorContext()
    indicatorContext.offsetWidth = offsetWidth
    indicatorContext.offsetLeft = offsetLeft
  })

  whenever(tabs, () => useResizeObserver(tabs, ([_entry]) => {
    const {offsetWidth, offsetLeft} = updateIndicatorContext()
    indicatorContext.offsetWidth = offsetWidth
    indicatorContext.offsetLeft = offsetLeft
  }))
})

</script>

<template>
  <div :class="classList">
    <slot name="columns" v-bind="{current}">
      <button v-for="(column, key) in columns" :key="key"
              :ref="el => columnRefs[key] = el"
              v-ripple
              :class="{'current': Array.isArray(column) && column.at(0) === current || column === current}"
              class="relative overflow-hidden outline-none flex gap-y-1 flex-col items-center justify-center px-4"
              v-on:click="setActive(column)">
        <span v-if="hasIcon" class="pointer-events-none relative z-10 flex items-center justify-center">
          <Icon v-if="(current === column.at(0))" :name="column.at(2) ?? column.at(1)"/>
          <Icon v-else :name="column.at(1)"/>
        </span>
        <span class="pointer-events-none relative z-10 label-text">{{
            capitalize(Array.isArray(column) ? column.at(0) : column)
          }}</span>
      </button>
      <div ref="indicator"
           :class="activeIndicatorClassList"
           :style="activeIndicatorStyle"
           class="transition-all duration-300"
           data-component="ActiveIndicator"
      />
    </slot>
  </div>
  <div ref="tabs" class="flex w-full flex-col overflow-y-auto scrollbar">
    <slot :name="current" v-bind="{current}"/>
  </div>
</template>

<style lang="postcss" scoped>
button {
  @apply transition-all hover:bg-surface-level-2 hover:text-on-surface-variant hover:transition-all active:bg-surface-level-3;

  &.current {
    @apply text-primary icon:text-primary;
  }
}
</style>
