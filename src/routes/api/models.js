let messages = [];

export async function llm(systemPrompt, userPrompt) {

    messages = [...messages, { role: 'user', content: userPrompt }];

    try {
        const response = await fetch('/api/generate-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ systemPrompt, messages })
        });

        if (response.ok) {
            const data = await response.json();

            // Save the response to the messages list
            messages = [...messages, { role: 'assistant', content: data.content }];

            console.log('Input:', userPrompt);
            console.log('Response:', data.content);

            return data.content;
            
        } else {
            console.error('Error in response:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function llm2(systemPrompt, userPrompt) {

    messages = [...messages, { role: 'user', content: userPrompt }];

    try {
        const response = await fetch('/api/generate-prompt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ systemPrompt, messages })
        });

        if (response.ok) {
            const data = await response.json();

            // Save the response to the messages list
            messages = [...messages, { role: 'assistant', content: data.content }];

            console.log('Input:', userPrompt);
            console.log('Response:', data.content);

            return data.content;
    
        } else {
            console.error('Error in response:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function generateImage(imagePrompt) {
    if (imagePrompt.trim() === '') return null;
    try {
        const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: imagePrompt })
        });

        if (response.ok) {
            setTimeout(() => {
                isImageReady = true;
            }, 1000);

            const data = await response.json();
            return data.image;
        } else {
            console.error('Error generating image');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}