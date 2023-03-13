<script lang="ts">
	import tippy, { type Placement } from 'tippy.js';
	import 'tippy.js/dist/tippy.css';

	export let message: string;
	export let placement: Placement = 'top';

	let div: HTMLDivElement;
	$: if (div && message) {
		tippy(div, {
			content: message,
			placement,
			arrow: true,
			allowHTML: true,
			theme: 'light',
			animation: 'scale',
			duration: 0,
			interactive: true,
			trigger: 'mouseenter focus',
			appendTo: () => document.body
		});
	}
</script>

<div bind:this={div}><slot /></div>
