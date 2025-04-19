import { Client } from '@gradio/client';

export async function POST({ request }) {
	try {
		const { text } = await request.json();

		const response_0 = await fetch(
			'https://github.com/mcspidey95/Dungeons-AI-Dragons/raw/refs/heads/main/src/lib/voiceover/rick_0.wav'
		);
		const exampleAudio = await response_0.blob();

		const client = await Client.connect('https://audio.ifsvivek.in/');
		const result = await client.predict('/predict', {
			prompt_wav: exampleAudio,
			target_text: text+'..',
                        target_len: 4,
			n_timesteps: 15
		});

		// Extract the URL of the generated audio file
		const audioUrl = result.data[0]?.url;

		if (!audioUrl) {
			throw new Error('Audio URL not found in Gradio response');
		}

		// Fetch the audio data from the URL
		const audioResponse = await fetch(audioUrl);
		if (!audioResponse.ok) {
			throw new Error(`Failed to fetch audio from Gradio: ${audioResponse.statusText}`);
		}

		const audioBuffer = await audioResponse.arrayBuffer(); // Get audio data as ArrayBuffer

		// Return the fetched audio data
		return new Response(audioBuffer, {
			headers: {
				'Content-Type': 'audio/wav' // Ensure correct content type
			}
		});
	} catch (error) {
		console.error('Error generating audio:', error);
		// Provide more specific error message if possible
		return new Response(`Failed to generate audio: ${error.message}`, { status: 500 });
	}
}
