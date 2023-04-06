<script lang="ts" setup>


const sideSheetCloseButtonHidden = ref<boolean>(false)
const hideSideSheetCloseButton = () => {
  sideSheetCloseButtonHidden.value = !sideSheetCloseButtonHidden.value
}
</script>

<template>
  <aside
      class="fixed top-0 right-0 z-10 h-screen rounded-tl-3xl rounded-bl-3xl shadow border-l-thin border-outline-variant w-[356px] bg-surface grid grid-rows-[auto,1fr,auto]"
      data-name="side-sheet">

    <header class="pl-[16px] pr-[16px] py-[24px] grid grid-cols-[auto,1fr,auto] gap-[12px] bg-secondary-container/10"
            data-name="side-sheet-header">
      <div v-if="sideSheetCloseButtonHidden"
           class="flex items-center">
        <button
            class="flex items-center justify-center rounded-full w-[40px] h-[40px] hover:bg-secondary-container/20">
          <Icon class="w-[24px] h-[24px] text-on-secondary-container" name="ic:outline-arrow-back"/>
        </button>
      </div>
      <div class="ml-2 flex items-center justify-start">
        <h2 class="text-lg font-medium text-on-secondary-container">
          Saved Themes
        </h2>
      </div>
      <div class="flex items-center justify-end">
        <button
            class="flex items-center justify-center rounded-full w-[40px] h-[40px] hover:bg-secondary-container/20"
            v-on:click="hideSideSheetCloseButton">
          <Icon class="w-[24px] h-[24px] text-on-secondary-container" name="ic:outline-close"/>
        </button>
      </div>
    </header>
    <main
        class="flex flex-1 flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-surface-variant scrollbar-track-surface/50"
        data-name="side-sheet-content">
      <div class="flex flex-1 flex-col">

        <!-- Section Label -->
        <div class="flex items-center px-[24px] py-[16px]">
          <h3 class="font-medium text-md text-on-secondary-container">
            System <span class="indent-1 text-sm italic text-outline">Default</span>
          </h3>
        </div>

        <div class="flex flex-col gap-2 px-[24px]">
          <div class="flex items-center gap-3">
            <div class="rounded-full w-[24px] h-[24px] bg-primary"></div>
            <div class="flex flex-col">
                <span class="text-sm font-medium text-on-secondary-container">
                  Primary
                </span>
              <span class="text-xs font-normal text-on-secondary-container/60">
                  #1A73E8
                </span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="rounded-full w-[24px] h-[24px] bg-secondary"></div>
            <div class="flex flex-col">
                <span class="text-sm font-medium text-on-secondary-container">
                  Secondary
                </span>
              <span class="text-xs font-normal text-on-secondary-container/60">
                  #1A73E8
                </span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="rounded-full w-[24px] h-[24px] bg-secondary-container"></div>
            <div class="flex flex-col">
                <span class="text-sm font-medium text-on-secondary-container">
                  Secondary Container
                </span>
              <span class="text-xs font-normal text-on-secondary-container/60">
                  #1A73E8
                </span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="rounded-full w-[24px] h-[24px] bg-surface"></div>
            <div class="flex flex-col">
                <span class="text-sm font-medium text-on-secondary-container">
                  Surface
                </span>
              <span class="text-xs font-normal text-on-secondary-container/60">
                  #1A73E8
                </span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="rounded-full w-[24px] h-[24px] bg-outline"></div>
            <div class="flex flex-col">
                <span class="text-sm font-medium text-on-secondary-container">
                  Outline
                </span>
              <span class="text-xs font-normal text-on-secondary-container/60">
                  #1A73E8
                </span>

            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="flex items-center bg-secondary-container/10 py-[24px]"
            data-name="side-sheet-footer">
      <div class="flex items-center justify-start gap-3 px-[24px]"
           data-name="side-sheet-actions">
        <!-- filled button -->
        <button
            class="rounded-3xl px-6  bg-primary h-[38px] text-on-primary relative overflow-hidden hover:after:opacity-50 active:after:opacity-100 after:opacity-0 after:content[''] after:w-full after: after:h-full after:absolute after:inset-0 after:bg-inverse-primary/20"
            data-name="filled-button">
            <span class="relative text-sm font-medium text-on-primary z-[1]">
              Save
            </span>
        </button>
        <!-- outlined button -->
        <button
            class="rounded-3xl border bg-transparent px-5 h-[38px] border-surface-variant active:bg-secondary-container/30 hover:bg-secondary-container/20"
            data-name="outlined-button">
            <span class="text-sm font-medium text-primary">
              Cancel
            </span>
        </button>
      </div>
    </footer>
  </aside>
</template>
