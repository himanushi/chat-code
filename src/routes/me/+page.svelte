<script lang="ts">
	import Icon from '~/components/icon.svelte';
	import { chatService } from '~/machines/chat-machine';

	let apiKey: string | undefined = undefined;

	// default value
	$: if (!apiKey && $chatService?.context.apiKey) {
		apiKey = $chatService.context.apiKey;
	}

	// update context
	$: if (apiKey) {
		chatService.send({
			type: 'SET_API_KEY',
			apiKey: apiKey
		});
	}
</script>

<ion-content>
	<ion-list>
		<ion-item-divider>
			<ion-label> OpenAI Settings </ion-label>
		</ion-item-divider>
		<ion-item lines="none">
			<Icon name="key" fill color="yellow" start />
			<ion-label>API Key</ion-label>
			<ion-input
				type="password"
				placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
				value={apiKey}
				on:ionChange={(e) => {
					if (typeof e.target.value === 'string') {
						apiKey = e.target.value;
					}
				}}
			/>
		</ion-item>
	</ion-list>
</ion-content>
