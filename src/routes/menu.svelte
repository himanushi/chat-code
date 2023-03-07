<script lang="ts">
	import { goto } from '$app/navigation';
	import { v4 as uuid } from 'uuid';
	import Icon from '~/components/icon.svelte';
</script>

<ion-menu content-id="menu" max-edge-start={0}>
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-button>
					<ion-menu-toggle>
						<Icon name="close" size="s" />
					</ion-menu-toggle>
				</ion-button>
			</ion-buttons>
			<ion-title>Menu</ion-title>
		</ion-toolbar>
		<ion-menu-toggle auto-hide={false}>
			<ion-card color="gray" button on:click={() => goto(`/chat/${uuid()}`)}>
				<ion-card-content> + New Chat </ion-card-content>
			</ion-card>
		</ion-menu-toggle>
	</ion-header>
	<ion-content>
		<ion-menu-toggle auto-hide={false}>
			<!-- <ion-item button on:click={() => goto('/chat')}>
				<Icon name="chat" fill size="s" />
				<ion-label> Chat </ion-label>
			</ion-item> -->
		</ion-menu-toggle>
	</ion-content>
	<ion-footer>
		<ion-list>
			<ion-list-header>
				<ion-label>Settings</ion-label>
			</ion-list-header>
			<ion-menu-toggle auto-hide={false}>
				<ion-item button on:click={() => goto('/me')}>
					<Icon name="person" size="s" fill />
					<ion-label>My Account</ion-label>
				</ion-item>
			</ion-menu-toggle>
		</ion-list>
	</ion-footer>
</ion-menu>
