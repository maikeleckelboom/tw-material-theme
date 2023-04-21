<script lang="ts" setup>
const runtime = computed(() => {
  const {public: {theme}} = useRuntimeConfig()
  return theme
})

// const {theme} = useTheme(runtime.value)
</script>
<template>
  <div class="p-12 flex justify-center w-full h-full">

  </div>
</template>
