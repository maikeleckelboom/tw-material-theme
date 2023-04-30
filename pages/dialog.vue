<script lang="ts" setup>
async function confirm() {
  const confirmed = await confirmDialog('Are you sure you want to delete this item?')
  console.log('confirmed', confirmed)
}

async function prompt() {
  const text = await textDialog('Enter some text')
  console.log('prompt', text)
}
</script>

<template>
  <div class="container">
    <div class="flex flex-col space-y-4">
      <Button v-on:click="confirm">
        Confirm
      </Button>
      <Button v-on:click="prompt">
        Prompt
      </Button>
    </div>
  </div>
</template>
