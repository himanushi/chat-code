<script lang="ts">
	import Icon from '~/components/icon.svelte';
	import { chatService } from '~/machines/chat-machine';
	import ChatItem from './chat-item.svelte';
	import type { PageData } from './$types';
	import { apiKey } from '~/store/apiKey';
	import { goto } from '$app/navigation';
	import { matches } from '~/lib/matches';
	import { currencyUnit } from '~/store/currencyUnit';
	import { currencyExchangeRate } from '~/store/currencyExchangeRate';
	import Toolbar from './toolbar.svelte';
	import { _ } from 'svelte-i18n';
	import type { Components } from '@ionic/core';

	export let data: PageData;

	let message = '';
	const send = () => {
		chatService.send({ type: 'ADD_MESSAGES', messages: [{ content: message, role: 'user' }] });
		message = '';
	};

	$: tokens = $chatService
		? $chatService.context.usages.map((u) => u.total_tokens).reduce((a, b) => a + b, 0)
		: 0;
	$: id = data.id;
	$: if (id && $apiKey && $chatService && matches($chatService, ['idle'])) {
		chatService.send([{ type: 'SET_API_TOKEN', apiKey: $apiKey }, { type: 'SET_ID', id }, 'INIT']);
	}
	$: if (id) {
		chatService.send({ type: 'SET_ID', id });
	}

	let content: Components.IonContent | undefined;
	$: if (content && $chatService && $chatService.context.streamMessage) {
		content.scrollToBottom(300);
	}

	$: currency = (tokens * 0.000002 * $currencyExchangeRate).toFixed(2) + $currencyUnit;
</script>

{#if $apiKey && $chatService}
	<ion-content bind:this={content}>
		<ion-list>
			{#each $chatService.context.messages as message}
				<ChatItem {message} />
			{/each}
			{#if $chatService.context.streamMessage}
				<ChatItem message={{ content: $chatService.context.streamMessage, role: 'assistant' }} />
			{/if}
			<ion-item lines="none">
				<ion-note>
					{$_('chat.usage_tokens', { values: { tokens, currency } })}
				</ion-note>
			</ion-item>
		</ion-list>
	</ion-content>
	<ion-footer>
		<Toolbar />
		<ion-toolbar>
			<ion-textarea
				class="text-input"
				rows={1}
				auto-grow={true}
				placeholder={$_('chat.input_placeholder')}
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
			<ion-label> {$_('chat.please_set_api_key')} </ion-label>
		</ion-item>
	</ion-content>
{/if}

<style>
	.text-input {
		border: 1px solid #666;
		border-radius: 6px;
		padding: 0 6px;
	}
</style>
