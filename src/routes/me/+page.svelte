<script lang="ts">
	import { apiKey } from '~/store/apiKey';
	import ApiKey from './api-key.svelte';
	import CodeTheme from './code-theme.svelte';
	import Usage from './usage.svelte';

	let key: string | undefined = undefined;

	$: if (!key && $apiKey) {
		key = $apiKey;
	}
</script>

<ion-content>
	<ion-list>
		<ApiKey />
		<Usage />
		<CodeTheme />
	</ion-list>
</ion-content>
