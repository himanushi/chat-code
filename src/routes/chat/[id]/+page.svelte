<script lang="ts">
	import type { Components } from '@ionic/core';
	import { onDestroy, onMount } from 'svelte';
	import Icon from '~/components/icon.svelte';
	import { chatMachine } from '~/machines/chat-machine';
	import ChatItem from './chat-item.svelte';
	import type { PageData } from './$types';
	import { interpret } from 'xstate';
	import { apiKey } from '~/store/apiKey';
	import { goto } from '$app/navigation';
	import { matches } from '~/lib/matches';

	export let data: PageData;

	let message = '';
	const chatService = interpret(chatMachine);
	const send = () => {
		chatService.send({ type: 'ADD_MESSAGES', messages: [{ content: message, role: 'user' }] });
		message = '';
	};

	$: tokens = $chatService
		? $chatService.context.usages.map((u) => u.total_tokens).reduce((a, b) => a + b, 0)
		: 0;
	$: id = data.id;
	$: if (id && $apiKey && $chatService && matches($chatService, ['idle'])) {
		chatService.send({ type: 'SET_API_TOKEN', apiKey: $apiKey });
		chatService.send({ type: 'SET_ID', id });
		chatService.send('INIT');
	}
	$: if (id) {
		chatService.send({ type: 'SET_ID', id });
	}

	$: if ($chatService && $chatService.context.messages) {
		contentEle?.getScrollElement().then((ele) => {
			ele.scrollTo({ top: ele.scrollHeight });
		});
	}

	let contentEle: Components.IonContent | null = null;
	onMount(() => {
		chatService.start();
	});

	onDestroy(() => {
		chatService.stop();
	});
</script>

{#if $apiKey && $chatService}
	<ion-content bind:this={contentEle}>
		<ion-list>
			{#each $chatService.context.messages as message, index}
				<ChatItem {message} />
			{/each}
			{#if matches($chatService, ['chatting'])}
				<ion-item color="dark-gray" lines="none">
					<Icon name="smart_toy" color="green" fill start />
					<ion-spinner name="bubbles" />
				</ion-item>
			{/if}
			<ion-item lines="none">
				<ion-note>
					{tokens} Tokens used, {tokens * 0.000002 * 135} 円
				</ion-note>
			</ion-item>
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
						<ion-spinner name="bubbles" />
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
