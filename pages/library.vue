<script lang="ts" setup>
const runtime = computed(() => {
  const {public: {theme}} = useRuntimeConfig()
  return theme
})

// const {theme} = useTheme(runtime.value)
</script>
<template>
  <div>
    <pre>{{ runtime }}</pre>
  </div>
</template>
