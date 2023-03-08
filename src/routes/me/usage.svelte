<script lang="ts">
	import { getRangeUsage, type RangeUsage } from '~/lib/getRangeUsage';
	import { apiKey } from '~/store/apiKey';

	let usage: RangeUsage | undefined = undefined;
	let loading = false;

	$: if ($apiKey) {
		loading = true;
		getRangeUsage($apiKey, new Date()).then((u) => {
			usage = u;
			loading = false;
		});
	}
</script>

<ion-item-divider>
	<ion-label> Usage </ion-label>
</ion-item-divider>
<ion-item lines="none"> 今月の使用量 </ion-item>
<ion-item lines="none">
	{#if loading}
		<ion-spinner name="dots" />
	{/if}
	{#if usage}
		$ {usage.total_usage / 100}
	{/if}
</ion-item>
<ion-item lines="none">
	{#if loading}
		<ion-spinner name="dots" />
	{/if}
	{#if usage}
		{Math.floor((usage.total_usage / 100) * 134)} 円
	{/if}
</ion-item>
