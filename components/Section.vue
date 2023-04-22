<script lang="ts" setup>
interface Props {
  opened?: boolean
  onToggle?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  opened: false,
  onToggle: () => ({})
})

const handle = ref<HTMLElement>()
</script>

<template>
  <section>
    <div class="grid cursor-pointer pt-2 pb-4 group ga grid-cols-[1fr_auto]"
         v-on:click="onToggle()">
      <h1 class="text-2xl">
        <slot name="title">Title</slot>
      </h1>
      <div ref="handle"
           class="flex flex-col items-center justify-center self-center group">
        <Icon :key="opened"
              class="h-9 w-9 rounded-full p-2 group-hover:bg-surface-level-1 text-on-surface-variant"
              name="ic:outline-expand-more"
        />
      </div>
    </div>
    <div v-if="opened" ref="content">
      <slot>Content</slot>
    </div>
  </section>
</template>
