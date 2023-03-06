<script lang="ts">
	let apiKey: string | number | null | undefined = undefined;
</script>

<ion-list>
	<ion-item>
		<ion-label>API Key</ion-label>
		<ion-input
			type="text"
			placeholder="XXXXXX"
			value={apiKey}
			on:ionChange={(e) => (apiKey = e.target.value)}
		/>
	</ion-item>
</ion-list>
