<script>
	import Icon from '~/components/icon.svelte';
	import { isMarkdown } from '~/store/isMarkdown';
	import { v4 as uuid } from 'uuid';
	import { goto } from '$app/navigation';
</script>

<ion-toolbar>
	<ion-buttons slot="start">
		<ion-button on:click={() => goto(`/chat/${uuid()}`)}>
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
