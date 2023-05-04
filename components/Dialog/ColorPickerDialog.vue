<script lang="ts" setup>
import {DialogInstance, useDialog} from "~/modules/dialog/runtime/composables/useDialog";
import {KeyColors} from "~";
import {DialogBasicDialog} from "#components";

interface Props {
  type?: 'basic' | 'fullScreen';
  divider?: boolean;
  cancelLabel?: string;
  okLabel?: string;
  icon?: string;
  title?: string;
  text?: string;
  actions?: {
    [key: string]: (instance: DialogInstance) => void;
  }
  keyColorName?: keyof KeyColors
}

const props = withDefaults(defineProps<Props>(), {
  divider: true,
})

const dialog = ref<InstanceType<typeof DialogBasicDialog>>()

</script>
<template>
  <DialogBasicDialog ref="dialog" v-bind="props">
    <template #icon>
      <Icon :name="icon" class="h-6 w-6"/>
    </template>
    <template #headline>
      {{ capitalize(title) }}
    </template>
    <template #body>
      <FormPaletteColor
          :key-color-name="keyColorName"
      />
    </template>
    <template #actions="{resolve, reject}">
      <slot name="actions" v-bind="{resolve, reject}"/>
    </template>
  </DialogBasicDialog>
</template>
