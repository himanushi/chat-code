<script lang="ts">
	import Icon from '~/components/icon.svelte';
	import type { ChatCompletionRequestMessage, CreateCompletionResponseUsage } from 'openai';

	export let message: ChatCompletionRequestMessage;

	const itemColor = message.role === 'user' ? 'black' : 'dark-gray';
	const icon = message.role === 'user' ? 'person' : 'smart_toy';
	const iconColor = message.role === 'user' ? 'blue' : 'green';
</script>

<ion-item color={itemColor} lines="none">
	<Icon name={icon} fill color={iconColor} start />
	<ion-label class="ion-text-wrap">{message.content}</ion-label>
</ion-item>
