<script lang="ts" setup>

const {text, title} = defineProps<{
  text: string;
  title?: string;
}>()

const {$dialog} = useNuxtApp()

const textModel = ref('')

const input = ref<HTMLInputElement | null>(null)
whenever(input, (field) => field.focus())

defineExpose({
  returnValue: () => textModel.value
})

useEventListener(input, 'keydown', (ev: KeyboardEvent) => {
  if (ev.key === 'Enter') {
    console.log('Enter')
    $dialog.resolve(textModel.value)
  }
})
</script>

<template>
  <BasicDialog
      :text="text"
      :title="title"
      :valid="!!textModel.length"
      cancel-label="Close"
      ok-label="Confirm">
    <template #header>
      Text Dialog
    </template>
    <template #body>
      <input v-model="textModel" type="text"/>
    </template>
  </BasicDialog>
</template>
