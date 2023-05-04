<script lang="ts" setup>
import {tv} from "tailwind-variants"
import {createMachine} from "xstate"

// Viewport Manager
const viewport = useViewport()
// 0 - 600 (Compact)
const screenCompact = computed(() => viewport.isLessThan('sm'))
// 600+ (Medium)
const screenMediumUp = computed(() => viewport.isGreaterOrEquals('sm'))
// 840+ (Expanded)
const screenLargeUp = computed(() => viewport.isGreaterOrEquals('xl'))


const {base} = tv({
  variants: {},
  slots: {
    base: []
  }
})

const searchMachine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        SEARCH: 'search.searching'
      }
    },
    search: {
      initial: 'start',
      states: {
        start: {},
        searching: {},
        end: {}
      }
    },
    result: {}
  },
});

const isEnteringText = ref<boolean>(false)

</script>

<template>
  <div data-component="Search">
    <SearchBar v-on:blur="isEnteringText = false" v-on:focus="isEnteringText = true">
      <template #icon:leading="{leadingIcon}">
        <Icon v-if="isEnteringText" :class="leadingIcon()" name="ic:round-arrow-back"/>
        <Icon v-else :class="leadingIcon()" name="ic:round-menu"/>
      </template>
      <template v-if="isEnteringText" #icon:trailing="{iconButton, trailingIcon}">
        <button :class="iconButton()" tabindex="0">
          <Icon :class="trailingIcon()" name="ic:round-close"/>
        </button>
      </template>
      <template v-else #avatar:trailing="{iconButton, avatar}">
        <button :class="iconButton()" tabindex="0">
          <img :class="avatar()" :src="'https://avatars.githubusercontent.com/u/25190563?v=4'" alt="avatar"/>
        </button>
      </template>
      <template #keyboard-hint="{keyboardHint}">
        <span v-if="screenMediumUp && !isEnteringText" :class="keyboardHint()">
          CTRL+K
        </span>
      </template>
    </SearchBar>
    <SearchView v-if="isEnteringText"/>
  </div>
</template>
