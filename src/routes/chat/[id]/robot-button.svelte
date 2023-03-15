<script lang="ts">
	import type { Components } from '@ionic/core';
	import { _ } from 'svelte-i18n';
	import Icon from '~/components/icon.svelte';
	import Tooltip from '~/components/tooltip.svelte';
	import { chatService } from '~/machines/chat-machine';
	import { openaiModel, models, defaultValue as defaultModel } from '~/store/openaiModel';
	import { openaiTemperature, defaultValue as defaultTemperature } from '~/store/openaiTemperature';
	import { openaiTopP, defaultValue as defaultTopP } from '~/store/openaiTopP';

	let modal: Components.IonModal;

	$: chatService.send({ type: 'SET_MODEL', model: $openaiModel });
	$: chatService.send({ type: 'SET_TEMPERATURE', temperature: $openaiTemperature });
	$: chatService.send({ type: 'SET_TOP_P', topP: $openaiTopP });
</script>

<Tooltip message={$_('chat.robot_button_tooltip')}>
	<ion-button id="robot-modal" on:click={() => console.log('')}>
		<Icon name="smart_toy" />
	</ion-button>
</Tooltip>
<ion-modal trigger="robot-modal" bind:this={modal}>
	<ion-header>
		<ion-toolbar>
			<ion-title>{$_('openai_api_settings.title')}</ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content>
		<ion-list-header>
			<ion-label> Model </ion-label>
		</ion-list-header>
		<ion-select
			value={$openaiModel}
			placeholder="Select Model"
			interface="action-sheet"
			on:ionChange={(e) => openaiModel.set(e.detail.value)}
		>
			{#each models as model}
				<ion-select-option value={model.name}>{model.name}</ion-select-option>
			{/each}
		</ion-select>
		<ion-item lines="none">
			<ion-label>
				{models.find((m) => m.name === $openaiModel)?.description}
			</ion-label>
		</ion-item>
		<ion-item lines="none">
			<ion-label> Prompt Price </ion-label>
			<ion-label slot="end">
				$ {models.find((m) => m.name === $openaiModel)?.promptPrice} / 1 Token
			</ion-label>
		</ion-item>
		<ion-item lines="none">
			<ion-label> Completion Price </ion-label>
			<ion-label slot="end">
				$ {models.find((m) => m.name === $openaiModel)?.completionPrice} / 1 Token
			</ion-label>
		</ion-item>
		<ion-item>
			<ion-button slot="end" color="red" on:click={() => openaiModel.set(defaultModel)}>
				<Icon name="redo" size="s" />
				<ion-label> {$_('openai_api_settings.redo')} </ion-label>
			</ion-button>
		</ion-item>

		<ion-list-header>
			<ion-label> Temperature sampling </ion-label>
		</ion-list-header>
		<ion-item lines="none">
			<ion-label class="ion-text-wrap">
				{$_('openai_api_settings.temperature_description')}
			</ion-label>
		</ion-item>
		<ion-item lines="none">
			<ion-input
				value={$openaiTemperature}
				type="number"
				max={2}
				min={0}
				placeholder="Input Temperature"
				on:ionChange={(e) => {
					if (typeof e.detail.value === 'string' && e.detail.value !== '') {
						openaiTemperature.set(parseFloat(e.detail.value));
					}
				}}
			/>
		</ion-item>
		<ion-item lines="none">
			<ion-button slot="end" color="red" on:click={() => openaiTemperature.set(defaultTemperature)}>
				<Icon name="redo" size="s" />
				<ion-label>{$_('openai_api_settings.redo')}</ion-label>
			</ion-button>
		</ion-item>

		<ion-list-header>
			<ion-label> Top-p (nucleus) sampling </ion-label>
		</ion-list-header>
		<ion-item lines="none">
			<ion-label class="ion-text-wrap">
				{$_('openai_api_settings.top_p_description')}
			</ion-label>
		</ion-item>
		<ion-item lines="none">
			<ion-input
				value={$openaiTopP}
				type="number"
				max={1}
				min={0}
				placeholder="Input Top-p"
				on:ionChange={(e) => {
					if (typeof e.detail.value === 'string' && e.detail.value !== '') {
						openaiTopP.set(parseFloat(e.detail.value));
					}
				}}
			/>
		</ion-item>
		<ion-item lines="none">
			<ion-button slot="end" color="red" on:click={() => openaiTopP.set(defaultTopP)}>
				<Icon name="redo" size="s" />
				<ion-label>{$_('openai_api_settings.redo')}</ion-label>
			</ion-button>
		</ion-item>
	</ion-content>
	<ion-footer>
		<ion-toolbar>
			<ion-buttons>
				<ion-button on:click={() => modal?.dismiss()}>
					<Icon name="close" />
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-footer>
</ion-modal>
