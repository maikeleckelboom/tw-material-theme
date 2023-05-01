<script lang="ts" setup>
import {DialogInstance, useDialog} from "~/modules/dialog/runtime/composables/useDialog";
import {KeyColors} from "~";

interface Props {
  type?: 'basic' | 'fullScreen';
  divider?: boolean;
  cancelLabel?: string;
  okLabel?: string;
  icon?: string;
  headline?: string;
  text?: string;
  actions?: {
    [key: string]: (instance: DialogInstance) => void;
  }
  keyColorName?: keyof KeyColors
}

const props = withDefaults(defineProps<Props>(), {
  type: 'basic',
  divider: false,
  okLabel: 'Ok',
})


</script>
<template>
  <DialogBasicDialog v-bind="props">
    <template #icon>
      <Icon :name="icon" class="h-6 w-6"/>
    </template>
    <template #headline>
      {{ headline }}
    </template>
    <template #body>
      <FormPaletteColor
          :key-color-name="keyColorName"
      />
    </template>
    <template #actions="{resolve,reject}">
      <Button class="w-full" intent="text" v-on:click="reject()">
        Reject
      </Button>
      <Button class="w-full" intent="text" v-on:click="resolve()">
        Resolve
      </Button>
    </template>
  </DialogBasicDialog>
</template>
