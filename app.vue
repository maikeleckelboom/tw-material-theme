<script lang="ts" setup>
const onErrorCaptured = (error: Error) => {
  console.error(error);
}
</script>

<template>
  <NuxtErrorBoundary v-on:error="onErrorCaptured">
    <NuxtLayout>
      <NuxtLoadingIndicator/>
      <NuxtPage/>
    </NuxtLayout>
  </NuxtErrorBoundary>
</template>
