<script lang="ts">
	import Icon from '~/components/icon.svelte';
</script>

<ion-content>
	<ion-list>
		<ion-item>
			<Icon name="smart_toy" fill color="green" start />
			<ion-label class="ion-text-wrap"> 何でも質問しろよな！ </ion-label>
		</ion-item>
		<ion-item>
			<Icon name="person" fill color="blue" start />
		</ion-item>
	</ion-list>
</ion-content>
<ion-footer>
	<ion-toolbar>
		<ion-textarea auto-grow={true} placeholder="Type a message" />
		<ion-buttons slot="end">
			<ion-button>
				<Icon name="send" fill color="white" />
			</ion-button>
		</ion-buttons>
	</ion-toolbar>
</ion-footer>
