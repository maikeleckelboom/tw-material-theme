<script lang="ts" setup>
const target = ref<HTMLElement>()

const {variant} = useMotion(target, {
  initial: {
    scale: 0,
    scaleY: 0,
    opacity: 0,
  },
  enter: {
    opacity: 1,
    scale: 1,
    scaleY: 1,
    transition: {
      onComplete: () => {
        console.log('enter complete')
      }
    },
  },
  leave: {
    opacity: 0,
    scale: 0.95,
    scaleY: 0.85,
    transition: {
      onComplete: () => {
        console.log('leave complete')

      }
    },
  }
})

const isShown = ref<boolean>(false)

const toggle = () => {
  isShown.value = !isShown.value
}

watch(isShown, (value) => {
  variant.value = value
      ? 'enter'
      : 'leave';
})
</script>

<template>
  <div class="container">
    <Button v-on:click="toggle">Toggle</Button>
    <div ref="target"
         class="h-94 w-94 bg-surface-level-2 flex">
      Test
    </div>
  </div>
</template>
