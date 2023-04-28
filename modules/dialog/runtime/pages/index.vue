<script lang="ts" setup>
import {confirm, openDialog, prompt} from '~/modules/dialog/runtime/plugin'

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const confirmationMessage: string = 'Are you sure you want to delete this item?'
const promptMessage: string = 'What is your name?'
const warningMessage: string = `Confirming this action will have permanent effects on your data. Please double check your information before proceeding. Press OK to continue or Cancel to go back.`

const vConsole = reactive<string[]>([])

async function testConfirmDialog(): Promise<void> {
  (await confirm(confirmationMessage)) ? vConsole.push('Confirmed') : vConsole.push('Cancelled')
}

async function testPromptTextDialog() {
  const text = await prompt('Enter some text')
  text
      ? vConsole.push(`Prompt text dialog promise resolved (text: ${text})`)
      : vConsole.push('Prompt text dialog promise rejected (canceled)')
}


const createBasicDialog = async () => await openDialog({
  title: 'Basic dialog',
  text: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or ask for decision.'
})

const createDialogWithHeroIcon = async () => await openDialog({
  icon: 'ic:twotone-spellcheck',
  title: 'Dialog with hero icon',
  text: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or ask for decision.'
})

const createFullScreenDialog = async () => await openDialog({
  title: 'Full screen dialog',
  text: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or ask for decision. \n'.repeat(14),
  type: 'full-screen',
  header: {
    actions: {
      Save: dialog => dialog.resolve(`Saved at ${new Date().toLocaleTimeString()}`)
    }
  },
  actions: {
    'Read More': async (dialog) => {
      const ms = 1_000
      await sleep(ms)
      dialog.resolve(`Async process has finished in ${ms}ms`)
    }
  }
})

const dialogWithDividerAndLabels = async () => await openDialog({
  title: 'Dialog with divider',
  text: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or ask for decision.',
  divider: true,
  okLabel: 'Save',
  cancelLabel: 'Go Back'
})

const createDialogWithActions = async () => await openDialog({
  title: 'Dialog with actions',
  text: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or ask for decision.',
  actions: {
    'Never Mind': (ctx) => {
      vConsole.push('Action 1 clicked (\'Never Mind\')')
      return ctx.resolve(null)
    },
    'Continue': (ctx) => {
      vConsole.push('Action 2 clicked (\'Continue\')')
      return ctx.resolve('continued 😄')
    }
  }
})

async function testDialogWithActions() {
  const result = await createDialogWithActions()
  vConsole.push(`Dialog with actions promise resolved (result: ${result})`)
}

async function testBasicDialog(): Promise<void> {
  const returnedValue = await createBasicDialog()
  vConsole.push(`Basic dialog has been ${returnedValue ? 'resolved' : 'rejected'} (${returnedValue}).`)
}

async function testWithHeroIcon(): Promise<void> {
  const returnedValue = await createDialogWithHeroIcon()
  vConsole.push(`Dialog with hero icon has been ${returnedValue ? 'resolved' : 'rejected'} (${returnedValue}).`)
}

async function testFullScreenDialog(): Promise<void> {
  const returnedValue = await createFullScreenDialog()
  vConsole.push(`Full screen dialog has been ${returnedValue ? 'resolved' : 'rejected'} (${returnedValue}).`)
}


</script>

<template>
  <div class="container">
    <h1>Nuxt Promise Dialog Playground</h1>
    <p>
      An example of dialogs built using this project. When you hit a button a function is called that opens the
      dialog and returns a promise, when you close the dialog the promise resolves with the offsetLeft entered into the
      dialog and
      that offsetLeft is printed below.
    </p>
    <div class="btn-container">
      <Button v-on:click="testBasicDialog">
        Basic dialog
      </Button>
      <Button v-on:click="testWithHeroIcon">
        Dialog with hero icon
      </Button>
      <Button v-on:click="testFullScreenDialog">
        Full screen dialog with actions
      </Button>
      <Button v-on:click="testDialogWithActions">
        Dialog with actions
      </Button>
      <Button v-on:click="dialogWithDividerAndLabels">
        Dialog with actions and divider
      </Button>
      <Divider/>
      <Button v-on:click="testConfirmDialog">
        Confirm Dialog
      </Button>
      <Button v-on:click="testPromptTextDialog">
        Prompt Dialog
      </Button>
    </div>
    <section>
      <h1>Console</h1>
      <div class="console-container">
        <ul>
          <li v-for="(log,line) in vConsole" :key="line">
            <code><span>$</span><span>{{ log }}</span></code>
          </li>
        </ul>
      </div>
    </section>
    <DialogWrapper/>
  </div>
</template>
