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
  <DialogBasicDialog :headline="headline" :text="text" :valid="!!returnValue.length">
    <template #header>
      Text Dialog
    </template>
    <input v-model="returnValue"
           class="rounded-sm p-4 outline-1 text-on-surface-variant bg-surface-variant border-secondary-container border-thin outline-secondary"
           type="text"/>
  </DialogBasicDialog>
</template>
