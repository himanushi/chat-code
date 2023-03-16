<script>
	import Icon from '~/components/icon.svelte';
	import { isMarkdown } from '~/store/isMarkdown';
	import { gotoNewChat } from '~/lib/gotoNewChat';
	import Tooltip from '~/components/tooltip.svelte';
	import { _ } from 'svelte-i18n';
	import { conversationMode } from '~/store/conversationMode';
	import { chatService } from '~/machines/chat-machine';
	import RobotButton from './robot-button.svelte';
	import VoiceButton from './voice-button.svelte';

	$: if (chatService) {
		chatService.send({ type: 'SET_CONVERSATION_MODE', conversationMode: $conversationMode });
	}
</script>

<ion-toolbar>
	<ion-buttons slot="start">
		<Tooltip message={$_('chat.new_chat_button_tooltip')}>
			<ion-button on:click={gotoNewChat}>
				<Icon name="add_comment" />
			</ion-button>
		</Tooltip>
		<RobotButton />
		<Tooltip message={$_('chat.markdown_button_tooltip')}>
			<ion-button
				color={$isMarkdown ? 'black' : 'gray'}
				on:click={() => isMarkdown.set(!$isMarkdown)}
			>
				<ion-icon name="logo-markdown" />
			</ion-button>
		</Tooltip>
		<Tooltip message={$_('chat.conversation_mode_button_tooltip')}>
			<ion-button
				color={$conversationMode ? 'black' : 'gray'}
				on:click={() => conversationMode.set(!$conversationMode)}
			>
				<Icon name="forum" />
			</ion-button>
		</Tooltip>
		<VoiceButton />
	</ion-buttons>
</ion-toolbar>
