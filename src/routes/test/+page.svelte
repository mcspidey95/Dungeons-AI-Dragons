<script>
    let text = '';
    let audioUrl = '';
    let loading = false;

    async function handleGenerateAudio() {
        if (!text.trim()) return;

        loading = true;
        audioUrl = '';

        try {
            const response = await fetch('/api/audioModel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                const blob = await response.blob();
                audioUrl = URL.createObjectURL(blob);
            } else {
                console.error('Failed to generate audio');
            }
        } catch (error) {
            console.error('Error:', error);
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