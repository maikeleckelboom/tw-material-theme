<script lang="ts" setup>
const viewport = useViewport()

watch(viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})

/**
 *    desktop: 1024,
 *       desktopMedium: 1280,
 *       desktopWide: 1600,
 *       mobile: 320,
 *       mobileMedium: 375,
 *       mobileWide: 425,
 *       tablet: 768,
 */

</script>

<template>
  <div>
    <div v-if="viewport.isLessThan('tablet')">Should render only on mobile</div>
    <div v-else>Current breakpoint: {{ viewport.breakpoint }}</div>
  </div>
</template>
