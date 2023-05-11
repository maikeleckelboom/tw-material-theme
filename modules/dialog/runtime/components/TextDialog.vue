<script lang="ts" setup>
  const props = defineProps<{
    text: string
    title?: string
  }>()

  const dialog = useDialog()
  const returnValue = ref<string>('')

  const input = ref<HTMLInputElement>()
  whenever(input, field => field.focus())

  useEventListener(input, 'keydown', ({ key }: KeyboardEvent) => {
    if (key !== 'Enter') return
    dialog.resolve(returnValue.value)
  })

  defineExpose({
    returnValue: () => returnValue.value
  })

  onMounted(() => input.value?.focus())
</script>

<template>
  <BasicDialog :text="text" :title="title" :valid="!!returnValue.length">
    <template #title>
      <p class="flex w-full">Password</p>
    </template>
    <template #body>
      <input
        ref="input"
        v-model="returnValue"
        class="rounded-sm p-4 outline-1 text-on-surface-variant bg-surface-variant border-secondary-container border-thin outline-secondary"
        type="text" />
    </template>
  </BasicDialog>
</template>
