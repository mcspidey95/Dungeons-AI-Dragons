<script>
	import { storyLLM, charLLM, imgLLM, diceLLM, audioLLM } from '../api/models';

	let text = '';
	let audioUrl = '';
	let loading = false;

	async function handleGenerateAudio() {
		if (!text.trim()) return;

		loading = true;
		audioUrl = '';

		const result = await audioLLM(text);
		if (result) {
			audioUrl = result.audioUrl;
			// Don’t play audio here — user will play it manually
		}

		loading = false;
	}
</script>

<input bind:value={text} placeholder="Type here.." />
<button on:click={handleGenerateAudio} disabled={loading}>
	{loading ? 'loading...' : 'Generate'}
</button>

{#if audioUrl}
	<audio controls src={audioUrl}></audio>
{/if}
