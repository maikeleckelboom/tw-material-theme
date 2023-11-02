<script lang="ts" setup>
const runtime = computed(() => {
  const {public: {theme}} = useRuntimeConfig()
  return theme
})

</script>
<template>
  <div class="p-4">
    <pre class="text-xs">{{ runtime }}</pre>
  </div>
</template>
