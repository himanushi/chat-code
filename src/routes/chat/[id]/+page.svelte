<script lang="ts">
	import type { Components } from '@ionic/core';
	import { onDestroy, onMount } from 'svelte';
	import Icon from '~/components/icon.svelte';
	import { chatMachine } from '~/machines/chat-machine';
	import RobotChat from './robot-chat.svelte';
	import UserChat from './user-chat.svelte';
	import type { PageData } from './$types';
	import { interpret } from 'xstate';
	import { apiKey } from '~/store/apiKey';
	import { goto } from '$app/navigation';
	import { matches } from '~/lib/matches';

	export let data: PageData;

	let message = '';
	const chatService = interpret(chatMachine);
	const send = () => {
		chatService.send('ADD_MESSAGE', { message, role: 'user' });
		message = '';
	};

	$: id = data.id;
	$: if (id && $apiKey && $chatService && matches($chatService, ['idle'])) {
		chatService.send('INIT', { id, apiKey: $apiKey });
	}

	let contentEle: Components.IonContent | null = null;
	onMount(() => {
		chatService.start();

		// scroll to bottom
		contentEle?.getScrollElement().then((ele) => {
			ele.scrollTo({ top: ele.scrollHeight });
		});
	});

	onDestroy(() => {
		chatService.stop();
	});
</script>

{#if $apiKey && $chatService}
	<ion-content bind:this={contentEle}>
		<ion-list>
			{#each $chatService?.context?.messages ?? [] as message}
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
			<ion-textarea
				rows={1}
				auto-grow={true}
				placeholder="Type a message"
				value={message}
				on:ionChange={(e) => {
					if (e.detail.value || e.detail.value === '') message = e.detail.value;
				}}
			/>
			<ion-buttons slot="end">
				{#if matches($chatService, ['chatting'])}
					<ion-button disabled>
						<ion-spinner name="dots" />
					</ion-button>
				{:else}
					<ion-button disabled={matches($chatService, ['idle']) || !message} on:click={send}>
						<Icon name="send" fill color="white" />
					</ion-button>
				{/if}
			</ion-buttons>
		</ion-toolbar>
	</ion-footer>
{:else}
	<ion-content>
		<ion-item button on:click={() => goto('/me')}>
			<Icon fill name="warning" color="yellow" start />
			<ion-label> API Key を設定してください</ion-label>
		</ion-item>
	</ion-content>
{/if}
