<script lang="ts" setup>
const colorMode = reactive(useColorMode())

const isDark = computed(() => colorMode.value === 'dark' || colorMode.value === 'system')

const toggleColorMode = (): void => {
  colorMode.value = isDark.value ? 'light' : 'dark'
}

defineExpose({
  isDark,
  toggleColorMode
})
</script>

<template>
  <form class="flex px-4 pt-4">
    <label
        class="grid w-fit cursor-pointer grid-flow-col gap-2 rounded-2xl px-4 py-2 place-center active:bg-surface-level-3 text-primary bg-surface-level-1 border-thin border-surface-level-1 hover:bg-surface-level-2"
        v-on:click="toggleColorMode">
      <Icon :name="isDark ? 'ci:moon' : 'ci:sun'" class="h-5 w-5"/>
      <span class="text-sm">{{ !isDark ? 'Light' : 'Dark' }}</span>
    </label>
  </form>
</template>
