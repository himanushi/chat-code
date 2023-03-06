<script lang="ts">
	import Icon from '~/components/icon.svelte';
	import type { ChatCompletionRequestMessage } from 'openai';

	export let message: ChatCompletionRequestMessage;
</script>

<ion-item>
	<Icon name="person" fill color="blue" start />
	<ion-label class="ion-text-wrap">{message.content}</ion-label>
</ion-item>
