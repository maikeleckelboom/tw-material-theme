<script lang="ts" setup>

import {tv} from "tailwind-variants";

const {pRoutes, sRoutes} = useNavigationStore()

const pickFour = (routes: any[], result: any[] = []) => {
  for (let i = 0; i < 4; i++)
    result.push(routes[i])
  return result
}

const items = pickFour([
  ...pRoutes,
  ...sRoutes
])


const {base} = tv({
  base: [
    'fixed',
    'inset-x-0',
    'bottom-0',
    'z-20',
    'h-20',
    'w-full',
    'bg-surface',
    'grid',
    'grid-cols-4',
    'pt-3',
    'pb-4',
    'bg-surface-container'
  ]
})
// active indicator 32x64

</script>

<template>
  <ul :class="base">
    <li v-for="item in items" :key="item.label">
      <NavigationItem v-bind="item">
        <template #label>
          <span class="label-text text-label-medium text-on-surface-variant">
            {{ item.label }}
          </span>
        </template>
      </NavigationItem>
    </li>
  </ul>
</template>
