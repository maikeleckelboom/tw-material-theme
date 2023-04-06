<script lang="ts" setup>
const colorMode = reactive(useColorMode())
</script>

<template>
  <div>
    <form>
      <label class="text-primary cursor-pointer">
        <input v-model="colorMode.value"
               class="appearance-none"
               type="radio"
               value="light"/>
        <span class="sr-only">Light</span>
        <Icon class="w-5 h-5 ml-1.5" name="ci:sun"/>
      </label>
      <label class="text-primary cursor-pointer">
        <input v-model="colorMode.value"
               class="appearance-none"
               type="radio"
               value="dark"/>
        <span class="sr-only">Dark</span>
        <Icon class="w-5 h-5 ml-1.5" name="ci:moon"/>
      </label>
    </form>
  </div>
</template>
