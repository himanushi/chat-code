<script lang="ts">
	import { getRangeUsage, type RangeUsage } from '~/lib/getRangeUsage';
	import { apiKey } from '~/store/apiKey';
	import { currencyExchangeRate } from '~/store/currencyExchangeRate';
	import { currencyUnit } from '~/store/currencyUnit';

	let usage: RangeUsage | undefined = undefined;
	let loading = false;

	const now = new Date();
	$: if ($apiKey) {
		loading = true;
		getRangeUsage($apiKey, now).then((u) => {
			usage = u;
			loading = false;
		});
	}
</script>

<ion-item-divider>
	<ion-label> Usage </ion-label>
</ion-item-divider>
<ion-item lines="none"> {now.getMonth() + 1}月の使用料 </ion-item>
<ion-item lines="none">
	{#if loading}
		<ion-spinner name="dots" />
	{/if}
	{#if usage}
		{((usage.total_usage / 100) * $currencyExchangeRate).toFixed(2)}{$currencyUnit}
		(${(usage.total_usage / 100).toFixed(2)})
	{/if}
</ion-item>
<ion-item lines="none">
	<ion-note slot="start">通貨レート</ion-note>
	<ion-input
		type="number"
		placeholder="100"
		value={$currencyExchangeRate}
		on:ionChange={async (e) => {
			if (typeof e.target.value === 'string') {
				currencyExchangeRate.set(parseInt(e.target.value, 10));
			}
		}}
	/>
</ion-item>
<ion-item lines="none">
	<ion-note slot="start">通貨単位</ion-note>
	<ion-input
		label="Stacked label"
		type="text"
		placeholder="円"
		value={$currencyUnit}
		on:ionChange={async (e) => {
			if (typeof e.target.value === 'string') {
				currencyUnit.set(e.target.value);
			}
		}}
	/>
</ion-item>
