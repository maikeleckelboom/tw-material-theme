<script lang="ts" setup>
const emit = defineEmits<{
  (ev: 'confirm', resolve: () => void): void;
  (ev: 'cancel', reject: () => void): void;
}>()
</script>

<template>
  <DialogBasicDialog>
    <template #icon>
      <Icon class="h-6 w-6" name="carbon:checkmark-outline-warning"/>
    </template>
    <template #headline>
      <slot name="headline"/>
    </template>
    <template #header-actions>
      <slot name="header-actions"/>
    </template>
    <template #actions="{resolve, reject}">
      <slot name="actions" v-bind="{resolve, reject}">
        <Button intent="text" size="sm" v-on:click="reject">
          <slot name="reject-label">
            Cancel
          </slot>
        </Button>
        <Button intent="text" size="sm" v-on:click="resolve">
          <slot name="resolve-label">
            Yes
          </slot>
        </Button>
      </slot>
    </template>
  </DialogBasicDialog>
</template>
