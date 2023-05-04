<script lang="ts" setup>

const store = useSideSheetStore()
const {open} = store, {isOpened} = storeToRefs(store)
</script>

<template>
  <div class=" h-full flex flex-col  p-3 gap-4">
    <!--
        Primary (P-80),
        On Primary (P-20),
        Secondary (S-80),
        On Secondary (S-20),
        Tertiary (T-80),
        On Tertiary (T-20)
    -->
    <Divider/>
    <div class="grid grid-cols-3">
      <div class="bg-surface-dim">
        <p>Surface Dim</p>
      </div>
      <div class="bg-surface">
        <p>Surface</p>
      </div>
      <div class="bg-surface-bright">
        <p>Surface Bright</p>
      </div>
    </div>
    <Divider/>
    <div class="grid grid-cols-5">
      <div class="bg-surface-container-lowest">
        <p>Surface Container Lowest</p>
      </div>
      <div class="bg-surface-container-low">
        <p>Surface Container Low</p>
      </div>
      <div class="bg-surface-container">
        <p>Surface Container</p>
      </div>
      <div class="bg-surface-container-high">
        <p>Surface Container High</p>
      </div>
      <div class="bg-surface-container-highest">
        <p>Surface Container Highest</p>
      </div>
    </div>
    <div class="grid grid-cols-5">
      <div class="bg-surface-level-1">
        <p>Surface Level 1</p>
      </div>
      <div class="bg-surface-level-2">
        <p>Surface Level 2</p>
      </div>
      <div class="bg-surface-level-3">
        <p>Surface Level 3</p>
      </div>
      <div class="bg-surface-level-4">
        <p>Surface Level 4</p>
      </div>
      <div class="bg-surface-level-5">
        <p>Surface Level 5</p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.grid {
  @apply mb-1 h-32 gap-1;


  > div {
    @apply flex items-center justify-center text-sm text-center;
  }
}
</style>
