<script lang="ts">
	import Icon from '~/components/icon.svelte';
	import { apiKey } from '~/store/apiKey';

	let key: string | undefined = undefined;

	$: if (!key && $apiKey) {
		key = $apiKey;
	}
</script>

<ion-item-divider>
	<ion-label> OpenAI Settings </ion-label>
</ion-item-divider>
<ion-item lines="none">
	<Icon name="key" fill color="yellow" start />
	<ion-label>API Key</ion-label>
	<ion-input
		type="password"
		placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		value={key}
		on:ionChange={async (e) => {
			if (typeof e.target.value === 'string') {
				key = e.target.value;
				apiKey.set(key);
			}
		}}
	/>
</ion-item>
