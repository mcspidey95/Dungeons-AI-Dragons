<script>
	import { onMount } from 'svelte';
	import { ChatGroq } from '@langchain/groq';

	let prompt = '';
	let generatedImage = null;
	let messages = [];

	let text1 = 'Press any key to continue... ';
	let text2 = `
██████╗░░█████╗░██████╗░
██╔══██╗██╔══██╗██╔══██╗
██║░░██║███████║██║░░██║
██║░░██║██╔══██║██║░░██║
██████╔╝██║░░██║██████╔╝
╚═════╝░╚═╝░░╚═╝╚═════╝░

Dungeons, AI & Dragons.`;

let characterSheetPrompt = `You are a dungeon master for a D&D game, For the given CHaracter Description, generate a character sheet for the character. if the character name is given, search the character and provide a character sheet based on the movie or show or game the character is mentioned in, or else use the given description. Ignore HP descriptions if mentioned.
Respond in the following format:
----CHARACTER SHEET----
Name:
Class:
Race:

Strength: 
Agility: 
Weakness: 
Intelligence: 
Charisma:

[{A paragraph about the character's backstory}]

Keep the details funny, but accurate to the character.

<EXAMPLE>
Spiderman


----CHARACTER SHEET----
Name: Spiderman
Class: Agile Arachnid
Race: Human (with a little bit of spider)

Strength: 16 (+3)
[Can lift twice his own weight, and has a knack for handy web-slinging.]

Agility: 20 (+5)
[Seriously, have you seen him parkour through New York City?]

Weakness: 8 (-1)
[Susceptible to emotional manipulation, and a well-known fear of spiders.]

Intelligence: 14 (+2)
[Above average, but he's no Tony Stark. He's got pretty great science skills, though.]

Charisma: 12 (+1)
[Quippy, charming, and a bit of a dork. But hey, that's why we love him!]


Bitten by a radioactive spider at a science exhibit, young Peter Parker gained extraordinary powers and the great responsibility of fighting crime. Juggling school, a social life, and his superhero duties, Spiderman is always on the move, whether it's chasing down bad guys or taking cheeky selfies. Navigating the complexities of love and friendship while maintaining his secret identity, Spidey has a heart of gold and a deep-seated desire for justice. Just don't forget to remind him that "with great power comes great responsibility!"
</EXAMPLE>

`;

	let displayText = '';
	let characterContent = '';
	let currentText = text1;
	let index = 0;
	let typingSpeed = 30;
	let showTextarea = false;
	let showCharacterSheet = false;
	let base64Image = '';

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
		currentText = text2;
		index = 0;
		displayText = '';
		typeText(() =>
			setTimeout(() => {
				showTextarea = true;
			}, 1000)
		);
	}

	function getBoundValue() {
		return showCharacterSheet ? characterContent : prompt;
	}

	async function sendMessage(systemPrompt) {
		if (prompt.trim()) {
			showCharacterSheet = true;

			messages = [...messages, { role: 'user', content: prompt }];

			try {
				const response = await fetch('/api/generate-text', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ systemPrompt, messages })
				});

				if (response.ok) {
					const data = await response.json();

					messages = [...messages, { role: 'assistant', content: data.content }];
					characterContent = data.content;

					await handleGenerateImage('a pixel art potrait of ' + prompt);
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
				base64Image = image;
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

<div class="typing-container">
	{displayText}<span class="cursor"></span>
</div>

<div class="image-container">
	{#if base64Image}
		<img src="data:image/png;base64,{base64Image}" alt="Generated Image" />
	{/if}
</div>

{#if showTextarea}
	<div class="textarea-wrapper {showCharacterSheet ? 'character-sheet' : ''}">
		<textarea
			class="character-input {showCharacterSheet ? 'character-sheet' : ''}"
			type="text"
			on:keydown={(e) => e.key === 'Enter' && sendMessage(characterSheetPrompt)}
			placeholder="Name or Describe your character..."
			bind:value={prompt}
			readonly={showCharacterSheet}
		>
			{showCharacterSheet ? characterContent : prompt}
		</textarea>
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
		top: 25px;
		left: 50px;
		width: 256px;
		height: auto;
		z-index: 1000;
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
	}

	.textarea-wrapper.character-sheet {
		position: fixed;
		bottom: 20px; /* Distance from the bottom of the screen */
		left: 20px; /* Distance from the left of the screen */
		margin-top: 0; /* Remove default margin */
		width: 300px; /* Adjust width if needed */
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

	.cursor {
		display: inline-block;
		width: 1ch;
		animation: blink 0.8s steps(2, start) infinite;
		background-color: white;
		height: 1em;
		vertical-align: bottom;
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