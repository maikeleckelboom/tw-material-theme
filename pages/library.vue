<script lang="ts" setup>
const runtime = computed(() => {
  const {public: {theme}} = useRuntimeConfig()
  return theme
})

</script>
<template>
  <div>
    <pre>{{ runtime }}</pre>
  </div>
</template>
