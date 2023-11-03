<script lang="ts" setup>

const isDarkMode = computed(() => {
  const colorMode = useColorMode()
  return colorMode.value === 'dark'
})

const colorSchemes = computed(() => joinSchemes(useLightScheme(), useDarkScheme()))

const store = useThemeStore()

const {colorSchemePanel} = storeToRefs(store)
</script>

<template>
  <div v-for="(row, key) in colorSchemePanel"
       :key="key"
       :class="{
          'cursor-pointer': row.isKey
       }"
       class="all:pointer-events-none relative flex flex-shrink-0 items-center gap-x-8 overflow-hidden px-5 py-2.5 h-[56px] hover:bg-surface-level-2"
  >
    <div class="relative flex flex-row">
      <div :class="isDarkMode ? 'z-0 scale-90' : 'z-20 scale-100'"
           :style="{backgroundColor: isDarkMode ? row.lightColor : row.darkColor}"
           class="relative rounded-full border-2 w-[24px] h-[24px] border-surface"
      />
      <div :class="isDarkMode ? 'z-20 scale-100' : 'z-0 scale-90'"
           :style="{backgroundColor:  isDarkMode ? row.darkColor : row.lightColor}"
           class="absolute left-4 rounded-full border-2 w-[24px] h-[24px] border-surface"
      />
    </div>
    <div class="flex flex-1 flex-col">
      <p class="truncate text-title-small">
        {{ row.name }}
      </p>
      <p class="flex flex-row flex-nowrap gap-1 text-xs font-normal text-on-secondary-container/60">
        {{ row.lightColor }}
        <span class="text-on-secondary-container/60">/</span>
        {{ row.darkColor }}
      </p>
    </div>
    <div class="flex justify-self-end">
      <Icon v-if="row.isKey"
            :class="row.name.toLowerCase() === 'primary'
             ? 'text-primary'
             : 'text-on-secondary-container'"
            class="h-4 w-4"
            name="ic:baseline-key"
      />
    </div>
  </div>
</template>
