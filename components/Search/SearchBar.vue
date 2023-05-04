<script lang="ts" setup>
import {tv} from "tailwind-variants"
import {useRailDrawerStore} from "#imports";


const store = useSideSheetStore()
const {open} = store, {isOpened} = storeToRefs(store)

// ... Emit
const emit = defineEmits<{
  (ev: 'focus'): void
  (ev: 'blur'): void
}>()

// ... Component ...

const searchBar = tv({
  slots: {
    container: [
      'min-w-320',    // 320px
      'max-w-720',    // 720px
      'h-14',         // 56px
      'rounded-full',
      'bg-surface-container-high',
      'relative',
      'z-[25]',
      'flex',
      'items-center',
      'flex-row',
      'after:content',
      'after:absolute',
      'after:inset-0',
      'after:rounded-full',
      'after:bg-primary',
      'after:opacity-0',
      'after:transition-all',
      'after:pointer-events-none',
      'hover:after:opacity-[0.04]',
      'focus-within:after:opacity-[0.12]',
    ],
    inputContainer: [
      'relative',
      'w-full',
      'h-full',
    ],
    keyboardHint: [
      'absolute',
      'right-4',
      'text-caption',
      'text-on-surface-variant',
      'opacity-90',
      'transition-opacity',
      'top-4',
      'font-mono',
      'text-xs',
      'leading-normal',
      'tabular-nums',
      'border',
      'border-outline-variant',
      'rounded-sm',
      'px-2',
      'py-1',
    ],
    iconButton: [
      'h-full',
      'bg-transparent',
      'outline-none',
      'focus:outline-none',
      'flex-shrink-0',
      'flex',
      'items-center',
      'p-4',
      'justify-center',
      'relative',

      'after:content',
      'after:absolute',
      'after:inset-0',
      'after:rounded-full',
      'after:bg-primary/20',
      'after:opacity-0',
      'after:transition-all',
      'after:pointer-events-none',
      'hover:after:opacity-[0.28]',
    ],
    input: [
      'appearance-none',
      'text-on-surface',
      'bg-transparent',
      'w-full',
      'h-full',
      'px-2',
      'outline-none',
      'compact:text-body-medium',
      'expanded:text-body-large',

    ],
    leadingIcon: [
      'w-6',
      'h-6',
      'left-4',
    ],
    trailingIcon: [
      'w-6',
      'h-6',
      'right-4',
    ],
    avatar: [
      'w-[30px]',
      'h-[30px]',
      'rounded-full',
      'right-4',
    ],
    supportingText: [
      'text-body-large',
      'text-on-surface-variant',
    ],
  },
  compoundSlots: [
    {
      slots: [
        'leadingIcon',
        'trailingIcon',
        'image'
      ],
      class: [
        'text-on-surface-variant',
      ]
    },
  ]
})


const inputPlaceholder = ref<string>('Search for anything')

const inputRef = ref<HTMLInputElement>()
const inputFocus = () => inputRef.value?.focus()
const inputBlur = () => inputRef.value?.blur()

const inputFocused = computed<boolean>(() => {
  if (process.server) return false
  return document.activeElement === inputRef.value
})

watch(inputFocused, (focused) => {
  if (focused) emit('focus')
  else emit('blur')
})


onKeyStroke(['control', 'k'], (ev: KeyboardEvent) => {
  ev.preventDefault()
  inputRef.value?.focus()
})

const inputValue = ref<string>('')

// Viewport Manager
const viewport = useViewport()
// 0 - 600 (Compact)
const screenCompact = computed(() => viewport.isLessThan('sm'))
// 600+ (Medium)
const screenMediumUp = computed(() => viewport.isGreaterOrEquals('sm'))
// 840+ (Expanded)
const screenLargeUp = computed(() => viewport.isGreaterOrEquals('xl'))


const {
  container,
  leadingIcon,
  trailingIcon,
  avatar,
  input,
  inputContainer,
  iconButton,
  keyboardHint,
  supportingText
} = searchBar()

const avatarSrc = 'https://avatars.githubusercontent.com/u/25190563?v=4'
</script>

<template>
  <div :class="container()"
       data-component="SearchBar">
    <button :class="iconButton()"
            tabindex="0"
            v-on:click="open()">
      <slot name="icon:leading"
            v-bind="{leadingIcon}">
        <Icon :class="leadingIcon()"
              name="ic:round-menu"/>
      </slot>
    </button>
    <label :class="inputContainer()"
           for="search">
      <input id="search"
             ref="inputRef"
             v-model="inputValue"
             :class="input()"
             :placeholder="inputPlaceholder"
             type="text"
             v-on:blur="emit('blur')"
             v-on:focus="emit('focus')"/>
      <slot name="keyboard-hint" v-bind="{keyboardHint}">

      </slot>
    </label>
    <slot name="icon:trailing" v-bind="{iconButton, trailingIcon}"/>
    <slot name="avatar:trailing" v-bind="{iconButton, avatar}"/>
  </div>
</template>
