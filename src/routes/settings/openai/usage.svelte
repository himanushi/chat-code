<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Icon from '~/components/icon.svelte';
	import { getRangeUsage, type RangeUsage } from '~/lib/getRangeUsage';
	import { apiKey } from '~/store/apiKey';
	import { currencyExchangeRate } from '~/store/currencyExchangeRate';
	import { currencyUnit } from '~/store/currencyUnit';

	let usage: RangeUsage | undefined = undefined;
	let loading = false;
	let error: Error | undefined = undefined;
	const now = new Date();
	$: if ($apiKey) {
		usage = undefined;
		loading = true;
		error = undefined;
		getRangeUsage($apiKey, now)
			.then((u) => {
				usage = u;
			})
			.catch((err) => {
				error = err;
			})
			.finally(() => {
				loading = false;
			});
	}
</script>

<ion-item-divider>
	<ion-label> {$_('usage.title')} </ion-label>
</ion-item-divider>
<ion-item lines="none">
	{$_('usage.this_month_usage', { values: { month: $_(`months.long.${now.getMonth()}`) } })}
</ion-item>
<ion-item lines="none">
	{#if loading}
		<ion-spinner name="dots" />
	{/if}
	{#if error}
		<Icon name="error" color="red" />
		<ion-text color="red">{error}</ion-text>
	{/if}
	{#if usage}
		{((usage.total_usage / 100) * $currencyExchangeRate).toFixed(2)}{$currencyUnit}
		(${(usage.total_usage / 100).toFixed(2)})
	{/if}
</ion-item>
<ion-item lines="none">
	<ion-note slot="start">{$_('usage.currency_exchange_rate')}</ion-note>
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
	<ion-note slot="start">{$_('usage.currency_unit')}</ion-note>
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
