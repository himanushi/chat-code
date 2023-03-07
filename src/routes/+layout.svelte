<script lang="ts">
	import { onMount } from 'svelte';
	import { initialize } from '@ionic/core';
	import '~/theme/custom.css';
	import '~/theme/variables.css';
	import Menu from './menu.svelte';
	import Icon from '~/components/icon.svelte';
	import { store } from '~/store/store';
	import { chatList, chatListStoreId } from '~/store/chatList';
	import { apiKey, apiKeyStoreId } from '~/store/apiKey';

	onMount(async () => {
		// initialize Ionic
		initialize({
			animated: true,
			mode: 'ios'
		});

		// get API key from storage
		const key = await store.get<string>(apiKeyStoreId);
		if (typeof key === 'string') {
			apiKey.update(key);
		}

		// set chat list from storage
		chatList.remember(await store.get(chatListStoreId));
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
