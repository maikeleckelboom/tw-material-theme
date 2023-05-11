<script lang="ts" setup>
	import { useRailDrawerStore } from '~/stores/useRailDrawerStore'
	import { tv } from 'tailwind-variants'

	/**
	 * Small badge
	 * Large badge
	 * Large badge with max characters
	 */
	interface Props {
		type?: 'small' | 'large' | 'large-max'
		value?: string | number
		parent?: 'drawer' | 'rail'
	}

	const props = withDefaults(defineProps<Props>(), {
		type: 'large'
	})

	const { base } = tv({
		base: [
			'rounded-[28px]',
			'tabular-nums',
			'z-10',
			'text-label-medium',
			'leading-tight',
			'min-w-[16px]',
			'tracking-wide',
			'flex',
			'h-fit',
			'w-auto',
			'p-2',
			'items-center',
			'justify-center'
		]
	})

	const { percentage } = storeToRefs(useRailDrawerStore())
</script>

<template>
	<span :class="base" class="badge" data-component="Badge">
		<slot v-bind="{ value }">
			{{ value }}
		</slot>
	</span>
</template>
