<script lang="ts" setup>
const {state, toggle} = useSideSheet()
</script>

<template>
  <div class="relative overflow-hidden h-[100dvh] w-[100dvw] bg-background text-on-background">
    <header>
      <div class="flex h-16 flex-row items-center justify-between px-4">
        <div class="flex flex-row items-center gap-4">
          <div class="flex flex-row items-center gap-2">
            <span class="text-2xl font-bold">
              Logo
            </span>
          </div>
          <div class="flex flex-row items-center gap-2">
            <div
                class="relative flex overflow-hidden rounded-2xl px-4 py-2 text-sm bg-surface-level-1 border-thin border-surface-level-2"
                data-name="search-bar">
              <Icon class="h-6 w-6" name="ic:round-search"/>
              <input
                  class="border-none bg-transparent focus:outline-none focus:border-transparent"
                  placeholder="Search" type="text"/>
              <Icon class="h-6 w-6" name="ic:round-menu"/>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center gap-4 text-on-surface-variant">
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
          </div>
        </div>
      </div>
    </header>
    <slot/>
  </div>
</template>
