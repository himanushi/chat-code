<script lang="ts">
	import { onMount } from 'svelte';
	import { initialize } from '@ionic/core';
	import '~/theme/custom.css';
	import '~/theme/variables.css';
	import Menu from './menu.svelte';
	import Icon from '~/components/icon.svelte';

	onMount(() => {
		initialize({
			animated: true,
			mode: 'ios'
		});
	});
</script>

<ion-app>
	<ion-split-pane when="sm" content-id="main">
		<Menu />
		<div class="ion-page" id="main">
			<ion-header id="menu">
				<ion-toolbar>
					<ion-buttons slot="start">
						<ion-button>
							<ion-menu-toggle>
								<Icon name="menu" />
							</ion-menu-toggle>
						</ion-button>
					</ion-buttons>
					<ion-title> Chat Code </ion-title>
				</ion-toolbar>
			</ion-header>
			<slot />
		</div>
	</ion-split-pane>
</ion-app>
