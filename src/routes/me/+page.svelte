<script lang="ts">
	import Icon from '~/components/icon.svelte';
	import { getRangeUsage, type RangeUsage } from '~/lib/getRangeUsage';
	import { apiKey } from '~/store/apiKey';

	let key: string | undefined = undefined;
	let usage: RangeUsage | undefined = undefined;

	$: if (!key && $apiKey) {
		key = $apiKey;
		getRangeUsage($apiKey, new Date()).then((u) => {
			usage = u;
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
				value={key}
				on:ionChange={async (e) => {
					if (typeof e.target.value === 'string') {
						key = e.target.value;
						apiKey.update(key);
					}
				}}
			/>
		</ion-item>
		<ion-item-divider>
			<ion-label> Usage </ion-label>
		</ion-item-divider>
		{#if usage}
			<ion-item lines="none"> 今月の使用量 </ion-item>
			<ion-item lines="none">
				{usage.total_usage / 100} $
			</ion-item>
			<ion-item lines="none">
				{Math.floor((usage.total_usage / 100) * 134)} 円
			</ion-item>
		{/if}
	</ion-list>
</ion-content>
