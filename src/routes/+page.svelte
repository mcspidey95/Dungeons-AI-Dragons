<script>
	import { onMount } from 'svelte';
	import { initialText, gameLogo, BGM, TypingSFX, Loading,characterSheetPrompt, themePrompt, loadingText, introPrompt, choicePrompt, finalePrompt, summaryPrompt } from '$lib';
	import { llm, llm2, generateImage } from './api/models';

	let timer;
	let countdown;
	let storyContainer;
	let typingSound;
	let backgroundMusic;

	let userPrompt = '';
	let avatarImage = '';
	let backgroundImage = '';
	let displayText = '';
	let backgroundTheme = '';
	let story = '';
	let userResponse = '';

	let generatedImage = null;
	let characterContent = loadingText;
	let currentText = initialText;
	let index = 0;
	let typingSpeed = 30;
	
	let showTextarea = false;
	let isImageReady = false;
	let showStartButton = false; // Flag to show the Start button
	let showLoadingCenter = false; // Flag for showing central loading animation
	let showCharacterSheet = false;
	let showPopup = false; // Flag to show the popup
	let isSubmitted = false;
	let isMusicPlaying = false;


	onMount(() => {
		typingSound = new Audio(TypingSFX);
		typingSound.volume = 0.8;

		typeText();
		window.addEventListener('keydown', startText2);
		
		backgroundMusic = new Audio(BGM);
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.1;
	});

	// <-------------------------------------- Landing Page -------------------------------------->

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

	// <-------------------------------------- Character Sheet -------------------------------------->

	async function createAvatar(){
    	showCharacterSheet = true;
		characterContent = await llm(characterSheetPrompt, userPrompt);
    	typeCharacterSheetText(characterContent, 10);

    	avatarImage = await generateImage('a pixel art style portrait of a ' + userPrompt);
    	showStartButton = true;
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

	// <-------------------------------------- Story Generation -------------------------------------->

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

	async function generateBackground(story) {
    	backgroundTheme = await llm2(themePrompt, story);
    	backgroundImage = await generateImage('a pixel art style scene of' + backgroundTheme);
	}

	// <-------------------------------------- UI Elements -------------------------------------->

	async function openPopup() {
    	userResponse = '';
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

	async function handleResponseSubmit() {
    	closePopup();

    	showLoadingCenter = true;
    	backgroundImage = '';
    
    	story = await llm(choicePrompt, userResponse+' {'+generateRandomNumber()+'}');
    	isSubmitted = true;
	}

	function generateRandomNumber() {
    	return Math.floor(Math.random() * 20) + 1;
	}

	// <-------------------------------------- Main Functions -------------------------------------->

	export async function handleStartClick() {
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
            	isSubmitted = false;

           		await generateBackground(story);

            	showLoadingCenter = false;

            	await typeStoryText(story, 20);
            	await openPopup();
            	await waitForFlag();
        	}
    	} catch (error) {
        	console.error('Error during initialization:', error);
        	showLoadingCenter = false;
    	}
	}

	// <-------------------------------------- HTML CODE -------------------------------------->
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
		<img src="{Loading}" alt="Loading..." class="placeholder-image  {isImageReady ? 'pop-up' : ''}" />
	{/if}
</div>

{#if showTextarea}
	<div class="textarea-wrapper {showCharacterSheet ? 'character-sheet' : ''}">
		<textarea
			class="character-input {showCharacterSheet ? 'character-sheet' : ''}"
			type="text"
			on:keydown={(e) => e.key === 'Enter' && createAvatar()}
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
		<img src="{Loading}" alt="Loading..." />
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