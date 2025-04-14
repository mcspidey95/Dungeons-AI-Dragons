let messages = [];

export async function storyLLM(userPrompt) {
    // Process the first user input for storage
    if (messages.length === 0) {
        let relevantContent = userPrompt;
        //let splitText = userPrompt.split("here is your new character sheet:");
        //let relevantContent = splitText[1].trim(); // Extract relevant part

        let storedContent = await diceLLM(relevantContent + `
            summarize the character sheet as simple as possible, without loosing detail, and using the least tokens possible`);
        messages.push({ role: 'user', content: storedContent }); // Store only relevant content
    }

    try {
        const response = await fetch('/api/storyModel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [...messages, { role: 'user', content: userPrompt }] }) // Send full user input
        });

        if (response.ok) {
            const data = await response.json();

            // Store only the model's responses
            let summarizedContent = await diceLLM(data.content + `
                summarize the story as simple as possible, without loosing detail, and using the least tokens possible`);
            messages.push({ role: 'assistant', content: summarizedContent });
            //console.log('Response:', data.content);
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
            //console.log('Response:', data.content);

            return data.content;
            
        } else {
            console.error('Error in response:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


export async function diceLLM(userPrompt) {

    try {
        const response = await fetch('/api/diceModel', {
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


export async function imgLLM(userPrompt, height, width, type = 1) {

    try {
        const response = await fetch('/api/feederModel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [{ role: 'user', content: userPrompt }] })
        });

        if (response.ok) {
            let feeder = await response.json();
            let imagePrompt = feeder.content.trim();
            let data;
            
            //('Image Prompt:', imagePrompt);
            if(type == 1) data = await stableDiffusion('pixel art, 64bit, masterpiece, best quality, ' + imagePrompt, height, width);
            else if(type== 0) data = await stableDiffusion('pixel art, 32bit, masterpiece, best quality, ' + imagePrompt, height, width);
            
            return data;
    
        } else {
            console.error('Error in response:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function audioLLM(input) {
	try {
		const response = await fetch('/api/audioModel', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ input })
		});

		if (response.ok) {
			const blob = await response.blob();
			const audioUrl = URL.createObjectURL(blob); // optional if you want to use it directly later
            console.log(audioUrl);

			return audioUrl;
		} else {
			console.error('TTS Response Error:', response.statusText);
			return null;
		}
	} catch (error) {
		console.error('TTS Error:', error);
		return null;
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