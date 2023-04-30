<script lang="ts" setup>

const props = defineProps<{
  text: string;
  headline?: string;
}>()

const dialog = useDialog()
const returnValue = ref<string>('')

const input = ref<HTMLInputElement>()
whenever(input, field => field.focus())

useEventListener(input, 'keydown', ({key}: KeyboardEvent) => {
  if (key !== 'Enter') return
  dialog.resolve(returnValue.value)
})

defineExpose({
  returnValue: () => returnValue.value
})

</script>

<template>
  <DialogBasicDialog :headline="headline" :text="text" :valid="!!returnValue.length" ok-label="Confirm">
    <template #header>
      Text Dialog
    </template>
    <template #body>
      <input v-model="returnValue" type="text"/>
    </template>
  </DialogBasicDialog>
</template>
