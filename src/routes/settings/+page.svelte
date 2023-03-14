<script lang="ts">
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';
	import Icon from '~/components/icon.svelte';
</script>

<ion-content>
	<ion-list>
		<ion-list-header>
			<ion-label>{$_('settings.title')}</ion-label>
		</ion-list-header>
		<ion-item button on:click={() => goto('/settings/openai')}>
			<Icon name="smart_toy" color="green" />
			<ion-label>{$_('settings.openai_settings')}</ion-label>
		</ion-item>
		<ion-item button on:click={() => goto('/settings/theme')}>
			<Icon name="palette" color="yellow" />
			<ion-label>{$_('settings.theme_settings')}</ion-label>
		</ion-item>
	</ion-list>
</ion-content>
<ion-footer>
	<ion-toolbar>
		<ion-note
			class="clickable"
			slot="end"
			on:click={() => goto('https://github.com/himanushi/chat-code')}
		>
			Github{'|'}
		</ion-note>
		<ion-note
			class="clickable"
			slot="end"
			on:click={() => goto('https://twitter.com/himanushi777')}
		>
			@himanushi777
		</ion-note>
	</ion-toolbar>
</ion-footer>
