<script lang="ts" setup>
import SearchBar from "~/layouts/SearchBar.vue";

const {state, toggle} = useSideSheet()
</script>

<template>
  <div class="relative overflow-hidden h-[100dvh] w-[100dvw] bg-background text-on-background">
    <header class="grid grid-cols-[360px,1fr,auto] py-2">
      <div class="flex flex-row items-center w-[360px]">
        <div class="flex flex-row items-center gap-2 px-6">
            <span class="text-2xl font-bold">
              Logo
            </span>
        </div>
      </div>
      <div class="flex items-center justify-start">
        <SearchBar/>
      </div>
      <div class="flex items-center gap-4 text-on-surface-variant">
        <div class="flex flex-row items-center gap-2">
          <button>
            <Icon class="h-6 w-6" name="ic:outline-notifications"/>
          </button>
          <button v-on:click="toggle">
            <Icon class="h-6 w-6" name="ic:outline-settings"/>
          </button>
          <button>
            <Icon class="h-6 w-6" name="ic:outline-account-circle"/>
          </button>
          <FormColorMode/>
        </div>
      </div>
    </header>
    <slot/>
  </div>
</template>
