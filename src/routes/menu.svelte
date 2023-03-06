<script lang="ts">
	import Icon from '~/components/icon.svelte';
</script>

<ion-menu content-id="menu">
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
			<ion-card color="gray" button href="/chat">
				<ion-card-content> + New Chat </ion-card-content>
			</ion-card>
		</ion-menu-toggle>
	</ion-header>
	<ion-content>
		<ion-menu-toggle auto-hide={false}>
			<ion-item button href="/chat"> Chat </ion-item>
		</ion-menu-toggle>
	</ion-content>
	<ion-footer>
		<ion-list>
			<ion-list-header>
				<ion-label>Settings</ion-label>
			</ion-list-header>
			<ion-menu-toggle auto-hide={false}>
				<ion-item button href="/me">
					<Icon name="person" size="s" fill />
					<ion-label>My Account</ion-label>
				</ion-item>
			</ion-menu-toggle>
		</ion-list>
	</ion-footer>
</ion-menu>
