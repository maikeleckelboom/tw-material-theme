<script setup lang="ts">
import { tv } from 'tailwind-variants'

const settingsView = tv({
  slots: {
    panel:
      'min-h-screen h-[200vh] bg-surface text-on-surface  scrollbar overflow-x-hidden',
    header: [
      'fixed',
      'w-full',
      'p-1',
      'flex',
      'flex-row',
      'items-center',
      'justify-start',
      'gap-2'
    ]
  }
})

const { panel, header } = reactive(settingsView())

const openMenu = () => {}

const panelElement: Ref<HTMLElement> = useCurrentElement()

const { x, y, isScrolling, arrivedState, directions } =
  useScroll(panelElement, {
    behavior: 'smooth'
  })

watch(x, scrollX => {
  console.log('scrollX', scrollX)
})
</script>

<template>
  <div :class="panel()">
    <header :class="header()">
      <NuxtLink to="/">
        <Button intent="icon">
          <Icon
            name="ic:outline-arrow-back"
            class="h-6 w-6" />
        </Button>
      </NuxtLink>
      <div class="flex-1">
        <h1>Settings</h1>
      </div>
      <Button intent="icon" @click="openMenu">
        <Icon name="ic:outline-more-vert" class="h-6 w-6" />
      </Button>
    </header>
  </div>
</template>
