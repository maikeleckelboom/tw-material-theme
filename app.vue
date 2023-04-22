<script lang="ts" setup>
const color = useColorGradient()
const onErrorCaptured = (error: Error) => {
  console.error(error);
}
</script>

<template>
  <NuxtErrorBoundary
      v-on:error="onErrorCaptured">
    <NuxtLayout>
      <NuxtLoadingIndicator :color="color"/>
      <NuxtPage/>
    </NuxtLayout>
  </NuxtErrorBoundary>
</template>
