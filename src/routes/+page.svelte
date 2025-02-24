<script>
	import { onMount } from 'svelte';
	import { initialText, gameLogo, Loading,characterSheetPrompt, themePrompt, loadingText, introPrompt, choicePrompt, finalePrompt, summaryPrompt, char1, char2, char3, getDefaultCharacters, back, back1 } from '$lib';
	import { bgm, bgm1, bgm2, bgm3, bgm4, bgm5, bgm6, bgm7, bgm8, bgm9, bgm10, bgm11, bgm12 } from '$lib';
	import { TypingSFX, blip1, blip2, death, select, switchSFX } from '$lib';
	import { llm, llm2, generateImage } from './api/models';

	let timer;
	let countdown;
	let storyContainer;
	let typingSound;
	let backgroundMusic;
	let defaultCharacters;
	let boop1;
	let boop2;
	let boop3;
	let boop4;
	let selectSFX;

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
	let showCharacterSelection = false;
	let isBack = true;
	let isBack1 = false;


	onMount(() => {
		typingSound = new Audio(TypingSFX);
		typingSound.volume = 0.8;

		boop1 = new Audio(blip1);
		boop1.volume = 0.4;

		boop2 = new Audio(blip2);
		boop2.volume = 0.1;

		selectSFX = new Audio(select);
		selectSFX.volume = 0.2;

		typeText();
		window.addEventListener('keydown', startText2);
		window.addEventListener('click', startText2);

		window.addEventListener('keydown', async () => {
			typingSound.currentTime = 0;
			await typingSound.play();
		});
		
		let bgmList = [bgm, bgm1, bgm2, bgm3, bgm4, bgm5, bgm6, bgm7, bgm8, bgm9, bgm10, bgm11, bgm12];
		let num = Math.floor(Math.random() * 13);
		
		backgroundMusic = new Audio(bgmList[num]);
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
		window.removeEventListener('click', startText2);
		currentText = gameLogo;
		index = 0;
		displayText = '';
		typeText(() =>
			setTimeout(() => {
				showCharacterSelection = true;
				
				setTimeout(() => {
					backgroundMusic.play();
				}, 1000)
			}, 1000)
		);
	}

	async function selectCharacter(characterIndex) {
		
		isBack1 = true;
		showCharacterSelection = false;
		showTextarea = true;
		isBack = false;
		showCharacterSheet = true;

		defaultCharacters = await getDefaultCharacters();

		characterContent = defaultCharacters[characterIndex].desc;
		avatarImage = defaultCharacters[characterIndex].pfp;
		console.log(avatarImage);

		typeCharacterSheetText(characterContent, 10);

		showStartButton = true;
	}

	function handleBackClick() {
    	showTextarea = false; // Hide the card selection screen
    	showCharacterSelection = true; // Reset custom textarea visibility
	}

	function handleBackClick1() {
		isBack = true;
		isBack1 = false;
    	showTextarea = false; // Hide the card selection screen
    	showCharacterSelection = true; // Reset custom textarea visibility
		showStartButton = false;
		showCharacterSheet = false;
		avatarImage = '';
	}

	async function SFX(index){
		if(index === 0){
			boop1.currentTime = 0;
			await boop1.play();
		}
		
		if(index === 1){
			boop2.currentTime = 0;
			await boop2.play();
		}

		if(index === 2){
			selectSFX.currentTime = 0;
			await selectSFX.play();
		}
	}

	// <-------------------------------------- Character Sheet -------------------------------------->

	async function createAvatar(){
		isBack = false;
		isBack1 = true;
    	showCharacterSheet = true;
		characterContent = await llm(characterSheetPrompt, userPrompt);
    	typeCharacterSheetText(characterContent, 10);

    	avatarImage = await generateImage('pixel art, 32bit, masterpiece, best quality, ' + userPrompt);
		console.log(avatarImage);
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
		isBack1 = false;
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

{#if back1}
	<img id="back-button1" class="{isBack1 ? 'back-button1' : 'back-button-hidden'}" src={back1} on:click={() => handleBackClick1()} />
{/if}

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

{#if showCharacterSelection}
    <div class="card-container">
        <!-- Card 1 -->
        <div class="character-card" on:click={() => selectCharacter(0)} on:mouseenter={() => SFX(0)} on:click={() => SFX(2)}>
            <img src="{char1}" alt="Warrior" class="card-image" />
            <div class="card-title">Suraj</div>
        </div>

        <!-- Card 2 -->
        <div class="character-card" on:click={() => selectCharacter(1)} on:mouseenter={() => SFX(1)} on:click={() => SFX(2)}>
            <img src="{char2}" alt="Mage" class="card-image" />
            <div class="card-title">Spooder-Mon</div>
        </div>

        <!-- Card 3 -->
        <div class="character-card" on:click={() => selectCharacter(2)} on:mouseenter={() => SFX(1)} on:click={() => SFX(2)}>
            <img src="{char3}" alt="Rogue" class="card-image" />
            <div class="card-title">Selmon Bhai</div>
        </div>

        <!-- Card 4 (Custom) -->
        <div class="character-card custom-card" on:click={() => {showTextarea = true; showCharacterSelection = false; isBack1 = false;}} on:mouseenter={() => SFX(0)} on:click={() => SFX(2)}>
            <div class="plus-symbol">+</div>
            <div class="card-title">Custom</div>
        </div>
    </div>
{/if}


{#if showTextarea}

	<img class="{isBack ? 'back-button' : 'back-button-hidden'}" src={back} on:click={() => handleBackClick()} />

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
	<button class="start-button" on:mouseenter={() => SFX(0)} on:click={() => {handleStartClick(); SFX(2)}}>
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