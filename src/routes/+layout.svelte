<script lang="ts">
	import { onMount } from 'svelte';
	import { initialize, menuController } from '@ionic/core';
	import '~/theme/custom.css';
	import '~/theme/variables.css';
	import Menu from './menu.svelte';

	onMount(() => {
		initialize({
			animated: true,
			mode: 'ios'
		});
		menuController.open('main-content');
	});
</script>

<ion-app id="main-content">
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button />
			</ion-buttons>
			<ion-title> Chat Code </ion-title>
		</ion-toolbar>
	</ion-header>
	<slot />
</ion-app>
<Menu />
