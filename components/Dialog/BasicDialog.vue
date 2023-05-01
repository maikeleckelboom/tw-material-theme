<script lang="ts" setup>
import {tv} from "tailwind-variants"
import {DialogInstance} from "~/modules/dialog/runtime/composables/useDialog"

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
}

const props = withDefaults(defineProps<Props>(), {
  type: 'basic',
  divider: false,
  okLabel: 'Ok',
})

const dialogTv = tv({
  base: [
    'fixed',
    'bg-surface',
    'z-50',
    'flex',
    'flex-col',
    'gap-4',
    'p-[24px]',
    'gap-y-[12px]',
    'text-on-surface',
  ],
  variants: {
    type: {
      fullScreen: {
        base: [
          'inset-0',
          'w-[100dvw]',
          'h-[100dvh]',
          'rounded-none',
        ],
        header: [
          'flex',
          'flex-row',
          'items-center',
          'justify-between',
          'gap-x-2',
          'py-1',
        ]
      },
      basic: {
        base: [
          'top-[10%]',
          'max-w-[max(560px,96%)]',
          'min-w-[280px]',
          'rounded-3.5xl',
          'overflow-hidden',
        ]
      }
    },
    divider: {
      true: {}
    },
    icon: {
      true: [],
      false: []
    }
  },
  slots: {
    scrim: [
      'fixed',
      'inset-0',
      'z-30',
      'flex',
      'justify-center',
      'bg-scrim/50'
    ],
    header: [
      'flex',
      'flex-col',
      'items-center',
      'justify-between',
      'gap-y-1',
      'py-1',
    ],
    headline: [
      'text-title-large',
    ],
    icon: [
      'w-6',
      'h-6',
      'text-secondary',
    ],
    body: [
      'flex',
      'flex-col',
      'overflow-y-auto',
      'scrollbar',
      'text-body-medium',

    ],
    footer: [
      'flex',
      'flex-wrap',
      'items-center',
      'justify-end',
      'gap-2',
    ]
  },
  defaultVariants: {
    type: 'basic',
    divider: false,
  }
})

/*
  type DialogVariants = VariantProps<typeof dialogTv>

  interface DialogProps
      extends Omit<DialogVariants, "icon">,
          Required<Pick<DialogVariants, "icon">> {
  }
*/

const {
  base: baseClass,
  headline: headlineClass,
  header: headerClass,
  body: bodyClass,
  footer: footerClass,
  icon: iconClass,
  scrim: scrimClass
} = dialogTv({
  type: props.type,
  icon: !!props.icon
})

const dialog = useDialog()

const dialogEl = ref<HTMLElement>()
const scrimEl = ref<HTMLElement>()

const leaveDuration = 140 as const
const enterDuration = 180 as const

const {variant: scrimVariant} = useMotion(scrimEl, {
  initial: {
    opacity: 0,
    duration: leaveDuration,
  },
  visible: {
    opacity: 1,
    duration: leaveDuration,
  },
})

const leave = {
  opacity: 0,
  scale: 0.9,
  scaleY: 0.95,
  scaleX: 0.95,
}

const initial = {
  scale: 0.95,
  scaleY: 0.8,
  opacity: 0,
  transition: {
    duration: enterDuration,
  },
}

const visible = {
  opacity: 1,
  scale: 1,
  scaleY: 1,
  scaleX: 1,
  transition: {
    duration: enterDuration,
  },
}

const {variant} = useMotion(dialogEl, {
  initial,
  visible,
  resolve: {
    ...leave,
    transition: {
      duration: leaveDuration,
      onComplete: dialog.resolve
    },
  },
  reject: {
    ...leave,
    transition: {
      duration: leaveDuration,
      onComplete: dialog.reject
    },
  },
})

const resolve = () => {
  scrimVariant.value = 'initial'
  useTimeoutFn(() => variant.value = 'resolve', 120)
}

const reject = () => {
  scrimVariant.value = 'initial'
  useTimeoutFn(() => variant.value = 'reject', 120)
}


onClickOutside(dialogEl, reject)
const {escape} = useMagicKeys()
whenever(escape, reject)

</script>

<template>
  <div ref="scrimEl" :class="scrimClass()">
    <div ref="dialogEl" :class="baseClass()" role="dialog">
      <slot name="default" v-bind="dialog">
        <div :class="headerClass()">
          <slot name="icon" v-bind="{icon, iconClass}">
            <Icon v-if="icon" :class="iconClass()" :name="icon"/>
          </slot>
          <slot name="headline">
            <p :class="headlineClass()">{{ props.headline }}</p>
          </slot>
          <div v-if="type === 'fullScreen'" class="flex-grow">
            <Button icon="ic:close" variant="icon" v-on:click="reject"/>
          </div>
        </div>
        <div :class="bodyClass()">
          <slot name="body" v-bind="{...dialog, resolve, reject}">
            {{ text }}
          </slot>
        </div>
        <Divider v-if="divider"/>
        <div :class="footerClass()">
          <slot name="actions" v-bind="{...dialog, resolve, reject}">
            <template v-if="actions && Object.keys(actions).length">
              <Button
                  v-for="([name,action], i) in objectEntries(actions)"
                  :key="i"
                  intent="text"
                  size="sm"
                  v-on:click="action($dialog)">
                <slot :name="`action-${i + 1}`" v-bind="dialog">
                  {{ name }}
                </slot>
              </Button>
            </template>
          </slot>
        </div>
      </slot>
    </div>
  </div>
</template>
