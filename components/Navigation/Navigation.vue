<script lang="ts" setup>
import {cva} from "class-variance-authority";

type Item = {
  label: string
  icon: string
  href?: string
  active?: boolean
}

interface Props {
  items: Item[]
}

const props = defineProps<Props>()

const {items} = toRefs(props)

const createClassList = cva([], {
  variants: {
    type: {}
  }
}) as (p: Props) => string

const classList = computedEager(() => createClassList(props))
</script>

<template>
  <ul :class="classList"
      data-component="Navigation">
    <li v-for="item in items"
        :key="item.label">
      <NavigationItem v-bind="item"/>
    </li>
  </ul>
</template>
