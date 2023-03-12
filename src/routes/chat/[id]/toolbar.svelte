<script>
	import Icon from '~/components/icon.svelte';
	import { isMarkdown } from '~/store/isMarkdown';
	import { gotoNewChat } from '~/lib/gotoNewChat';
</script>

<ion-toolbar>
	<ion-buttons slot="start">
		<ion-button on:click={gotoNewChat}>
			<Icon name="add_comment" />
		</ion-button>
		<ion-button
			color={$isMarkdown ? 'black' : 'gray'}
			on:click={() => isMarkdown.set(!$isMarkdown)}
		>
			<ion-icon name="logo-markdown" />
		</ion-button>
	</ion-buttons>
</ion-toolbar>
