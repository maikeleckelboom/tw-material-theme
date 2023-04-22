<script lang="ts" setup>
const runtime = computed(() => {
  const {public: {theme}} = useRuntimeConfig()
  return theme
})

// const {theme} = useTheme(runtime.value)
</script>
<template>
  <div class="p-2 flex justify-center w-full h-full">
    <FormColorMode/>
  </div>
</template>
