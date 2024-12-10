<script>
	import { onMount } from 'svelte';
	import { initialText, gameLogo, characterSheetPrompt, themePrompt, loadingText } from '$lib';

	let prompt = '';
	let generatedImage = null;
	let messages = [];
	let displayText = '';
	let characterContent = loadingText;
	let currentText = initialText;
	let index = 0;
	let typingSpeed = 30;
	let showTextarea = false;
	let showCharacterSheet = false;
	let avatarImage = '';
	let backgroundImage = '';
	let isImageReady = false;
	let showStartButton = false; // Flag to show the Start button
	let showLoadingCenter = false; // Flag for showing central loading animation
	let generatedThemePrompt = '';

	onMount(() => {
		typeText();
		window.addEventListener('keydown', startText2);
	});

	function typeText(callback) {
		if (index < currentText.length) {
			setTimeout(() => {
				displayText += currentText[index];
				index++;
				typeText(callback);
			}, typingSpeed);
		} else if (callback) {
			callback();
		}
	}

	function startText2() {
		window.removeEventListener('keydown', startText2);
		currentText = gameLogo;
		index = 0;
		displayText = '';
		typeText(() =>
			setTimeout(() => {
				showTextarea = true;
			}, 1000)
		);
	}

	async function handleStartClick() {
    	showLoadingCenter = true;
		showStartButton = false; // Hide the Start button
    	currentText = ''; // Hide text2
    	displayText = ''; // Clear typing animation

		document.body.classList.add('hide-cursor');

		try {
		// Send the message to generate content
		console.log('Sending message:', prompt);
			await sendMessage(themePrompt, false);

		// Generate the image with a specific prompt
		console.log(generatedThemePrompt)
			await handleGenerateBackground('a pixel art style landscape of ' + generatedThemePrompt);

		// Once everything is done, stop loading animation and update the background
			showLoadingCenter = false;
			
		} catch (error) {
			console.error('Error during initialization:', error);
			showLoadingCenter = false; // Ensure loading stops even if an error occurs
		}
	}


	function getBoundValue() {
		return showCharacterSheet ? characterContent : prompt;
	}

	async function sendMessage(systemPrompt, generateAvatar, keepPreviousPrompts = false) {
	if (prompt.trim()) {
		showCharacterSheet = true;

		// Clear previous messages if the flag is set to false
		if (!keepPreviousPrompts) {
			messages = [];
		}

		messages = [...messages, { role: 'user', content: prompt }];

		try {
			const response = await fetch('/api/generate-text', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ systemPrompt, messages })
			});

			if (response.ok) {
				const data = await response.json();

				// Save the response to the messages list
				if (keepPreviousPrompts) {
					messages = [...messages, { role: 'assistant', content: data.content }];
				} else {
					messages = [{ role: 'assistant', content: data.content }];
				}

				// Update the character content
				characterContent = data.content;
				generatedThemePrompt = data.content;

				// Generate an avatar if the flag is set
				if (generateAvatar) {
					await handleGenerateImage('a pixel art style portrait of ' + prompt, avatarImage);
				}

				// Show the start button after processing
				showStartButton = true;
			} else {
				console.error('Error in response:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
}


	async function handleGenerateImage(imagePrompt) {
		if (imagePrompt.trim()) {
			const image = await generateImage(imagePrompt);
			if (image) {
				avatarImage = image;
				//console.log('Image generated:', avatarImage);
			}
		}
	}

	async function handleGenerateBackground(imagePrompt) {
		if (imagePrompt.trim()) {
			const image = await generateImage(imagePrompt);
			if (image) {
				backgroundImage = image;
				//console.log('Image generated:', backgroundImage);
			}
		}
	}

	async function generateImage(imagePrompt) {
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
</script>

{#if !showLoadingCenter}
	<div class="typing-container">
		{displayText}<span class="cursor"></span>
	</div>
{/if}

<div class="image-container">
	{#if avatarImage}
		<!-- svelte-ignore a11y_img_redundant_alt -->
		<img src="data:image/png;base64,{avatarImage}" alt="Generated Image" />
	{:else if showCharacterSheet}
		<img src="/src/img/loading.gif" alt="Loading..." class="placeholder-image  {isImageReady ? 'pop-up' : ''}" />
	{/if}
</div>

{#if showTextarea}
	<div class="textarea-wrapper {showCharacterSheet ? 'character-sheet' : ''}">
		<textarea
			class="character-input {showCharacterSheet ? 'character-sheet' : ''}"
			type="text"
			on:keydown={(e) => e.key === 'Enter' && sendMessage(characterSheetPrompt, true)}
			placeholder={showCharacterSheet ? loadingText : 'Name or Describe your character...'}
			bind:value={prompt}
			readonly={showCharacterSheet}
		>
			{showCharacterSheet ? characterContent : prompt}
		</textarea>
	</div>
{/if}

<div class="image-display {backgroundImage ? 'show' : ''}">
	{#if backgroundImage}
		<img src="data:image/png;base64,{backgroundImage}" alt="Generated Background" />
	{:else if showLoadingCenter}
		<img src="/src/img/loading.gif" alt="Loading..." class="placeholder-image" />
	{/if}
</div>

{#if showStartButton && !backgroundImage && !showLoadingCenter}
	<button class="start-button" on:click={handleStartClick}>
		Start
	</button>
{/if}

{#if showLoadingCenter}
	<div class="center-loading">
		<img src="/src/img/loading.gif" alt="Loading..." />
	</div>
{/if}

<style>
	:global(body) {
		margin: 0;
		background-color: black;
		color: white;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: monospace;
		transition: background 0.5s ease; 
	}

	.typing-container {
		display: inline-block;
		white-space: pre;
		font-family: monospace;
	}

	.typing-container:hover {
		transform: scale(1.05) translateX(-5px);
		cursor: default;
	}

	.image-container {
		position: fixed;
		top: 3%;
		left: 2.8%;
		width: 13%;
		height: 15%;
		z-index: 1000;
	}

	.placeholder-image{
		opacity: 0; /* Start hidden */
		transform: scale(0.8); /* Start smaller */
		transition: all 0.5s ease; /* Smooth transition for properties */
		animation: fadeInPop 0.5s ease forwards;
	}

	.placeholder-image.pop-up{
		opacity: 1;
		transform: scale(1);
	}

	.image-container img {
		width: 100%;
		height: auto;
		border: 2px solid white;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}

	.textarea-wrapper {
		margin-top: 50px;
		opacity: 0;
		transform: scale(0.8);
		animation: fadeInPop 0.5s ease forwards;
		transition: all 0.5s ease; /* Smooth transition for repositioning */
		z-index: 1000;
	}

	.textarea-wrapper.character-sheet {
		position: fixed;
		bottom: 3%; /* Distance from the bottom of the screen */
		left: 1%; /* Distance from the left of the screen */
		margin-top: 0; /* Remove default margin */
		width: 16%; /* Adjust width if needed */
		height: 63%;
		transform: scale(1); /* Reset scaling */
		opacity: 1; /* Ensure it's visible */
	}

	.character-input {
		width: 400px;
		height: 100px;
		background-color: black;
		color: white;
		border: 2px solid white;
		border-radius: 8px;
		padding: 10px;
		font-family: monospace;
		font-size: 12px;
		outline: none;
		box-shadow: 0 0 10px white;
		transition:
			width 0.5s ease,
			height 0.5s ease;
	}

	.character-input.character-sheet {
		width: 100%; /* Adjust width to match wrapper */
		height: 550px; /* Make it taller as a character sheet */
		resize: none; /* Prevent resizing */
		background-color: black;
		color: white;
		border: 2px solid white;
		border-radius: 8px;
		padding: 10px;
		font-family: monospace;
		font-size: 14px;
		box-shadow: 0 0 10px white;
	}

	.character-input.character-sheet:focus {
		box-shadow: none; /* Prevent focus effects for the sheet */
	}

	.character-input::placeholder {
		color: rgba(255, 255, 255, 0.7);
	}

	.character-input:focus {
		box-shadow: 0 0 15px white;
	}

	.image-display {
	position: absolute;
	right: 200px;
	top: 20px;
	width: 70%; /* Adjust as needed */
	height: 95%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: black; /* Optional: Contrast background */
	border: 2px solid white;
	border-radius: 8px;
	box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
	opacity: 0; /* Hidden by default */
	transition: opacity 0.5s ease, transform 0.5s ease; /* Smooth fade-in and scale */
}

.image-display img {
	width: 100%;
	height: 100%;
	object-fit: cover; /* Ensures the image covers the entire container */
	object-position: center; /* Centers the image if cropping is needed */
}

.image-display.show {
	opacity: 1;
	transform: scale(1);
}


	.cursor {
		display: inline-block;
		width: 1ch;
		animation: blink 0.8s steps(2, start) infinite;
		background-color: white;
		height: 1em;
		vertical-align: bottom;
	}

	.start-button {
		position: relative;
		margin-top: 50px;
		padding: 10px 20px;
		background-color: white;
		color: black;
		font-family: monospace;
		border: 2px solid white;
		border-radius: 8px;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.start-button:hover {
		transform: scale(1.1);
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}

	.center-loading {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2000;
	}

	.center-loading img {
		width: 200px; /* Smaller size for loading image */
		height: auto;
	}

	.hide-cursor .cursor {
		display: none;
	}


	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	@keyframes fadeInPop {
		0% {
			opacity: 0;
			transform: scale(0.8);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>