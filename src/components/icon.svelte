<script lang="ts">
	import type { IconNames } from '~/@types/icon';
	export let name: IconNames;
	export let size: 'l' | 'm' | 's' = 'm';
	export let color: string | undefined = undefined;
	export let start = false;
	export let end = false;
	const sizeMap = {
		l: 40,
		m: 32,
		s: 24
	};
	let icon: any;
	$: if (icon && start) {
		icon.setAttribute('slot', 'start');
	}
	$: if (icon && end) {
		icon.setAttribute('slot', 'end');
	}
</script>

<ion-label
	bind:this={icon}
	style="font-size: {sizeMap[size]}px;"
	class="material-symbols-rounded-fill"
	{color}
	>{name}
</ion-label>

<style>
	ion-label {
		flex: none;
		width: 1em;
		height: 1em;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
