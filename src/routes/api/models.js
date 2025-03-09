let messages = [];

export async function storyLLM(userPrompt) {

    messages = [...messages, { role: 'user', content: userPrompt }];

    try {
        const response = await fetch('/api/storyModel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages })
        });

        if (response.ok) {
            const data = await response.json();

            // Save the response to the messages list
            messages = [...messages, { role: 'assistant', content: data.content }];

            //console.log('Input:', userPrompt);
            console.log('Response:', data.content);

            return data.content;
            
        } else {
            console.error('Error in response:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


export async function charLLM(userPrompt) {

    try {
        const response = await fetch('/api/charModel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [{ role: 'user', content: userPrompt }] })
        });

        if (response.ok) {
            const data = await response.json();

            //console.log('Input:', userPrompt);
            console.log('Response:', data.content);

            return data.content;
            
        } else {
            console.error('Error in response:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function imgLLM(userPrompt, height, width) {

    try {
        const response = await fetch('/api/feederModel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [{ role: 'user', content: userPrompt }] })
        });

        if (response.ok) {
            let feeder = await response.json();
            let imagePrompt = feeder.content.trim();
            
            console.log('Prompt:', imagePrompt);
            const data = await stableDiffusion('pixel art, 32bit, masterpiece, best quality, ' + imagePrompt, height, width);

            return data;
    
        } else {
            console.error('Error in response:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}













async function stableDiffusion(imagePrompt, height, width) {
    if (imagePrompt.trim() === '') return null;
    try {
        const response = await fetch('/api/imgModel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: imagePrompt, imgHeight: height, imgWidth: width })
        });

        if (response.ok) {
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