<script lang="ts">
	import Icon from '~/components/icon.svelte';
	import { markdown } from '~/lib/markdown';
	import { isMarkdown } from '~/store/isMarkdown';
	import { date, time } from 'svelte-i18n';
	import type { ChatCompletionRequestMessageWithTimeStamp } from '~/store/chatList';

	export let message: ChatCompletionRequestMessageWithTimeStamp;

	const itemColor = message.role === 'user' ? 'black' : 'dark-gray';
	const icon = message.role === 'user' ? 'person' : 'smart_toy';
	const iconColor = message.role === 'user' ? 'blue' : 'green';

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
</script>

<ion-item color={itemColor} lines="none">
	<Icon name={icon} color={iconColor} start />
	{#if message.timestamp}
		<ion-note class="timestamp" slot="end">
			{$date(new Date(message.timestamp), { format: 'medium' })}
			{$time(new Date(message.timestamp), { format: 'medium' })}
		</ion-note>
	{/if}
</ion-item>
<ion-item color={itemColor} lines="none">
	{#if $isMarkdown}
		<ion-label class="ion-text-wrap text-select"
			><ion-text>{@html markedContent}</ion-text></ion-label
		>
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

<style>
	.timestamp {
		font-size: 0.8em;
	}
</style>
