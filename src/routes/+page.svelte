<script>
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { initialText, gameLogo, Loading, Loading1, diceLoading, back, back1, diceButtonText } from '$lib';
	import { bgm, bgm1, bgm2, bgm3, bgm4, bgm5, bgm6, bgm7, bgm8, bgm9, bgm10, bgm11, bgm12 } from '$lib';
	import { TypingSFX, blip1, blip2, dice1, dice2a, dice2b, death, select, switchSFX, response } from '$lib';
	
	import { openDB, getAllPrisoners, getTxtFile, plotPrompt } from '$lib';
	import { storyLLM, charLLM, imgLLM, diceLLM, audioLLM } from './api/models';
	import { themePrompt, dicePrompt } from '$lib/prompts/backgroundPrompt';
	import { characterSheetPrompt, avatarGenerationPrompt, cardAvatarPrompt } from '$lib/prompts/characterPrompt';
	import { introPrompt, preChoicePrompt, postChoicePrompt, continuePrompt, continueEndPrompt, preFinalePrompt, finalePrompt, summaryPrompt } from '$lib/prompts/storyPrompt';

	let timer;
	let countdown;
	let storyContainer;
	let typingSound;
	let backgroundMusic;
	let defaultCharacters;
	let characterContent;
	let boop1;
	let boop2;
	let boop3;
	let boop4;
	let diceSFX;
	let diceSFX1;
	let diceSFX2;
	let responseSFX;
	let selectSFX;
	let numArray;
	let char1;
	let char2;
	let char3;
	let charName1;
	let charName2;
	let charName3;
	let db;
	let prisonerCount;
	let prisonerChars;
	let charType;
	let newIntroPrompt;

	let sheetName;
	let sheetClass;
	let sheetRace;
	let sheetStr;
	let sheetStrNum;
	let sheetWeak;
	let sheetWeakNum;
	let SheetFear;
	let sheetFearNum;
	let sheetAgility;
	let sheetAgilityNum;
	let sheetMorality;
	let sheetMoralityNum;
	let sheetFame;
	let sheetFameNum;
	let sheetAbility;
	let sheetStory;

	let userPrompt = '';
	let avatarImage = '';
	let backgroundImage = '';
	let backgroundImage2 = '';
	let displayText = '';
	let story = '';
	let storyFull = '';
	let storyNext = '';
	let userResponse = '';
	let storyLines = [];
	let activePopup = '';
	let customPlot = '';

	let diceImage = "";
	let targetNumber;
	let fastRollInterval;
	let resultText = "";
	let lastNumber;
	let onDiceRollComplete;
	let diceText;
	let diceQuote = "Ask God Re";

	let currentText = initialText;
	let index = 0;
	let typingIndex = 0;
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
	let isSelmon = false;
	let isLoading = false;
	let isStoryEnd = false;
	let showDice = false;
	let rolling = false;
	let slowingDown = false;
	let showFinalImage = false;
	let showDiceButton = true;
	let showDiceLoading = false;
	let isTyping = false;
	let backButton = false;
	let nextButton = true;
	let cancelTyping = false;

	let settings = false;
	let settingsVolume = 1;
	let settingsDuration = 2;
	let durationValue = 15;
	let storyValue = 'D';
	let storyNameValue = 'Default';
	let isDurationAllowed = true;
	let isStoryModeAllowed = true;
	let isGameModeAllowed = false;
	let isPartyCodeAllowed = false;


	onMount(async () => {

		settingsVolume = parseFloat(localStorage.getItem('volume') ?? '1');

		db = await openDB();
		prisonerChars = await getAllPrisoners(db);
		prisonerCount = prisonerChars ? prisonerChars.length : 0;

		typingSound = new Audio(TypingSFX);
		typingSound.volume = 0.8*settingsVolume;

		boop1 = new Audio(blip1);
		boop1.volume = 0.4*settingsVolume;

		boop2 = new Audio(blip2);
		boop2.volume = 0.1*settingsVolume;

		selectSFX = new Audio(select);
		selectSFX.volume = 0.2*settingsVolume;

		diceSFX = new Audio(dice1);
		diceSFX.volume = 0.8*settingsVolume;

		diceSFX1 = new Audio(dice2a);
		diceSFX1.volume = 0.8*settingsVolume;

		diceSFX2 = new Audio(dice2b);
		diceSFX2.volume = 0.8*settingsVolume;

		responseSFX = new Audio(response);
		responseSFX.volume = 0.2*settingsVolume;

		random3Char();

		typeText();
		window.addEventListener('keydown', startText2);
		window.addEventListener('click', startText2);

		window.addEventListener('keydown', async () => {
			typingSound.currentTime = 0;
			await typingSound.play();
		});
		
		let bgmList = [bgm, bgm1, bgm2, bgm3, bgm4, bgm5, bgm6, bgm7, bgm8, bgm9, bgm10, bgm11, bgm12];
		let num = Math.floor(Math.random() * 13);

		if(num === 2) isSelmon = true;
		
		backgroundMusic = new Audio(bgmList[num]);
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.1*settingsVolume;
	});

	export async function getDefaultCharacters() {
		let charFiles = await Promise.all([
			getTxtFile('/characters/char1.txt'),
			getTxtFile('/characters/char2.txt'),
			getTxtFile('/characters/char3.txt'),
			getTxtFile('/characters/char4.txt'),
			getTxtFile('/characters/char5.txt'),
			getTxtFile('/characters/char6.txt'),
			getTxtFile('/characters/char7.txt'),
			getTxtFile('/characters/char8.txt'),
			getTxtFile('/characters/char9.txt'),
			getTxtFile('/characters/char10.txt'),
			getTxtFile('/characters/char11.txt'),
			getTxtFile('/characters/char12.txt'),
			getTxtFile('/characters/charSelmon1.txt'),
			getTxtFile('/characters/charSelmon2.txt'),
			getTxtFile('/characters/charSelmon3.txt'),
		]);

		let sheetFiles = await Promise.all([
			getTxtFile('/characters/sheet1.txt'),
			getTxtFile('/characters/sheet2.txt'),
			getTxtFile('/characters/sheet3.txt'),
			getTxtFile('/characters/sheet4.txt'),
			getTxtFile('/characters/sheet5.txt'),
			getTxtFile('/characters/sheet6.txt'),
			getTxtFile('/characters/sheet7.txt'),
			getTxtFile('/characters/sheet8.txt'),
			getTxtFile('/characters/sheet9.txt'),
			getTxtFile('/characters/sheet10.txt'),
			getTxtFile('/characters/sheet11.txt'),
			getTxtFile('/characters/sheet12.txt'),
			getTxtFile('/characters/sheetSelmon1.txt'),
			getTxtFile('/characters/sheetSelmon2.txt'),
			getTxtFile('/characters/sheetSelmon3.txt'),
		]);

		// First 12 characters
		let characters = [
			{ name: 'Deeps', pfp: charFiles[0], desc: sheetFiles[0] },
			{ name: 'Aphrodite', pfp: charFiles[1], desc: sheetFiles[1] },
			{ name: 'Drawf', pfp: charFiles[2], desc: sheetFiles[2] },
			{ name: 'Yurei', pfp: charFiles[3], desc: sheetFiles[3] },
			{ name: 'Edamame', pfp: charFiles[4], desc: sheetFiles[4] },
			{ name: 'Soup', pfp: charFiles[5], desc: sheetFiles[5] },
			{ name: 'Cobra Bhai', pfp: charFiles[6], desc: sheetFiles[6] },
			{ name: 'Dr. Volt', pfp: charFiles[7], desc: sheetFiles[7] },
			{ name: 'The Penguin', pfp: charFiles[8], desc: sheetFiles[8] },
			{ name: 'Raven', pfp: charFiles[9], desc: sheetFiles[9] },
			{ name: "Nikhil's Cat", pfp: charFiles[10], desc: sheetFiles[10] },
			{ name: "Your Mom", pfp: charFiles[11], desc: sheetFiles[11] },
		];

		// Last 3 characters
		let final3 = [
			{ name: 'Deer Killer', pfp: charFiles[12], desc: sheetFiles[12] },
			{ name: 'Heavy Driver', pfp: charFiles[13], desc: sheetFiles[13] },
			{ name: 'Selmon Bhai', pfp: charFiles[14], desc: sheetFiles[14] },
		];

		// Insert prisoners
		let prisonerCharacters = prisonerChars.map(p => ({
			name: p.content || 'Unknown Prisoner',
			pfp: p.avatar || '',
			desc: (p.charPrompt + p.description) || 'No details available.',
			prompt: p.charPrompt || '',
		}));


		return [...characters, ...prisonerCharacters, ...final3];
	}

	function togglePopup(name) {
		activePopup = activePopup === name ? '' : name;
	}

	function copyPartyCode() {
		navigator.clipboard.writeText("Haha Dummy!");
		activePopup = 'party';
		setTimeout(() => activePopup = '', 1500);
	}

	function toggleVolume() {
		if(settingsVolume === 1) {
			settingsVolume = 0.5;
		} else if(settingsVolume === 0.5) {
			settingsVolume = 0;
		}
		else {
			settingsVolume = 1;
		}

		typingSound.volume = 0.8*settingsVolume;
		boop1.volume = 0.4*settingsVolume;
		boop2.volume = 0.1*settingsVolume;
		selectSFX.volume = 0.2*settingsVolume;
		diceSFX.volume = 0.8*settingsVolume;
		diceSFX1.volume = 0.8*settingsVolume;
		diceSFX2.volume = 0.8*settingsVolume;
		responseSFX.volume = 0.2*settingsVolume;
		backgroundMusic.volume = 0.1*settingsVolume;

		localStorage.setItem('volume', settingsVolume);
	}
	
	function toggleDuration(duration){
		settingsDuration = duration === 15 ? 2 : duration === 30 ? 5 : 9;
		durationValue = duration;
		togglePopup('duration');
	}

	function toggleStory(storyName){
		storyNameValue = storyName;
		storyValue = storyName.charAt(0);
		togglePopup('storymode');

		if(storyValue == 'C') togglePopup('custom');
	}

	function setStoryMode(){
		if(storyValue == 'C' && customPlot == ''){
			toggleStory('Default');
			togglePopup('storymode');
		}

		let [half1, half2] = introPrompt.split('### Story Plot Instruction:');
		
		if(storyValue == 'C') {
			newIntroPrompt = half1 + ' ' + plotPrompt[storyValue] + ' '+ customPlot + ' ' + half2;
		}
		else {
			newIntroPrompt = half1 + ' ' + plotPrompt[storyValue] + ' ' + half2;
		}
	}


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

	async function random3Char() {
		let num = Math.floor(Math.random() * (prisonerCount+12));
		let num1 = Math.floor(Math.random() * (prisonerCount+12));
		let num2 = Math.floor(Math.random() * (prisonerCount+12));

		while(num === num1 || num === num2 || num1 === num2){
			num = Math.floor(Math.random() * (prisonerCount+12));
			num1 = Math.floor(Math.random() * (prisonerCount+12));
			num2 = Math.floor(Math.random() * (prisonerCount+12));
		}

		numArray = [num, num1, num2];

		defaultCharacters = await getDefaultCharacters();

		if(isSelmon){
			char1 = defaultCharacters[12+prisonerCount].pfp;
			charName1 = defaultCharacters[12+prisonerCount].name;
			char2 = defaultCharacters[13+prisonerCount].pfp;
			charName2 = defaultCharacters[13+prisonerCount].name;
			char3 = defaultCharacters[14+prisonerCount].pfp;
			charName3 = defaultCharacters[14+prisonerCount].name;
		}
		else{
			char1 = defaultCharacters[numArray[0]].pfp;
			charName1 = defaultCharacters[numArray[0]].name;
			char2 = defaultCharacters[numArray[1]].pfp;
			charName2 = defaultCharacters[numArray[1]].name;
			char3 = defaultCharacters[numArray[2]].pfp;
			charName3 = defaultCharacters[numArray[2]].name;
		}
	}

	async function selectCharacter(characterIndex) {
		isBack1 = true;
		showCharacterSelection = false;
		showTextarea = true;
		isBack = false;
		showCharacterSheet = true;
		settings = true;

		if(isSelmon){
			characterContent = defaultCharacters[12+prisonerCount+characterIndex].desc;
			avatarImage = defaultCharacters[12+prisonerCount+characterIndex].pfp;
			formatCharacterSheet(characterContent);
			charType = 0;
		}
		else if(numArray[characterIndex] >= 12){
			avatarImage = defaultCharacters[numArray[characterIndex]].pfp;
			isLoading = true;
			characterContent = await charLLM(characterSheetPrompt + defaultCharacters[numArray[characterIndex]].desc);
			formatCharacterSheet(characterContent);
			isLoading = false;
			typeCharacterSheetText(20);
			userPrompt = defaultCharacters[numArray[characterIndex]].prompt;
			charType = 2;
		}else{
			characterContent = defaultCharacters[numArray[characterIndex]].desc;
			avatarImage = defaultCharacters[numArray[characterIndex]].pfp;
			formatCharacterSheet(characterContent);
			charType = 0;
		}
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
		settings = false;
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
		characterContent = '';
		isLoading = true;
		settings = true;
		characterContent = await charLLM(characterSheetPrompt + userPrompt);

		await formatCharacterSheet(characterContent);

		isLoading = false;
    	typeCharacterSheetText(20);

    	avatarImage = await imgLLM(avatarGenerationPrompt + userPrompt, 1024, 1024, 0);
    	
		showStartButton = true;
		charType = 1;
	}

	async function typeCharacterSheetText(speed) {
		// Store original values in temporary variables
		let tempSheetName = sheetName;
		let tempSheetClass = sheetClass;
		let tempSheetRace = sheetRace;
		let tempSheetStr = sheetStr;
		let tempSheetWeak = sheetWeak;
		let tempSheetFear = SheetFear;
		let tempSheetAgility = sheetAgility;
		let tempSheetMorality = sheetMorality;
		let tempSheetFame = sheetFame;
		let tempSheetAbility = sheetAbility;
		let tempSheetStory = sheetStory;

		// Clear all variables
		sheetName = '';
		sheetClass = '';
		sheetRace = '';
		sheetStr = '';
		sheetWeak = '';
		SheetFear = '';
		sheetAgility = '';
		sheetMorality = '';
		sheetFame = '';
		sheetAbility = '';
		sheetStory = '';

		let index = 0;
		while (index < tempSheetName.length) {
			sheetName += tempSheetName[index];
			index++;
			await new Promise(resolve => setTimeout(resolve, speed));
		}

		index = 0;
		while (index < tempSheetClass.length) {
			sheetClass += tempSheetClass[index];
			index++;
			await new Promise(resolve => setTimeout(resolve, speed));
		}

		index = 0;
		while (index < tempSheetRace.length) {
			sheetRace += tempSheetRace[index];
			index++;
			await new Promise(resolve => setTimeout(resolve, speed));
		}

		index = 0;
		while (index < tempSheetStr.length) {
			sheetStr += tempSheetStr[index];
			index++;
			await new Promise(resolve => setTimeout(resolve, speed));
		}

		index = 0;
		while (index < tempSheetWeak.length) {
			sheetWeak += tempSheetWeak[index];
			index++;
			await new Promise(resolve => setTimeout(resolve, speed));
		}

		index = 0;
		while (index < tempSheetFear.length) {
			SheetFear += tempSheetFear[index];
			index++;
			await new Promise(resolve => setTimeout(resolve, speed));
		}

		index = 0;
		while (index < tempSheetAgility.length) {
			sheetAgility += tempSheetAgility[index];
			index++;
			await new Promise(resolve => setTimeout(resolve, speed));
		}

		index = 0;
		while (index < tempSheetMorality.length) {
			sheetMorality += tempSheetMorality[index];
			index++;
			await new Promise(resolve => setTimeout(resolve, speed));
		}

		index = 0;
		while (index < tempSheetFame.length) {
			sheetFame += tempSheetFame[index];
			index++;
			await new Promise(resolve => setTimeout(resolve, speed));
		}

		index = 0;
		while (index < tempSheetAbility.length) {
			sheetAbility += tempSheetAbility[index];
			index++;
			await new Promise(resolve => setTimeout(resolve, speed));
		}

		index = 0;
		while (index < tempSheetStory.length) {
			sheetStory += tempSheetStory[index];
			index++;
			await new Promise(resolve => setTimeout(resolve, speed));
		}
	}

	
	async function formatCharacterSheet(sheet) {
		const regex = {
			name: /Name:\s*(.+)/,
			class: /Class:\s*(.+)/,
			race: /Race:\s*(.+)/,
			strength: /Strength\s*\((\d+)\):\s*(.+)/,
			weakness: /Weakness\s*\((\d+)\):\s*(.+)/,
			fear: /Fear\s*\((\d+)\):\s*(.+)/,
			agility: /Agility\s*\((\d+)\):\s*(.+)/,
			morality: /Morality\s*\((\d+)\):\s*(.+)/,
			fame: /Fame\s*\((\d+)\):\s*(.+)/,
			ability: /Special Abilities:\s*(.+)/,
			story: /Backstory:\s*(.+)/
		};

		sheetName = sheet.match(regex.name)?.[1] || "";
		sheetClass = sheet.match(regex.class)?.[1] || "";
		sheetRace = sheet.match(regex.race)?.[1] || "";

		sheetStrNum = parseInt(sheet.match(regex.strength)?.[1]) || 0;
		sheetStr = sheet.match(regex.strength)?.[2] || "";

		sheetWeakNum = parseInt(sheet.match(regex.weakness)?.[1]) || 0;
		sheetWeak = sheet.match(regex.weakness)?.[2] || "";

		sheetFearNum = parseInt(sheet.match(regex.fear)?.[1]) || 0;
		SheetFear = sheet.match(regex.fear)?.[2] || "";

		sheetAgilityNum = parseInt(sheet.match(regex.agility)?.[1]) || 0;
		sheetAgility = sheet.match(regex.agility)?.[2] || "";

		sheetMoralityNum = parseInt(sheet.match(regex.morality)?.[1]) || 0;
		sheetMorality = sheet.match(regex.morality)?.[2] || "";

		sheetFameNum = parseInt(sheet.match(regex.fame)?.[1]) || 0;
		sheetFame = sheet.match(regex.fame)?.[2] || "";

		sheetAbility = sheet.match(regex.ability)?.[1] || "";
		sheetStory = sheet.match(regex.story)?.[1] || "";
	}

	// <-------------------------------------- Story Generation -------------------------------------->

	async function storyAnimation(speed) {
    	let index = 0;
		let content = story;
		cancelTyping = false;
    	story = ''; // Reset the story text

    	while (index < content.length) {

			if (cancelTyping) {
				story = '';
				return;
			}

			//typingSound.currentTime = 0;
			//await typingSound.play();
        	story += content[index];
        	index++;

        	if (storyContainer) {
            	storyContainer.scrollTop = storyContainer.scrollHeight;
        	}

        	await new Promise((resolve) => setTimeout(resolve, speed)); // Typing speed delay
    	}
	}

	async function typeStoryText() {
		typingIndex = 0;
		storyLines = storyFull.split('\n').map(line => line.trim()).filter(line => line);
		isTyping = false; // Prevent input during animation

		let storyAudio = [];

		/*
		// Step 1: Generate audio for all story lines
		for (const line of storyLines) {
			const result = await audioLLM(line);
			if (result) {
				storyAudio.push(result); // or store result.blob if needed
			} else {
				storyAudio.push(null); // placeholder to keep indexes in sync
			}
		}
		*/

		let isRunning = true; // Control loop execution

		async function updateStory() {
			if (isTyping) return; // Block if already typing
			isTyping = true; // Disable input

			story = storyLines[typingIndex] || "";

			/*
			// Step 2: Play corresponding audio if available
			const audioUrl = storyAudio[typingIndex];
			if (audioUrl) {
				const audio = new Audio(audioUrl);
				await new Promise((resolve) => {
					audio.onended = resolve;
					audio.onerror = resolve;
					audio.play();
				});
			}
			*/

			await storyAnimation(35); // Wait for animation to complete

			isTyping = false; // Re-enable input after animation
		}

		function handleNavigation(event) {
			if (isTyping && event.key !== "Backspace" && event.key !== "ArrowLeft") return; // Block input if typing is in progress

			if (event.key === " ") {
				event.preventDefault(); // Prevent default spacebar scrolling
				incrementIndex();
			} else if (event.key === "ArrowRight") {
				incrementIndex();
			} else if (event.key === "Backspace" || event.key === "ArrowLeft") {
				decrementIndex();
			} else if (event.key === "Enter") {
				event.preventDefault(); // Ignore Enter key completely
			}
		}

		function incrementIndex() {
			if (isTyping) return; // Prevent action during animation
			if (typingIndex < storyLines.length - 1) {
				typingIndex++;
				updateStory();
			} else {
				isRunning = false; // Stop loop when last line is reached
			}
		}

		function decrementIndex() {
			//if (isTyping) return; // Prevent action during animation
			if (typingIndex > 0) {
				cancelTyping = true;
				isTyping = false;
				typingIndex--;
				setTimeout(() => {
					updateStory();
				},50);
			}
		}

		// Start Listening for Keyboard Events
		document.addEventListener("keydown", handleNavigation);

		// Start Typing First Line
		updateStory();

		// Continuously Check for Button Click Flags
		while (isRunning) {
			await new Promise(resolve => setTimeout(resolve, 50)); // Small delay to avoid blocking UI

			if (nextButton) {
				nextButton = false;
				incrementIndex();
			}
			if (backButton) {
				backButton = false;
				decrementIndex();
			}
		}

		// Cleanup when finished
		document.removeEventListener("keydown", handleNavigation);
	}



	// <-------------------------------------- UI Elements -------------------------------------->

	async function handlePopup() {
		userResponse = '';
		showPopup = true;
		countdown = 120;
		isSubmitted = false;

		await responseSFX.play();

		function handleEnter(event) {
			if (event.key === 'Enter' && userResponse!='') {
				isSubmitted = true;
			}
		}

		document.addEventListener('keydown', handleEnter);

		const countdownPromise = new Promise(resolve => {
			timer = setInterval(() => {
				if (--countdown <= 0) {
					clearInterval(timer);
					resolve();
				}
			}, 1000);
		});

		const submissionPromise = new Promise(resolve => {
			const interval = setInterval(() => {
				if (isSubmitted) {
					clearInterval(interval);
					clearInterval(timer);
					resolve();
				}
			}, 100);
		});

		await Promise.race([countdownPromise, submissionPromise]);
		window.removeEventListener('keydown', handleEnter);
		await responseSFX.pause();
		showPopup = false;
	}



	function generateRandomNumber() {
    	return Math.floor(Math.random() * 20) + 1;
	}

	// <-------------------------------------- Dice Functions -------------------------------------->

	function getRandomDiceNumber() {
		let newNumber;
		do {
			newNumber = Math.floor(Math.random() * 20) + 1;
		} while (newNumber === lastNumber);

		lastNumber = newNumber;
		return newNumber;
	}

	function startFastRolling() {
		showDice = true;
		rolling = true;
		resultText = "";
		showFinalImage = false;

		fastRollInterval = setInterval(async () => {
			diceImage = `/dice/dice${getRandomDiceNumber()}.png`;
		}, 10); // Constant fast speed
	}

	async function rollDice(finalNumber) {
		if (!rolling || slowingDown) return; // Prevent multiple triggers

		slowingDown = true;
		showDiceButton = false;
		targetNumber = finalNumber;
		clearInterval(fastRollInterval);

		let duration = 4000; // Time to slow down
		let startTime = Date.now();
		let speed = 10; // Start fast

		function easeOutQuad(t) {
			return 1 - (1 - t) * (1 - t); // Smooth easing curve
		}

		async function getNextFrame() {
			let elapsed = Date.now() - startTime;
			let progress = Math.min(elapsed / duration, 1); // 0 → 1
			speed = 10 + easeOutQuad(progress) * 200; // Smooth slowdown

			diceImage = `/dice/dice${getRandomDiceNumber()}.png`;
			diceSFX.currentTime = 0;
			await diceSFX.play();

			if (progress < 1) {
				setTimeout(getNextFrame, speed);
			} else {
				revealFinalImage();
			}
		}

		getNextFrame(); // Start slowdown
	}

	async function revealFinalImage() {
		diceImage = `/dice/dice${targetNumber}.png`;
		//diceImage = "src/lib/dice/flash.png"; // A blank/flash image for blink effect
		await tick();
		await new Promise((resolve) => setTimeout(resolve, 500)); // Short blink delay

		diceImage = `/dice/dice${targetNumber}.png`;
		showFinalImage = true;

		if(targetNumber > 10) {
			diceSFX1.currentTime = 0;
			await diceSFX1.play();
		}
		else {
			diceSFX2.currentTime = 0;
			await diceSFX2.play();
		}

		resultText = await diceText;

		setTimeout(() => {
			showDice = false;
			showFinalImage = false;
			
			if (onDiceRollComplete) {
				onDiceRollComplete();
				rolling = false;
				showDiceButton = true;
				slowingDown = false;
				onDiceRollComplete = null;
			}
		}, 3000); // Hide after 3s
	}

	export function startDiceRoll(finalNumber) {
		return new Promise((resolve) => {
			showDiceLoading = true;
			diceQuote = diceButtonText[Math.floor(Math.random() * diceButtonText.length)];

			setTimeout(() => {
				showDiceLoading = false;
				
				if (!rolling) {
					startFastRolling();
				}
				targetNumber = finalNumber;

				diceText = diceLLM(dicePrompt + targetNumber);

				onDiceRollComplete = resolve;
			}, 1600);
		});
	}



	// <-------------------------------------- Main Functions -------------------------------------->

	export async function handleStartClick() {
		showLoadingCenter = true;
    	showStartButton = false; // Hide the Start button
		isBack1 = false;
    	currentText = ''; // Hide text2
    	displayText = ''; // Clear typing animation
		isStoryModeAllowed = false;

		setStoryMode();

    	document.body.classList.add('hide-cursor');

    	try {

        	storyFull = await storyLLM(newIntroPrompt + characterContent);
			storyNext = storyLLM(preChoicePrompt + storyFull);
        	backgroundImage = await imgLLM(themePrompt + storyFull, 1229, 1843);
			backgroundImage2 = imgLLM(themePrompt + await storyNext, 1229, 1843);

        	showLoadingCenter = false;
        	backgroundMusic.pause();
        	backgroundMusic.currentTime = 0;

        	await typeStoryText();

			for(let i = 0; i < settingsDuration; i++){
				
				if(i!=0){
					storyFull = await storyNext; 
					storyNext = storyLLM(preChoicePrompt + storyFull);            //story continue
					await typeStoryText();    //story continue

					backgroundImage = await backgroundImage2;
					backgroundImage2 = imgLLM(themePrompt + await storyNext, 1229, 1843);
				}

				storyFull = await storyNext;                 //pre-choice     

				await typeStoryText();        //pre-choice

				await handlePopup();                 //choice

				let luckyNumber = generateRandomNumber();
				storyFull = storyLLM(postChoicePrompt + userResponse+' {'+luckyNumber+'}');
				
				await startDiceRoll(luckyNumber);
				console.log('dice roll finished')

				backgroundImage = await backgroundImage2; 
				if(i!=1) storyNext = storyLLM(continuePrompt + storyFull);
				else storyNext = storyLLM(continueEndPrompt + storyFull);
				backgroundImage2 = imgLLM(themePrompt + await storyNext, 1229, 1843);
				storyFull = await storyFull;
				await typeStoryText();        //post-choice
			}

			storyFull = await storyNext;                                  //ending
			storyNext = storyLLM(preFinalePrompt + storyFull);    
			isDurationAllowed = false;        
			await typeStoryText();                                        //ending

			backgroundImage = await backgroundImage2;
			backgroundImage2 = imgLLM(themePrompt + storyNext, 1229, 1843);
			storyFull = await storyNext;                 //pre-finale   

			await typeStoryText();        //pre-finale

			await handlePopup();                 //choice

			let luckyNumber = generateRandomNumber();
			storyFull = storyLLM(finalePrompt + userResponse+' {'+luckyNumber+'}');

			await startDiceRoll(luckyNumber);

			backgroundImage = await backgroundImage2;   //finale
			storyFull = await storyFull;         
			       //finale
			let summaryRaw = storyLLM(summaryPrompt);
			let cardAvatar = imgLLM(cardAvatarPrompt + userPrompt, 1024, 1024, 0);//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			await typeStoryText();                      //finale
			summaryRaw  = await summaryRaw;

			let [summaryName, summaryContent] = summaryRaw.includes('!') ? summaryRaw.split('!') : ['UNKNOWN', summaryRaw]; // fallback if '!' not present
			cardAvatar = await cardAvatar;

			localStorage.clear();

			localStorage.setItem('endgame', JSON.stringify({
				name: summaryName,
				cardAvatar: cardAvatar,
				summary: summaryContent,
				charType: charType,
				avatar: avatarImage, 
				charPrompt: userPrompt
			}));

			avatarImage = null;
			showCharacterSheet = false;
			backgroundImage = null;
			settings = false;

			setTimeout (() => {
				goto('/endgame');
			}, 500);


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

{#if showDiceLoading}
	<div class="overlay">
		<img class="dice" src="{diceLoading}" alt="Dice Gif" />
	</div>
{/if}

{#if showDice}
   <div class="overlay">
       <img class="dice {showFinalImage ? 'reveal' : ''}" src="{diceImage}" alt="Dice">
       {#if showFinalImage}
           <div class="result-text show">{resultText}</div>
       {/if}
       {#if showDiceButton}
         <button class="start-button" on:click={() => rollDice(targetNumber)}>{diceQuote}</button>
       {/if}
   </div>
{/if}


{#if showCharacterSelection}
    <div class="card-container">
        <!-- Card 1 -->
        <div class="character-card" on:click={() => selectCharacter(0)} on:mouseenter={() => SFX(0)} on:click={() => SFX(2)}>
            <img src="data:image/png;base64,{char1}" alt="char1" class="card-image" />
            <div class="card-title">{charName1}</div>
        </div>

        <!-- Card 2 -->
        <div class="character-card" on:click={() => selectCharacter(1)} on:mouseenter={() => SFX(1)} on:click={() => SFX(2)}>
            <img src="data:image/png;base64,{char2}" alt="char2" class="card-image" />
            <div class="card-title">{charName2}</div>
        </div>

        <!-- Card 3 -->
        <div class="character-card" on:click={() => selectCharacter(2)} on:mouseenter={() => SFX(1)} on:click={() => SFX(2)}>
            <img src="data:image/png;base64,{char3}" alt="char3" class="card-image" />
            <div class="card-title">{charName3}</div>
        </div>

        <!-- Card 4 (Custom) -->
        <div class="character-card custom-card" on:click={() => {showTextarea = true; showCharacterSelection = false; isBack1 = false;}} on:mouseenter={() => SFX(0)} on:click={() => SFX(2)}>
            <div class="plus-symbol">+</div>
            <div class="card-title">Custom</div>
        </div>
    </div>
{/if}


{#if showTextarea}

	<img class="{isBack ? 'back-button' : 'back-button-hidden'}" src={back} on:click={() => handleBackClick()} alt='back'/>

	<div class="textarea-wrapper {showCharacterSheet ? 'character-sheet' : ''}">
		{#if showCharacterSheet}
			<div class="character-input character-sheet">
				<p id="sheet-title">Character Sheet</p>
				<p id="loading" class={isLoading ? '' : 'hidden'}>Generating...</p>
				<br/>
				<span class="sheet-feature" id="grey"><p id="white">Name</p><span class="sheet-description" id="sheet-name">{sheetName}</span></span>
				<span class="sheet-feature" id="grey"><p id="white">Class</p><span class="sheet-description" id="sheet-name1">{sheetClass}</span></span>
				<span class="sheet-feature" id="grey"><p id="white">Race</p><span class="sheet-description" id="sheet-name1">{sheetRace}</span></span>
				<br/>
				<span class="sheet-feature" id="grey"><p id="white">Strength<span class="sheet-num" id={sheetStrNum > 10 ? "green" : "red"}>({sheetStrNum})</span></p><span class="sheet-description">{sheetStr}</span></span>
				<span class="sheet-feature" id="grey"><p id="white">Weakness<span class="sheet-num" id={sheetWeakNum > 10 ? "red" : "green"}>({sheetWeakNum})</span></p><span class="sheet-description">{sheetWeak}</span></span>
				<span class="sheet-feature" id="grey"><p id="white">Fear<span class="sheet-num" id={sheetFearNum> 10 ? "red" : "green"}>({sheetFearNum})</span></p><span class="sheet-description">{SheetFear}</span></span>
				<span class="sheet-feature" id="grey"><p id="white">Agility<span class="sheet-num" id={sheetAgilityNum> 10 ? "green" : "red"}>({sheetAgilityNum})</span></p><span class="sheet-description">{sheetAgility}</span></span>
				<span class="sheet-feature" id="grey"><p id="white">Morality<span class="sheet-num" id={sheetMoralityNum > 10 ? "green" : "red"}>({sheetMoralityNum})</span></p><span class="sheet-description">{sheetMorality}</span></span>
				<span class="sheet-feature" id="grey"><p id="white">Fame<span class="sheet-num" id={sheetFameNum > 10 ? "green" : "red"}>({sheetFameNum})</span></p><span class="sheet-description">{sheetFame}</span></span>
				<br/>
				<span class="sheet-feature" id="grey"><p id="white">Special Abilities</p><span class="sheet-description">{sheetAbility}</span></span>
				<br/>
				<span class="sheet-feature" id="grey"><span class="sheet-description">{sheetStory}</span></span>
			</div>
		{:else}
			<textarea
				class="character-input"
				type="text"
				on:keydown={(e) => e.key === 'Enter' && createAvatar()}
				placeholder="Name or Describe your character..."
				bind:value={userPrompt}
			></textarea>
		{/if}
	</div>
	
{/if}

<div class="image-display {backgroundImage ? 'show' : ''}">
	{#if backgroundImage}
		<img src="data:image/png;base64,{backgroundImage}" alt="Generated Background" />
		<div bind:this={storyContainer} class="story-display" readonly>{story}<span class="text-cursor"></span></div>

		{#if typingIndex > 0}
			<button class="story-btn back-btn" on:click={() => backButton = true}>
				⬅ Back
			</button>
		{/if}
	
		{#if typingIndex < storyLines.length - 1 && !isTyping}
			<button class="story-btn next-btn" on:click={() => nextButton = true}>
				Next ➡
			</button>
		{:else if typingIndex === storyLines.length - 1 && !isTyping}
			<button class="story-btn next-btn" on:click={() => nextButton = true}>
				Reply ➡
			</button>
		{/if}
	
	{/if}
</div>

{#if showStartButton && !backgroundImage && !showLoadingCenter}
	<button class="start-button" on:mouseenter={() => SFX(0)} on:click={() => {handleStartClick(); SFX(2)}}>
		Start
	</button>
{/if}

{#if showLoadingCenter}
	<div class="center-loading">
		<img src="{Loading1}" alt="Loading..." />
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
            <button class="submit-button" on:click={() => {isSubmitted = true}}>
                Submit
            </button>
        </div>
    </div>
{/if}

{#if settings}
	<!-- Settings Sidebar -->
	<div class="settings-bar">
		<!-- Volume (no popup) -->
		<div class="settings-item" on:click={() => toggleVolume()}>
			{#if settingsVolume === 1}
				<svg class="settings-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64v384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64v-64c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>
			{:else if settingsVolume === 0.5}
				<svg class="settings-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"/></svg>
			{:else}
				<svg class="settings-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>
			{/if}
			<div class="settings-text">Volume</div>
		</div>

		<!-- Duration -->
		<div class="settings-item {isDurationAllowed ? '' : 'disabled'}" on:click={() => togglePopup('duration')}>
			<div class="big-icon">{durationValue}</div>
			<div class="settings-text">Minutes</div>
		</div>

		<!-- Storymode -->
		<div class="settings-item {isStoryModeAllowed ? '' : 'disabled'}" on:click={() => togglePopup('storymode')}>
			<div class="big-icon">{storyValue}</div>
			<div class="settings-text">{storyNameValue}</div>
		</div>

		<!-- Gamemode -->
		<div class="settings-item {isGameModeAllowed ? '' : 'disabled'}" on:click={() => togglePopup('gamemode')}>
			<svg class="settings-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
			<div class="settings-text">1 Player</div>
		</div>

		<!-- Party Code -->
		<div class="settings-item {isPartyCodeAllowed ? '' : 'disabled'}" on:click={copyPartyCode}>
			<svg class="settings-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 448H64V224h64v-64H64c-35.3 0-64 28.7-64 64v192c0 35.3 28.7 64 64 64h224c35.3 0 64-28.7 64-64v-64h-64v64zm-64-96h224c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64v224c0 35.3 28.7 64 64 64z"/></svg>
			<div class="settings-text">Party Code</div>
		</div>

		<!-- Leave -->
		<div class="settings-item" on:click={() => togglePopup('exit')}>
			<svg class="settings-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64l192 0h32v-32V32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32 10.7-32 24-32 24 14.3 24 32zm96-128h96v352c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32h-32V128c0-35.3-28.7-64-64-64h-96v64z"/></svg>
			<div class="settings-text">Leave</div>
		</div>
	</div>
{/if}

<!-- Popups -->
{#if activePopup === 'duration'}
	<div class="popup-box" style="top: 20vh;">
		<div style="text-align:center; font-size: 0.7rem; margin-bottom: 10px; color: wheat;">Story Duration</div>
		<div class="option-grid">
			<div class="option {durationValue == 15 ? 'selected' : ''}" on:click={() => toggleDuration(15)}>15<br/><div style="text-align:center; font-size: 0.6rem; margin-top: 4px;">Mins</div></div>
			<div class="option {durationValue == 30 ? 'selected' : ''}" on:click={() => toggleDuration(30)}>30<br/><div style="text-align:center; font-size: 0.6rem; margin-top: 4px;">Mins</div></div>
			<div class="option {durationValue == 45 ? 'selected' : ''}" on:click={() => toggleDuration(45)}>45<br/><div style="text-align:center; font-size: 0.6rem; margin-top: 4px;">Mins</div></div>
		</div>
	</div>
{/if}

{#if activePopup === 'storymode'}
	<div class="popup-box" style="top: 35vh;">
		<div style="text-align:center; font-size: 0.7rem; margin-bottom: 10px; color: wheat;">Story Theme</div>
		<div class="option-grid">
			<div class="option {storyValue === 'D' ? 'selected' : ''}" on:click={() => toggleStory('Default')}>D<br/><div style="text-align:center; font-size: 0.6rem; margin-top: 4px;">Default</div></div>
			<div class="option {storyValue === 'P' ? 'selected' : ''}" on:click={() => toggleStory('Plane')}>P<br/><div style="text-align:center; font-size: 0.6rem; margin-top: 4px;">Plane Hijack</div></div>
			<div class="option {storyValue === 'Z' ? 'selected' : ''}" on:click={() => toggleStory('Zombie')}>Z<br/><div style="text-align:center; font-size: 0.6rem; margin-top: 4px;">Zombie Apoc.</div></div>
			<div class="option {storyValue === 'M' ? 'selected' : ''}" on:click={() => toggleStory('Murder')}>M<br/><div style="text-align:center; font-size: 0.6rem; margin-top: 4px;">Murder Spree</div></div>
			<div class="option {storyValue === 'J' ? 'selected' : ''}" on:click={() => toggleStory('Jumanji')}>J<br/><div style="text-align:center; font-size: 0.6rem; margin-top: 4px;">Jumanji</div></div>
			<div class="option {storyValue === 'C' ? 'selected' : ''}" on:click={() => toggleStory('Custom')}>C<br/><div style="text-align:center; font-size: 0.6rem; margin-top: 4px;">Custom</div></div>
		</div>
	</div>
{/if}

{#if activePopup === 'custom'}
	<div class="popup-box" style="top: 35vh;">
		<div style="text-align: center; font-size: 0.7rem; margin-bottom: 10px; color: wheat;">Custom Story</div>

		<textarea class="custom-textarea" bind:value={customPlot} placeholder="Type your custom story..."></textarea>

		<div class="custom-button">
			<button on:click={() => togglePopup('custom')}>Save</button>
		</div>
	</div>
{/if}

{#if activePopup === 'gamemode'}
	<div class="popup-box" style="top: 50vh;">
		<div style="text-align:center; font-size: 0.7rem; margin-bottom: 10px; color: wheat;">Game Mode</div>
		<div class="option-grid" style="grid-template-columns: repeat(2, 1fr);">
			<div class="option">S<br/><div style="text-align:center; font-size: 0.6rem; margin-top: 4px;">1 Player</div></div>
			<div class="option">M<br/><div style="text-align:center; font-size: 0.6rem; margin-top: 4px;">2-5 Players</div></div>
		</div>
	</div>
{/if}

{#if activePopup === 'party'}
	<div class="popup-box" style="text-align:center; top: 70vh; color: wheat;">Code Copied!</div>
{/if}

{#if activePopup === 'exit'}
	<div class="popup-box" style="top: 83vh;">
		<div style="text-align:center; font-size: 0.7rem; margin-bottom: 10px; color: wheat;">Are You Sure?</div>
		<div class="option-grid" style="grid-template-columns: repeat(2, 1fr);">
			<div class="option" on:click={() => window.location.href = '/'}>Y<br/><div style="text-align:center; font-size: 0.6rem; margin-top: 4px;">Yes</div></div>
			<div class="option" on:click={() => togglePopup('exit')}>N<br/><div style="text-align:center; font-size: 0.6rem; margin-top: 4px;">No</div></div>
		</div>
	</div>
{/if}
