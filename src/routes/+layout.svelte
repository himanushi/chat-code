<script lang="ts">
	import { onMount } from 'svelte';
	import { initialize } from '@ionic/core';
	import '~/theme/custom.css';
	import '~/theme/variables.css';
	import Menu from './menu.svelte';
	import Icon from '~/components/icon.svelte';
	import { highlightCode } from '~/store/highlightCode';
	import { addMessages, getLocaleFromNavigator, init, isLoading, _ } from 'svelte-i18n';
	import en from '~/i18n/en.json';
	import ja from '~/i18n/ja.json';
	import { locale } from '~/store/locale';

	$: if ($locale) {
		init({
			fallbackLocale: 'en',
			initialLocale: $locale ?? getLocaleFromNavigator()
		});
	}

	let ready = false;
	onMount(async () => {
		// initialize ionic
		initialize({
			animated: true,
			mode: 'ios'
		});

		// initialize locale
		addMessages('en', en);
		addMessages('en-US', en);
		addMessages('ja', ja);
		await init({
			fallbackLocale: 'en',
			initialLocale: $locale ?? getLocaleFromNavigator()
		});

		ready = true;
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href={`https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/${$highlightCode}.min.css`}
	/>
</svelte:head>

{#if !$isLoading && ready}
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
						<ion-title> {$_('welcome')} Chat Code </ion-title>
						<ion-buttons slot="end">
							<ion-button id="header-translate-button">
								<Icon name="translate" size="s" />
							</ion-button>
							<ion-popover trigger="header-translate-button" trigger-action="click">
								<ion-content>
									<ion-item on:click={() => locale.set('en')}> English </ion-item>
									<ion-item on:click={() => locale.set('ja')}> 日本語 </ion-item>
								</ion-content>
							</ion-popover>
						</ion-buttons>
					</ion-toolbar>
				</ion-header>
				<slot />
			</div>
		</ion-split-pane>
	</ion-app>
{:else}
	<ion-app>
		<ion-content>
			<ion-spinner />
		</ion-content>
	</ion-app>
{/if}
