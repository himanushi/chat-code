<script lang="ts">
	import { onMount } from 'svelte';

	import Icon from '~/components/icon.svelte';
	import { chatService } from '~/machines/chat-machine';
	import { store } from '~/store/store';
	let apiKey: string | undefined = undefined;

	$: if (apiKey) {
		chatService.send({
			type: 'INIT_OPENAI',
			apiKey: apiKey
		});
	}

	onMount(async () => {
		apiKey = await store.get<string>('apiKey');
	});
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
