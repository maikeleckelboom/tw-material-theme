<script lang="ts" setup>

function createRipple(ev: PointerEvent) {
  const {target, currentTarget} = ev
  if ((currentTarget as HTMLElement).querySelector('.ripple')) {
    // Rm existing ripple ?
  }
  const {offsetTop, offsetLeft, clientHeight, clientWidth} = target as HTMLElement
  const d = Math.max(clientHeight, clientWidth)
  const {clientX, clientY} = ev


}
</script>

<template>
  <div class="w-full h-full" v-on:click.stop="createRipple">
    <slot/>
  </div>
</template>
