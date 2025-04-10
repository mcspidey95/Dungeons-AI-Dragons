import { json } from '@sveltejs/kit';
import Groq from 'groq-sdk';
import { GROQ_API_KEY, GROQ_API_KEY1, GROQ_API_KEY2, GROQ_API_KEY3, GROQ_API_KEY4 } from '$env/static/private';

let API_KEYS = [GROQ_API_KEY, GROQ_API_KEY1, GROQ_API_KEY2, GROQ_API_KEY3, GROQ_API_KEY4];

let groq = new Groq({
	apiKey: API_KEYS[Math.floor(Math.random() * API_KEYS.length)]
});

const model = 'playai-tts-arabic';
const voice = 'Ahmad-PlayAI';
const response_format = 'wav';

export async function POST({ request }) {
	const { input } = await request.json();

	if (!input || typeof input !== 'string') {
		return json({ error: 'Missing or invalid input' }, { status: 400 });
	}

	try {
        const response = await groq.audio.speech.create({
            model: model,
            voice: voice,
            input: input,
            response_format: response_format
          });

		const buffer = Buffer.from(await response.arrayBuffer());

		return new Response(buffer, {
			headers: {
				'Content-Type': 'audio/wav',
				'Content-Disposition': 'inline; filename="speech.wav"'
			}
		});
	} catch (err) {
		console.error('Groq TTS error:', err);
		return json({ error: 'Speech generation failed' }, { status: 500 });
	}
}
