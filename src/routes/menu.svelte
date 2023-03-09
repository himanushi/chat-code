<script lang="ts">
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';
	import { v4 as uuid } from 'uuid';
	import Icon from '~/components/icon.svelte';
	import { chatService } from '~/machines/chat-machine';
	import { chatList } from '~/store/chatList';
</script>

<ion-menu content-id="menu" max-edge-start={0}>
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-button>
					<ion-menu-toggle>
						<Icon name="close" />
					</ion-menu-toggle>
				</ion-button>
			</ion-buttons>
			<ion-title>{$_('menu.title')}</ion-title>
		</ion-toolbar>
		<ion-menu-toggle auto-hide={false}>
			<ion-card color="dark-gray" button on:click={() => goto(`/chat/${uuid()}`)}>
				<ion-card-content> + {$_('menu.new_chat')} </ion-card-content>
			</ion-card>
		</ion-menu-toggle>
	</ion-header>
	<ion-content>
		<ion-menu-toggle auto-hide={false}>
			{#each [...($chatList ?? [])].reverse() as chat}
				{@const title = chat.content.messages[0]?.content ?? $_('menu.new_chat')}
				<ion-item
					lines="none"
					color={$chatService?.context.id === chat.id ? 'dark-gray' : 'black'}
					button
					on:click={() => goto(`/chat/${chat.id}`)}
					detail={false}
				>
					<ion-label> {title} </ion-label>
					<ion-buttons>
						<ion-button
							color="danger"
							on:click={() => {
								chatList.delete(chat.id);
							}}
						>
							<Icon name="delete" size="s" fill />
						</ion-button>
					</ion-buttons>
				</ion-item>
			{/each}
		</ion-menu-toggle>
	</ion-content>
	<ion-footer>
		<ion-list>
			<ion-list-header>
				<ion-label>{$_('menu.settings')}</ion-label>
			</ion-list-header>
			<ion-menu-toggle auto-hide={false}>
				<ion-item button on:click={() => goto('/me')} lines="none">
					<Icon name="person" size="s" fill />
					<ion-label>{$_('menu.my_account')}</ion-label>
				</ion-item>
			</ion-menu-toggle>
		</ion-list>
	</ion-footer>
</ion-menu>
