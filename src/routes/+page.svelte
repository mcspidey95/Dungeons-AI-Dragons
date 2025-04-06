<script>
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { initialText, gameLogo, Loading, Loading1, diceLoading, back, back1, diceButtonText} from '$lib';
	import { bgm, bgm1, bgm2, bgm3, bgm4, bgm5, bgm6, bgm7, bgm8, bgm9, bgm10, bgm11, bgm12 } from '$lib';
	import { TypingSFX, blip1, blip2, dice1, dice2a, dice2b, death, select, switchSFX, response } from '$lib';
	
	import { openDB, getAllPrisoners, getTxtFile} from '$lib';
	import { storyLLM, charLLM, imgLLM, diceLLM} from './api/models';
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


	onMount(async () => {

		db = await openDB();
		prisonerChars = await getAllPrisoners(db);
		prisonerCount = prisonerChars ? prisonerChars.length : 0;

		typingSound = new Audio(TypingSFX);
		typingSound.volume = 0.8;

		boop1 = new Audio(blip1);
		boop1.volume = 0.4;

		boop2 = new Audio(blip2);
		boop2.volume = 0.1;

		selectSFX = new Audio(select);
		selectSFX.volume = 0.2;

		diceSFX = new Audio(dice1);
		diceSFX.volume = 0.8;

		diceSFX1 = new Audio(dice2a);
		diceSFX1.volume = 0.8;

		diceSFX2 = new Audio(dice2b);
		diceSFX2.volume = 0.8;

		responseSFX = new Audio(response);
		responseSFX.volume = 0.2;

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
        backgroundMusic.volume = 0.1;
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
    let isRunning = true; // Control loop execution

    async function updateStory() {
        if (isTyping) return; // Block if already typing
        isTyping = true; // Disable input

        story = storyLines[typingIndex] || "";
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

    	document.body.classList.add('hide-cursor');

    	try {

        	storyFull = await storyLLM(introPrompt + characterContent);
			storyNext = storyLLM(preChoicePrompt + storyFull);
        	backgroundImage = await imgLLM(themePrompt + storyFull, 1229, 1843);
			backgroundImage2 = imgLLM(themePrompt + await storyNext, 1229, 1843);

        	showLoadingCenter = false;
        	backgroundMusic.pause();
        	backgroundMusic.currentTime = 0;

        	await typeStoryText();

			for(let i = 0; i < 2; i++){
				
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
				<span class="sheet-feature" id="grey"><p id="white">Weakness<span class="sheet-num" id={sheetWeakNum > 10 ? "green" : "red"}>({sheetWeakNum})</span></p><span class="sheet-description">{sheetWeak}</span></span>
				<span class="sheet-feature" id="grey"><p id="white">Fear<span class="sheet-num" id={sheetFearNum> 10 ? "green" : "red"}>({sheetFearNum})</span></p><span class="sheet-description">{SheetFear}</span></span>
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