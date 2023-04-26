<script lang="ts" setup>
const isDarkMode = computed(() => {
  const colorMode = useColorMode()
  return colorMode.value === 'dark'
})

const colorSchemes = computed(() => joinSchemes(useLightScheme(), useDarkScheme()))
</script>

<template>
  <div v-for="(color, key) in colorSchemes" :key="key"
       :class="{
          'cursor-pointer': color.isKey
       }"
       class="flex items-center gap-x-8 p-2 px-5 hover:bg-surface-level-2"
  >
    <div class="relative flex flex-row">
      <div :class="isDarkMode ? 'z-0 scale-90' : 'z-20 scale-100'"
           :style="{backgroundColor: color.color}"
           class="relative rounded-full border-2 w-[24px] h-[24px] border-surface"
      />
      <div :class="isDarkMode ? 'z-20 scale-100' : 'z-0 scale-90'"
           :style="{backgroundColor: color.darkColor}"
           class="absolute left-4 rounded-full border-2 w-[24px] h-[24px] border-surface"
      />
    </div>
    <div class="flex flex-col flex-1">
      <p class="text-sm font-medium">
        {{ color.name }}
      </p>
      <p class="text-xs font-normal text-on-secondary-container/60">
        {{ color.color }}
        <span class="text-on-secondary-container/60">/</span>
        {{ color.darkColor }}
      </p>
    </div>
    <div class="flex justify-self-end">
      <Icon v-if="color.isKey"
            :class="color.name.toLowerCase() === 'primary'
             ? 'text-tertiary'
              : 'text-on-secondary-container'"
            class="w-4 h-4"
            name="ic:baseline-key"
      />
    </div>
  </div>
</template>
