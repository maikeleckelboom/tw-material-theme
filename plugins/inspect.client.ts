import { inspect } from '@xstate/inspect'

export default defineNuxtPlugin(() => {
	inspect({
		iframe: false
	})
})
