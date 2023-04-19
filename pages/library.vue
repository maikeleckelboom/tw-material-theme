<script lang="ts" setup>

const runtime = computed(() => {
  const {public: {theme}} = useRuntimeConfig()
  return theme
})

// const {theme} = useTheme(runtime.value)
</script>
<template>
  <div class="p-4">
    <h1>Library</h1>
    <pre>{{ runtime.customColors }}</pre>
    <pre>{{ runtime.colors }}</pre>
  </div>
</template>
