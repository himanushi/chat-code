<script lang="ts">
	import { menuController } from '@ionic/core';

	const closeMenu = () => {
		menuController.open('main-content');
	};
</script>

<ion-menu content-id="main-content">
	<ion-header>
		<ion-toolbar>
			<ion-title>Menu</ion-title>
			<ion-buttons slot="start">
				<ion-button on:click={closeMenu}>
					<ion-icon slot="icon-only" name="close" />
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-item button href="/me" on:click={closeMenu}> Settings </ion-item>
	<ion-content>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
		<ion-item button> Settings </ion-item>
	</ion-content>
</ion-menu>
