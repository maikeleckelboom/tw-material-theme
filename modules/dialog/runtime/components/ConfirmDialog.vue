<script lang="ts" setup>


</script>

<template>
  <BasicDialog cancel-label="Cancel">
    <template #icon>
      <Icon name="carbon:checkmark-outline-warning"/>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #header-actions>
      <slot name="header-actions"></slot>
    </template>
    <template #actions="{resolve}">
      <slot name="actions" v-bind="{resolve}">
        <Button v-on:click="resolve(null)">
          <slot name="reject-label">Cancel</slot>
        </Button>
        <Button v-on:click="resolve('yes')">
          <slot name="resolve-label">Yes</slot>
        </Button>
      </slot>
    </template>
  </BasicDialog>
</template>
