<script>
	import { onMount } from 'svelte';
	import { initialText, gameLogo, characterSheetPrompt, themePrompt, loadingText, introPrompt } from '$lib';

	let userPrompt = '';
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
	let backgroundTheme = '';
	let story = '';
	let showPopup = false; // Flag to show the popup
    let countdown = 60; // 60-second timer
    let timer; // Holds the timer interval
	let userResponse = '';
	let isSubmitted = false;
	let typingSound;
	let backgroundMusic;
	let isMusicPlaying = false;
	let storyContainer;

	onMount(() => {
		typingSound = new Audio('/audio/boop.mp3');
		typingSound.volume = 0.8;

		typeText();
		window.addEventListener('keydown', startText2);
		
		backgroundMusic = new Audio('/audio/bgm.mp3'); // Path to your MP3 file
        backgroundMusic.loop = true; // Ensure the music loops
        backgroundMusic.volume = 0.1; // Adjust volume (optional)
	});

	async function typeText(callback) {
		if (index < currentText.length) {
			setTimeout(async () => {
				displayText += currentText[index];
				index++;
				typeText(callback);

				typingSound.currentTime = 0;
				await typingSound.play();

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
				
				setTimeout(() => {
					backgroundMusic.play();
				}, 1000)
			}, 1000)
		);
	}

	async function typeCharacterSheetText(content, speed) {
    	let index = 0;
    	characterContent = ''; // Reset the characterContent

    	while (index < content.length) {
        	characterContent += content[index];
        	index++;
        	await new Promise((resolve) => setTimeout(resolve, speed)); // Typing speed delay
    	}
	}

	async function typeStoryText(content, speed) {
    	let index = 0;
    	story = ''; // Reset the story text

    	while (index < content.length) {
        	story += content[index];
        	index++;

			if (storyContainer) {
                storyContainer.scrollTop = storyContainer.scrollHeight;
            }

        	await new Promise((resolve) => setTimeout(resolve, speed)); // Typing speed delay
    	}
	}


	async function handleStartClick() {
    	showLoadingCenter = true;
		showStartButton = false; // Hide the Start button
    	currentText = ''; // Hide text2
    	displayText = ''; // Clear typing animation

		document.body.classList.add('hide-cursor');

		try {

			story = await llm(introPrompt, characterContent);
			await generateBackground(story);

			showLoadingCenter = false;
			backgroundMusic.pause();
			backgroundMusic.currentTime = 0;

			await typeStoryText(story, 20);
			await openPopup();
			await waitForFlag();
			
			for (let i = 0; i < 2; i++) {
				story = await llm(introPrompt, userPrompt);
				await generateBackground(story);

				await typeStoryText(story, 20);
				await openPopup();
				await waitForFlag();
			}


			
		} catch (error) {
			console.error('Error during initialization:', error);
			showLoadingCenter = false; // Ensure loading stops even if an error occurs
		}
	}


	function getBoundValue() {
		return showCharacterSheet ? characterContent : userPrompt;
	}

	async function generateAvatar(){
		showCharacterSheet = true;
		characterContent = await llm(characterSheetPrompt, userPrompt);
		typeCharacterSheetText(characterContent, 10);

		avatarImage = await generateImage('a pixel art style portrait of ' + userPrompt);
		showStartButton = true;
	}

	async function generateBackground(story) {
		backgroundTheme = await llm(themePrompt, story);
		backgroundImage = await generateImage(backgroundTheme);
	}

	async function llm(systemPrompt, userPrompt) {

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

	async function handleResponseSubmit() {
        // Handle the response submission logic
        closePopup();
		await llm(introPrompt, userResponse);
		isSubmitted = true;
    }

    function startCountdown() {
        countdown = 60;
        timer = setInterval(() => {
            countdown--;
            if (countdown <= 0) {
                clearInterval(timer);
                closePopup();
            }
        }, 1000);
    }

    async function openPopup() {
		userPrompt = '';
        showPopup = true;
        await startCountdown();
    }

    function closePopup() {
        showPopup = false;
        clearInterval(timer);
    }

	function waitForFlag() {
	return new Promise((resolve) => {
		const interval = setInterval(() => {
			if (isSubmitted) {
				clearInterval(interval); // Stop checking once the flag is true
				resolve(); // Resolve the promise to continue execution
			}
		}, 100); // Check every 100ms
	});
}

	function generateRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
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
		<img src="/img/loading.gif" alt="Loading..." class="placeholder-image  {isImageReady ? 'pop-up' : ''}" />
	{/if}
</div>

{#if showTextarea}
	<div class="textarea-wrapper {showCharacterSheet ? 'character-sheet' : ''}">
		<textarea
			class="character-input {showCharacterSheet ? 'character-sheet' : ''}"
			type="text"
			on:keydown={(e) => e.key === 'Enter' && generateAvatar()}
			placeholder={showCharacterSheet ? loadingText : 'Name or Describe your character...'}
			bind:value={userPrompt}
			readonly={showCharacterSheet}
		>
			{showCharacterSheet ? characterContent : userPrompt}
		</textarea>
	</div>
{/if}

<div class="image-display {backgroundImage ? 'show' : ''}">
	{#if backgroundImage}
		<img src="data:image/png;base64,{backgroundImage}" alt="Generated Background" />
		<textarea bind:this={storyContainer} class="story-display" readonly>{story}</textarea>
	{/if}
</div>

{#if showStartButton && !backgroundImage && !showLoadingCenter}
	<button class="start-button" on:click={handleStartClick}>
		Start
	</button>
{/if}

{#if showLoadingCenter}
	<div class="center-loading">
		<img src="/img/loading.gif" alt="Loading..." />
	</div>
{/if}

{#if showPopup}
    <div class="popup-overlay">
        <div class="popup-content">
            <div class="countdown">
                {countdown}
            </div>
            <textarea
                class="response-input"
				bind:value={userResponse}
                placeholder="Enter your response here..."
            ></textarea>
            <button class="submit-button" on:click={handleResponseSubmit}>
                Submit
            </button>
        </div>
    </div>
{/if}



<style>
	@font-face {
    	font-family: 'VT323';
    	src: url('/fonts/game.ttf') format('truetype');
    	font-weight:400;
    	font-style: normal;
	}

	:global(body) {
		margin: 0;
		background-color: black;
		color: white;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: 'VT323', monospace;
		transition: background 0.5s ease; 
	}

	.typing-container {
		display: inline-block;
		white-space: pre;
		font-family: 'VT323', monospace;
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
		font-family: 'VT323', monospace;
		font-size: 16px;
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
		font-family: 'VT323', monospace;
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

	.story-display {
    	position: absolute;
    	bottom: 10px; /* Adjust to position at the bottom */
    	left: 20px; /* Adjust to position at the left */
    	width: 95%; /* Adjust width as needed */
    	background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent black background */
    	color: white;
    	border: 1px solid white;
    	border-radius: 8px;
    	padding: 10px;
    	font-family: 'VT323', monospace;
    	font-size: 20px;
    	resize: none; /* Prevent resizing */
    	overflow: auto; /* Allow scrolling for overflow */
    	height: 20%; /* Adjust as needed */
    	z-index: 1000; /* Ensure it appears above other elements */
	}

	.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    font-family: 'VT323', monospace;
}

.popup-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    padding: 20px;
    width: 400px;
    text-align: center;
}

.countdown {
    font-size: 150px;
	padding-bottom: 50px;
    font-weight: bold;
	font-family: 'VT323';
    color: white;
    margin-bottom: 20px;
    text-align: center;
}

.response-input {
    width: 100%;
    height: 100px;
    background-color: black;
    color: white;
    border: 1px solid white;
    border-radius: 8px;
    padding: 10px;
    font-family: 'VT323', monospace;
    font-size: 14px;
    resize: none;
    margin-bottom: 20px;
}

.submit-button {
    padding: 10px 20px;
    background-color: white;
    color: black;
    font-family: 'VT323', monospace;
    border: 2px solid white;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.submit-button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
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
		font-family: 'VT323', monospace;
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