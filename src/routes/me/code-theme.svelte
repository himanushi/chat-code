<script lang="ts">
	import { onMount } from 'svelte';
	import { codeList } from '~/lib/codeList';
	import { markdown } from '~/lib/markdown';
	import { highlightCode } from '~/store/highlightCode';

	const sampleCode = `
\`\`\`js
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\\ß-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             \` class="\${cls}"\`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }

  return (
    <div>
      <web-component>{block}</web-component>
    </div>
  )
}

export  $initHighlight;
\`\`\`
`;

	const addClickEvent = () => {
		setTimeout(
			() =>
				Array.from(document.querySelectorAll('[id^="alert-input-"]')).map((el) => {
					el.addEventListener('focusin', () => {
						const innerHTML = el.querySelector('.alert-radio-label')?.innerHTML;
						if (!innerHTML) return;
						const label = innerHTML.trim();
						const value = codeList.find((code) => code.name === label)?.value;
						if (value) {
							highlightCode.set(value);
						}
					});
				}),
			500
		);
	};

	let markedContent = '';
	onMount(() => {
		markdown(sampleCode, (err, result) => {
			markedContent = String(result);
		});
	});
</script>

<ion-item-divider>
	<ion-label> Code Theme </ion-label>
</ion-item-divider>
<ion-item lines="none">
	<ion-select
		placeholder="Select Code Theme"
		value={$highlightCode}
		on:ionChange={(event) => {
			highlightCode.set(event.detail.value);
		}}
		on:click={() => addClickEvent()}
	>
		{#each codeList as code}
			<ion-select-option value={code.value} on:click={() => console.log('aaa')}>
				{code.name}
			</ion-select-option>
		{/each}
	</ion-select>
</ion-item>
<ion-item>
	<ion-text>
		{@html markedContent}
	</ion-text>
</ion-item>
