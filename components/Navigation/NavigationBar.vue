<script lang="ts" setup>
import {cva} from "class-variance-authority"
import {useSideSheetStore} from "#imports";


const navigationStore = useNavigationStore()
const items = computed(() => navigationStore.routes)

const sideSheetStore = useSideSheetStore()
const onClick = () => sideSheetStore.open()

const createClasses = cva([
  'fixed',
  'inset-x-0',
  'bottom-0',
  'z-30',
  'h-20',
  'w-full',
  'bg-surface',
  'grid',
  'grid-cols-4',
  'pt-3',
  'pb-4',
])()
</script>

<template>
  <ul :class="createClasses">
    <li v-for="item in items" :key="item.label">
      <NavigationItem v-bind="item">
        <template #label>
          <span class="label-text text-label-medium text-on-surface-variant">
            {{ item.label }}
          </span>
        </template>
      </NavigationItem>
    </li>
    <li>
      <NavigationItem
          @click="onClick"
          v-bind="{icon: ['ic:round-menu-open', 'ic:round-menu-open']}">
        <template #label>
          <span class="label-text text-label-medium text-on-surface-variant">
            Color Menu
          </span>
        </template>
      </NavigationItem>
    </li>
  </ul>
</template>
