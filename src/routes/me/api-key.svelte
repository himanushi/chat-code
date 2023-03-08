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
<ion-item>
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
<ion-item button target="_blank" href="https://platform.openai.com/account/api-keys">
	<Icon name="link" color="yellow" start />
	<ion-label>API Key の取得はこちらから</ion-label>
</ion-item>
<ion-item>
	<Icon name="info" color="blue" start />
	<ion-label class="ion-text-wrap">
		API Key
		はローカルに保存されています。これは静的なアプリで、サーバーでは保持していません。ブラウザのローカルストレージに保存されています。
	</ion-label>
</ion-item>
