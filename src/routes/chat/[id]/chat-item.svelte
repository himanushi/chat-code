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
</script>

<ion-item color={itemColor} lines="none">
	<Icon name={icon} {fill} color={iconColor} start />
</ion-item>
<ion-item color={itemColor} lines="none">
	{#if $isMarkdown}
		<ion-label class="ion-text-wrap text-select">{@html markdown(message.content)}</ion-label>
	{:else}
		<ion-label class="ion-text-wrap text-select">
			{@html message.content.replaceAll('\n', '<br>')}
		</ion-label>
	{/if}
</ion-item>
