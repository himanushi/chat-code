<script lang="ts">
	import { loadingController } from '@ionic/core';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Icon from '~/components/icon.svelte';
	import Tooltip from '~/components/tooltip.svelte';
	import { matches } from '~/lib/matches';
	import { chatService } from '~/machines/chat-machine';
	import { locale } from '~/store/locale';

	const langMap = {
		ja: 'ja-JP',
		en: 'en-US'
	};
	$: lang = langMap[($locale ? $locale : 'ja') as keyof typeof langMap];
	let recoding = false;
	let recognition: SpeechRecognition | undefined = undefined;
	let loadingEle: HTMLIonLoadingElement | undefined = undefined;
	let mediaStream: MediaStream | undefined = undefined;
	let conversationVoiceMode = false;
	let message: string | undefined = undefined;
	const record = () => {
		recoding = true;
		navigator.mediaDevices
			.getUserMedia({
				audio: {
					echoCancellation: true,
					autoGainControl: true,
					noiseSuppression: true,
					latency: { max: 20 }
				}
			})
			.then((stream) => {
				mediaStream = stream;
				/*eslint no-undef: "off"*/
				recognition = new webkitSpeechRecognition();
				recognition.lang = lang;
				recognition.addEventListener('start', () => {
					message = undefined;
					loadingController
						.create({
							message: $_('chat.voice_recording'),
							spinner: 'circles',
							backdropDismiss: true
						})
						.then((l) => {
							l.present();
							loadingEle = l;
							l.onDidDismiss().then(() => {
								if (message === undefined) {
									recoding = false;
									stop();
								}
							});
						});
				});
				recognition.addEventListener('result', (event) => {
					const text = event.results[0][0].transcript;
					message = text;
					chatService.send({ type: 'ADD_MESSAGES', messages: [{ content: text, role: 'user' }] });
				});
				recognition.addEventListener('end', () => {
					recoding = false;
					if (message === undefined) conversationVoiceMode = false;
					stop();
				});
				recognition.start();
			})
			.catch(() => {
				recoding = false;
			});
	};

	const voice = (message: string) => {
		var speech = new SpeechSynthesisUtterance(message);
		speech.onend = () => record();
		speech.lang = lang;
		window.speechSynthesis.speak(speech);
	};

	const stop = () => {
		window.speechSynthesis.cancel();
		recognition?.stop();
		loadingEle?.dismiss();
		mediaStream?.getTracks().forEach((track) => track.stop());
	};

	$: if (!conversationVoiceMode) {
		stop();
	}

	let prevStatus: string | undefined = undefined;
	$: if ($chatService && matches($chatService, ['chatting'])) {
		prevStatus = 'chatting';
	}
	$: if (
		!recoding &&
		conversationVoiceMode &&
		prevStatus === 'chatting' &&
		$chatService &&
		matches($chatService, ['ready'])
	) {
		const message = $chatService.context.messages[$chatService.context.messages.length - 1];
		if (message && message.role === 'assistant' && message.content) {
			voice(message.content);
		}
		prevStatus = 'ready';
	}

	let useful = false;
	onMount(() => {
		if (
			'webkitSpeechRecognition' in window &&
			'speechSynthesis' in window &&
			'SpeechSynthesisUtterance' in window
		) {
			useful = true;
		}
	});
</script>

{#if useful}
	<Tooltip message={$_('chat.conversation_voice_mode_button_tooltip')}>
		<ion-button
			on:click={() => {
				if (conversationVoiceMode) {
					stop();
				} else {
					record();
				}
				conversationVoiceMode = !conversationVoiceMode;
			}}
		>
			{#if conversationVoiceMode}
				<Icon name="cancel" color="red" />
			{:else}
				<Icon name="record_voice_over" color={recoding ? 'red' : 'white'} />
			{/if}
		</ion-button>
	</Tooltip>
{/if}
