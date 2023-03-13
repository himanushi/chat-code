<script>
	import Icon from '~/components/icon.svelte';
	import { isMarkdown } from '~/store/isMarkdown';
	import { gotoNewChat } from '~/lib/gotoNewChat';
	import Tooltip from '~/components/tooltip.svelte';
	import { _ } from 'svelte-i18n';
</script>

<ion-toolbar>
	<ion-buttons slot="start">
		<Tooltip message={$_('chat.new_chat_button_tooltip')}>
			<ion-button on:click={gotoNewChat}>
				<Icon name="add_comment" />
			</ion-button>
		</Tooltip>
		<Tooltip message={$_('chat.markdown_button_tooltip')}>
			<ion-button
				color={$isMarkdown ? 'black' : 'gray'}
				on:click={() => isMarkdown.set(!$isMarkdown)}
			>
				<ion-icon name="logo-markdown" />
			</ion-button>
		</Tooltip>
	</ion-buttons>
</ion-toolbar>
