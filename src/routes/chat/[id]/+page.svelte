<script lang="ts">
	import type { Components } from '@ionic/core';
	import { onMount } from 'svelte';
	import Icon from '~/components/icon.svelte';
	import { chatService } from '~/machines/chat-machine';
	import RobotChat from './robot-chat.svelte';
	import UserChat from './user-chat.svelte';
	import type { PageData } from './$types';

	let contentEle: Components.IonContent | null = null;

	export let data: PageData;
	$: id = data.id;
	$: if (id) {
		console.log(id);
	}

	onMount(() => {
		// scroll to bottom
		contentEle?.getScrollElement().then((ele) => {
			ele.scrollTo({ top: ele.scrollHeight });
		});
	});
</script>

<ion-content bind:this={contentEle}>
	<ion-list>
		{#each $chatService?.context.messages as message}
			{#if message.role === 'assistant'}
				<RobotChat {message} />
			{:else if message.role === 'user'}
				<UserChat {message} />
			{/if}
		{/each}
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
