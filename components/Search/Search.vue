<script lang="ts" setup>
	import { assign } from 'xstate'

	const viewport = useViewport()
	const screenCompact = computed(() => viewport.isGreaterOrEquals('compact'))
	const screenMedium = computed(() => viewport.isGreaterOrEquals('medium'))
	const screenExpanded = computed(() => viewport.isGreaterOrEquals('expanded'))

	type Context = {
		query: string
	}

	const searchMachine = createMachine<Context>({
		predictableActionArguments: true,
		id: 'search',
		initial: 'idle',
		context: {
			query: ''
		},
		states: {
			idle: {
				on: {
					ENTER_SEARCH_VIEW: 'focused'
				}
			},
			focused: {
				on: {
					SEARCH_QUERY_UPDATED: {
						actions: assign({
							query: (_, ev) => ev.query
						})
					},
					EXIT_SEARCH_VIEW: 'idle'
				}
			}
		}
	})

	const service = useInterpret(searchMachine, {
		devTools: false
	})

	const state = ref(service.initialState)

	service.onTransition(s => {
		if (!s.changed) return
		state.value = s
	})

	const { send } = service

	const isFocused = computed(() => state.value.matches('focused'))

	const AVATAR_URL =
		'https://avatars.githubusercontent.com/u/25190563?v=4' as const
</script>

<template>
	<div data-component="Search">
		<SearchBar
			:state="state.value"
			v-on:input="send('SEARCH_QUERY_UPDATED', { query: $event.target.value })"
			v-on:blur="send('EXIT_SEARCH_VIEW')"
			v-on:focus="send('ENTER_SEARCH_VIEW')">
			<template #leading:icon="{ icon }">
				<Icon v-if="isFocused" :class="icon()" name="ic:round-arrow-back" />
				<Icon v-else :class="icon()" name="ic:round-search" />
			</template>
			<template v-if="isFocused" #trailing:icon="{ button, icon }">
				<button :class="button()" tabindex="0">
					<Icon :class="icon()" name="ic:round-close" />
				</button>
			</template>
			<template v-else #trailing:avatar="{ button, avatar }">
				<button :class="button()" tabindex="0">
					<img :class="avatar()" :src="AVATAR_URL" alt="avatar" />
				</button>
			</template>
			<template #hint="{ hint }">
				<span v-if="screenExpanded" :class="hint()"> CTRL+K </span>
			</template>
		</SearchBar>
		<SearchView v-if="isFocused" />
	</div>
</template>
