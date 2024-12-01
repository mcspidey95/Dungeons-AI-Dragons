// src/routes/api/generate-image/+server.js
export async function POST({ request }) {
    const { prompt } = await request.json();
    const url = 'https://sd.ifsvivek.tech/sdapi/v1/txt2img';

    const params = {
        prompt: prompt,
        steps: 30,
        sampler_index: 'DPM++ 2M',
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });

        if (response.ok) {
            const data = await response.json();
            return new Response(JSON.stringify({ image: data.images[0] }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to generate image' }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error fetching image' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}