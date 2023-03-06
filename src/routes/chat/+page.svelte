<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '~/components/icon.svelte';
	let contentEle: HTMLIonContentElement | null = null;

	onMount(() => {});
</script>

<ion-content bind:this={contentEle}>
	<ion-list>
		<ion-item>
			<Icon name="smart_toy" fill color="green" start />
			<ion-label class="ion-text-wrap" />
		</ion-item>
		<ion-item>
			<Icon name="person" fill color="blue" start />
		</ion-item>
	</ion-list>
</ion-content>
<ion-footer>
	<ion-toolbar>
		<ion-buttons slot="start">
			<ion-button>
				<Icon name="person" fill color="blue" />
			</ion-button>
		</ion-buttons>
		<ion-textarea rows={1} auto-grow={true} placeholder="Type a message" />
		<ion-buttons slot="end">
			<ion-button>
				<Icon name="send" fill color="white" />
			</ion-button>
		</ion-buttons>
	</ion-toolbar>
</ion-footer>
