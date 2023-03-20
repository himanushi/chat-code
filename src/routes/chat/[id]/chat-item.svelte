<script lang="ts">
	import Icon from '~/components/icon.svelte';
	import { markdown } from '~/lib/markdown';
	import { isMarkdown } from '~/store/isMarkdown';
	import { date, time } from 'svelte-i18n';
	import type { ChatCompletionRequestMessageWithTimeStamp } from '~/store/chatList';
	import { chatService } from '~/machines/chat-machine';
	import type { IconNames } from '~/@types/icon';

	export let index = -1;
	export let message: ChatCompletionRequestMessageWithTimeStamp;

	let icon: IconNames;
	$: icon = message.role === 'user' ? 'person' : 'smart_toy';
	$: itemColor = message.role === 'user' ? 'black' : 'dark-gray';
	$: iconColor = message.role === 'user' ? 'blue' : 'green';

	$: markedContent = '';
	$: markdown(message.content, (err, result) => {
		markedContent = '';
		if (err) {
			console.error(err);
			markedContent = message.content;
			return;
		}
		markedContent = String(result);
	});

	let editing = false;
	$: if (message.content) editing = false;
	$: editValue = message.content;
</script>

<ion-item color={itemColor} lines="none">
	<Icon name={icon} color={iconColor} start />
	<ion-buttons slot="end">
		{#if index >= 0}
			<ion-button
				on:click={() => {
					editValue = message.content;
					editing = !editing;
				}}
			>
				<Icon name="edit_note" size="s" />
			</ion-button>
			<ion-button
				color="danger"
				on:click={() => chatService.send({ type: 'DELETE_MESSAGE', index })}
			>
				<Icon name="delete" size="s" />
			</ion-button>
		{/if}
	</ion-buttons>
	{#if message.timestamp}
		<ion-note class="timestamp" slot="end">
			{$date(new Date(message.timestamp), { format: 'medium' })}
			{$time(new Date(message.timestamp), { format: 'medium' })}
		</ion-note>
	{/if}
</ion-item>
{#if editing}
	<ion-item color={itemColor} lines="none">
		<ion-textarea
			class="edit-area"
			auto-grow={true}
			value={editValue}
			on:ionChange={(e) => {
				if (e.detail.value) editValue = e.detail.value;
			}}
		/>
	</ion-item>
	<ion-item color={itemColor} lines="none">
		<ion-buttons slot="start">
			<ion-button
				color="green"
				on:click={() => {
					chatService.send({ type: 'EDIT_MESSAGE', index, content: editValue });
					editing = false;
				}}
			>
				<Icon name="done" size="s" />
			</ion-button>
			<ion-button
				color="red"
				on:click={() => {
					editValue = message.content;
					editing = false;
				}}
			>
				<Icon name="close" size="s" />
			</ion-button>
		</ion-buttons>
	</ion-item>
{:else}
	<ion-item color={itemColor} lines="none">
		{#if $isMarkdown}
			<ion-label class="ion-text-wrap text-select">
				<ion-text>{@html markedContent}</ion-text>
			</ion-label>
		{:else}
			<ion-label class="ion-text-wrap text-select">
				<ion-text>
					{#each message.content.split('\n') as content}
						{content.replaceAll(' ', '\u00a0')}<br />
					{/each}
				</ion-text>
			</ion-label>
		{/if}
	</ion-item>
{/if}

<style>
	.timestamp {
		font-size: 0.8em;
	}

	.edit-area {
		border-radius: 6px;
		border: 1px solid var(--ion-color-medium);
		font-size: 0.8em;
	}
</style>
