<script lang="ts" setup>
import {DialogInstance} from "~/modules/dialog/runtime/plugin";

type DialogActions = Record<string, (dialog: DialogInstance) => void>;

interface DialogProps {
  icon?: string;
  title?: string;
  text?: string;
  actions?: DialogActions
  header?: {
    actions?: DialogActions
  },
}

interface Props extends DialogProps {
  type?: 'basic' | 'full-screen';
  divider?: boolean;
  cancelLabel?: string
  okLabel?: string,
  valid?: boolean;

  [key: string]: any;
}

const props = defineProps<Props>()
const {
  icon,
  title,
  text,
  type = 'basic',
  divider = false,
  cancelLabel = 'Cancel',
  okLabel = 'OK',
  actions = {},
  valid = true,
  header = {
    actions: {}
  }
} = props

const validateProps = () => Object.entries(actions).reduce((acc, [key, action]) => {
  if (acc[key]) {
    throw new Error(`Action ${key} is already defined`)
  }
  if (typeof action !== 'function') {
    throw new Error(`Action ${key} is not a function`)
  }
  acc[key] = action
  return acc
}, {} as DialogActions)

const addRequiredActionsWhenNeeded = () => {
  const hasAction = (key: string) => Object.values(actions).some(
      (action) => action.toString().includes(key)
  )
  if (!hasAction('reject') && !hasAction('resolve(null)')) {
    actions[cancelLabel] = (dialog) => dialog.resolve(null)
  }
  if (!hasAction('resolve')) {
    actions[okLabel] = (dialog) => dialog.resolve()
  }
}

const correctForMissingActions = () => {
  if (type === 'full-screen') return
  validateProps()
  addRequiredActionsWhenNeeded()
}

correctForMissingActions()

const {$dialog} = useNuxtApp()
const container = ref<HTMLElement>()
onClickOutside(container, () => $dialog.resolve(null))

const slots = useSlots()
const hasHeroIcon = computed<boolean>(() => !!(slots.icon?.() || !!icon))
const isResolveAction = (key: string) => {
  const action = actions[key]
  return action.toString().includes('resolve')
}
</script>

<template>
  <div ref="container"
       :data-has-hero-icon="hasHeroIcon"
       :data-type="type"
       class="basic-dialog-container">
    <slot>
      <div class="basic-dialog-header">
        <slot name="header">
          <div v-if="hasHeroIcon"
               class="basic-dialog-icon">
            <slot name="icon">
              <Icon :name="icon"/>
            </slot>
          </div>
          <div v-if="type === 'full-screen'"
               class="basic-dialog-close-button">
            <Button @click="$dialog.reject()">
              <Icon name="ic:twotone-close"/>
            </Button>
          </div>
          <div class="basic-dialog-headline">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <div v-if="type === 'full-screen'"
               class="basic-dialog-header-actions">
            <slot name="header-actions">
              <div v-for="([name,action], index) in Object.entries(header.actions)"
                   :key="index"
                   class="basic-dialog-header-action">
                <Button v-on:click="action($dialog)">
                  {{ name }}
                </Button>
              </div>
            </slot>
          </div>
        </slot>
      </div>
      <div class="basic-dialog-body">
        <slot name="body">
          <div class="basic-dialog-text">
            <slot name="text">
              {{ text }}
            </slot>
          </div>
        </slot>
      </div>
      <div class="basic-dialog-footer">
        <Divider
            v-if="divider"
            type="full-width"
        />
        <div class="basic-dialog-actions">
          <slot name="actions" v-bind="{...actions, ...$dialog}">
            <Button
                v-for="([name,action], i) in Object.entries(actions)"
                :key="i"
                :disabled="!valid && isResolveAction(name)"
                v-on:click="action($dialog)">
              <slot :name="`action-label-${i + 1}`">
                {{ name }}
              </slot>
            </Button>
          </slot>
        </div>
      </div>
    </slot>
  </div>
</template>
