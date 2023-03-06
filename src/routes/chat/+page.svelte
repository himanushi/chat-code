<script lang="ts">
	import type { Components } from '@ionic/core';
	import { onMount } from 'svelte';
	import Icon from '~/components/icon.svelte';
	import RobotChat from './robotChat.svelte';
	import UserChat from './userChat.svelte';

	let contentEle: Components.IonContent | null = null;

	onMount(() => {
		contentEle?.getScrollElement().then((ele) => {
			ele.scrollTo({ top: ele.scrollHeight });
		});
	});
</script>

<ion-content bind:this={contentEle}>
	<ion-list>
		<UserChat />
	</ion-list>
</ion-content>
<ion-footer>
	<ion-toolbar>
		<ion-buttons slot="start">
			<ion-button>
				<Icon name="person" fill color="blue" />
			</ion-button>
		</ion-buttons>
		<ion-textarea rows={1} auto-grow={true} placeholder="Type a message" />
		<ion-buttons slot="end">
			<ion-button>
				<Icon name="send" fill color="white" />
			</ion-button>
		</ion-buttons>
	</ion-toolbar>
</ion-footer>
