<script lang="ts">
	import Icon from '~/components/icon.svelte';
	let apiKey: string | number | null | undefined = undefined;
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
				on:ionChange={(e) => (apiKey = e.target.value)}
			/>
		</ion-item>
	</ion-list>
</ion-content>
