<script lang="ts">
	import Icon from '~/components/icon.svelte';
	import type { ChatCompletionRequestMessage } from 'openai';

	export let message: ChatCompletionRequestMessage;
</script>

<ion-item color="dark-gray">
	<Icon name="smart_toy" fill color="green" start />
	<ion-label class="ion-text-wrap">{message.content}</ion-label>
</ion-item>
