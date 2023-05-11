<script lang="ts" setup>
	import { tv } from 'tailwind-variants'
	import { useRailDrawerStore } from '#imports'

	const props = defineProps<{
		state: 'idle' | 'focused' | any
	}>()

	const { state } = toRefs(props)

	const store = useRailDrawerStore()
	const { open } = store,
		{ isOpened } = storeToRefs(store)

	const emit = defineEmits<{
		(ev: 'focus'): void
		(ev: 'blur'): void
	}>()

	const searchBar = tv({
		variants: {
			state: {
				idle: {},
				focused: {
					container: ['rounded-none', 'bg-transparent'],
					input: ['border-none'],
					inputContainer: [],
					keyboardHint: ['hidden']
				}
			}
		},
		slots: {
			container: [
				'min-w-320',
				'max-w-720',
				'h-14', // 56px
				'rounded-full',
				'bg-surface-container-high',
				'relative',
				'z-[25]',
				'flex',
				'items-center',
				'flex-row',
				'm-4'
			],
			inputContainer: ['relative', 'w-full', 'h-full'],
			keyboardHint: [
				'absolute',
				'right-4',
				'text-caption',
				'text-on-surface-variant',
				'opacity-90',
				'transition-opacity',
				'top-4',
				'font-mono',
				'text-xs',
				'leading-normal',
				'tabular-nums',
				'border',
				'border-outline-variant',
				'rounded-sm',
				'px-2',
				'py-1'
			],
			iconButton: [
				'h-full',
				'bg-transparent',
				'outline-none',
				'focus:outline-none',
				'flex-shrink-0',
				'flex',
				'items-center',
				'p-4',
				'justify-center',
				'relative'
			],
			input: [
				'appearance-none',
				'text-on-surface',
				'bg-transparent',
				'w-full',
				'h-full',
				'px-2',
				'outline-none',
				'compact:text-body-medium',
				'expanded:text-body-large'
			],
			leadingIcon: ['w-6', 'h-6', 'left-4'],
			trailingIcon: ['w-6', 'h-6', 'right-4'],
			avatar: ['w-[30px]', 'h-[30px]', 'rounded-full', 'right-4'],
			supportingText: ['text-body-large', 'text-on-surface-variant']
		},
		compoundSlots: [
			{
				slots: ['leadingIcon', 'trailingIcon', 'avatar'],
				class: ['text-on-surface-variant']
			}
		]
	})

	const inputPlaceholder = ref<string>('Search for anything')

	const inputRef = ref<HTMLInputElement>()
	const { focused } = useFocus(inputRef)

	watch(focused, focused => {
		focused ? emit('focus') : emit('blur')
	})

	const inputValue = ref<string>('')

	onKeyStroke(['control', 'k'], (ev: KeyboardEvent) => {
		ev.preventDefault()
		inputRef.value?.focus()
	})

	onKeyStroke('escape', (ev: KeyboardEvent) => {
		console.log('escape')
		ev.preventDefault()
		inputRef.value?.blur()
	})
</script>

<template>
	<div :class="searchBar({ state }).container()" data-component="SearchBar">
		<button :class="searchBar({ state }).iconButton()" tabindex="0" v-on:click="open()">
			<slot name="leading:icon" v-bind="{ icon: searchBar({ state }).leadingIcon }">
				<Icon :class="searchBar({ state }).leadingIcon()" name="ic:round-menu" />
			</slot>
		</button>
		<label :class="searchBar({ state }).inputContainer()" for="search">
			<input
				id="search"
				ref="inputRef"
				v-model="inputValue"
				:class="searchBar({ state }).input()"
				:placeholder="inputPlaceholder"
				type="text"
				v-on:blur="emit('blur')"
				v-on:focus="emit('focus')" />
			<slot name="hint" v-bind="{ hint: searchBar({ state }).keyboardHint }" />
		</label>
		<slot
			name="trailing:icon"
			v-bind="{
				button: searchBar({ state }).iconButton,
				icon: searchBar({ state }).trailingIcon
			}" />
		<slot
			name="trailing:avatar"
			v-bind="{
				button: searchBar({ state }).iconButton,
				avatar: searchBar({ state }).avatar
			}" />
	</div>
</template>
