<script lang="ts">
	import type { Components } from '@ionic/core';
	import { _ } from 'svelte-i18n';
	import Icon from '~/components/icon.svelte';
	import Tooltip from '~/components/tooltip.svelte';
	import { messageTemplates } from '~/store/messageTemplates';
	import { selectedMessageTemplateIndex } from '~/store/selectedMessageTemplateIndex';

	let modal: Components.IonModal;
	let title: string | undefined;
	let message: string | undefined;
	let status: 'add' | 'edit' = 'add';

	$: disabled = $selectedMessageTemplateIndex === -1;
</script>

<ion-toolbar>
	{#if $messageTemplates.length > 0}
		<ion-buttons slot="start">
			<Tooltip message={$_('message_templates.reset_button_description')}>
				<ion-button
					on:click={() => {
						selectedMessageTemplateIndex.set(-1);
					}}
				>
					<Icon color="red" name={'disabled_by_default'} />
				</ion-button>
			</Tooltip>
		</ion-buttons>
		{#key $messageTemplates}
			<ion-select
				interface={'action-sheet'}
				class="select-message-templates"
				value={$selectedMessageTemplateIndex}
				on:ionChange={(e) => {
					selectedMessageTemplateIndex.set(e.detail.value);
				}}
			>
				<ion-select-option value={-1}>{$_('message_templates.no_templates')}</ion-select-option>
				{#each $messageTemplates as template, index}
					<ion-select-option value={index}>{template.title}</ion-select-option>
				{/each}
			</ion-select>
		{/key}
		<ion-buttons slot="end">
			<Tooltip message={$_('message_templates.add_button_description')}>
				<ion-button
					on:click={() => {
						status = 'add';
						title = undefined;
						message = undefined;
						modal.present();
					}}
				>
					<Icon name={'playlist_add'} />
				</ion-button>
			</Tooltip>
			<Tooltip message={$_('message_templates.edit_button_description')}>
				<ion-button
					{disabled}
					on:click={() => {
						status = 'edit';
						const template = $messageTemplates[$selectedMessageTemplateIndex];
						title = template?.title;
						message = template?.message;
						modal.present();
					}}
				>
					<Icon name={'edit_note'} />
				</ion-button>
			</Tooltip>
			<Tooltip message={$_('message_templates.delete_button_description')}>
				<ion-button
					color="red"
					{disabled}
					on:click={() => {
						messageTemplates.remove($selectedMessageTemplateIndex);
						selectedMessageTemplateIndex.set(-1);
					}}
				>
					<Icon name="delete" />
				</ion-button>
			</Tooltip>
		</ion-buttons>
	{:else}
		<ion-buttons slot="start">
			<Tooltip message={$_('message_templates.add_button_description')}>
				<ion-button on:click={() => modal.present()}>
					<Icon name={'playlist_add'} />
				</ion-button>
			</Tooltip>
		</ion-buttons>
	{/if}
</ion-toolbar>
<ion-modal bind:this={modal}>
	<ion-header>
		<ion-toolbar>
			<ion-title>{$_(`message_templates.${status}_title`)}</ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content>
		<ion-list>
			<ion-item>
				<ion-label position="stacked">{$_('message_templates.modal_title')}</ion-label>
				<ion-input
					type="text"
					value={title}
					on:ionChange={(e) => {
						if ((e.detail.value || e.detail.value === '') && typeof e.detail.value === 'string')
							title = e.detail.value;
					}}
				/>
			</ion-item>
			<ion-item>
				<ion-label position="stacked">{$_('message_templates.modal_message')}</ion-label>
				<ion-textarea
					value={message}
					auto-grow={true}
					rows={5}
					on:ionChange={(e) => {
						if ((e.detail.value || e.detail.value === '') && typeof e.detail.value === 'string')
							message = e.detail.value;
					}}
				/>
			</ion-item>
		</ion-list>
	</ion-content>
	<ion-footer>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-button on:click={() => modal?.dismiss()}>
					<Icon name="close" />
				</ion-button>
			</ion-buttons>
			<ion-buttons slot="end">
				<ion-button
					color="green"
					on:click={() => {
						if (title && message) {
							if (status === 'edit')
								messageTemplates.edit($selectedMessageTemplateIndex, { title, message });
							else messageTemplates.push({ title, message });
						}
						modal?.dismiss();
					}}
				>
					<Icon name="done" />
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-footer>
</ion-modal>

<style>
	.select-message-templates {
		border: 1px solid #666;
		border-radius: 6px;
	}
</style>
