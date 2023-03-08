<script lang="ts">
	import Icon from '~/components/icon.svelte';
	import type { ChatCompletionRequestMessage } from 'openai';
	import { markdown } from '~/lib/markdown';
	import { isMarkdown } from '~/store/isMarkdown';

	export let message: ChatCompletionRequestMessage;

	const itemColor = message.role === 'user' ? 'black' : 'dark-gray';
	const icon = message.role === 'user' ? 'person' : 'smart_toy';
	const iconColor = message.role === 'user' ? 'blue' : 'green';
	const fill = message.role === 'user';

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
	<Icon name={icon} {fill} color={iconColor} start />
</ion-item>
<ion-item color={itemColor} lines="none">
	<ion-text>
		{#if $isMarkdown}
			<ion-label class="ion-text-wrap text-select">{@html markedContent}</ion-label>
		{:else}
			<ion-label class="ion-text-wrap text-select">
				{#each message.content.split('\n') as content}
					{content.replaceAll(' ', '\u00a0')}<br />
				{/each}
			</ion-label>
		{/if}
	</ion-text>
</ion-item>
