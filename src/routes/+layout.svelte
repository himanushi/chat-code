<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import '~/theme/custom.css';
	import '~/theme/variables.css';

	onMount(() => {
		goto('/chat');
	});
</script>

<ion-app>
	<ion-header>
		<ion-toolbar />
	</ion-header>
	<ion-content> <slot /> </ion-content>
	<ion-footer>
		<ion-toolbar />
	</ion-footer>
</ion-app>
