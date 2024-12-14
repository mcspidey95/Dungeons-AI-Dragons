import { json } from '@sveltejs/kit';
import { ChatGroq } from '@langchain/groq';
import { GROQ_API_KEY } from '$env/static/private';

const llm = new ChatGroq({
    apiKey: GROQ_API_KEY,
    model: 'gemma-7b-it',
    temperature: 0,
    maxTokens: undefined,
});

export async function POST({ request }) {
    const { messages, systemPrompt } = await request.json();
    const aiResponse = await llm.invoke([
        { role: 'system', content: systemPrompt },
        ...messages
    ]);
    return json({ content: aiResponse.content });
}