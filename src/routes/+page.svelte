<script>
	import { onMount } from 'svelte';
	import { ChatGroq } from "@langchain/groq";
    let prompt = "";
	let api_key = "";
	let llm;
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
	let displayText = '';
	let characterContent = "";
	let currentText = text1;
	let index = 0;
	let typingSpeed = 30; // Adjust speed (ms)
	let showTextarea = false;
	let showCharacterSheet = false;

	onMount(() => {
		typeText();
		load_api_key();
		window.addEventListener('keydown', startText2); // Listen for any key press
	});

	async function load_api_key() {
		const response = await fetch('src/lib/api_key.txt');
		api_key = await response.text();
		initializeLLM();
	}

	function initializeLLM() {
		llm = new ChatGroq({
			apiKey: api_key,
			model: "mixtral-8x7b-32768",
			temperature: 1,
			maxTokens: undefined,
			maxRetries: 2,
		});
	}

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
		window.removeEventListener('keydown', startText2); // Remove the key press listener
		currentText = text2;
		index = 0;
		displayText = ''; // Clear the previous text
		//wait 1 second
		typeText(() => (
			setTimeout(() => {
				showTextarea = true
			}, 1000))); // Show textarea after typing is complete
	}

	function getBoundValue() {
		return showCharacterSheet ? characterContent : prompt;
	}

	async function sendMessage() {
		if (prompt.trim()) {
			showCharacterSheet = true;
			messages = [...messages, { role: "user", content: prompt }];
			prompt = "";

			const aiResponse = await llm.invoke([
				{ role: "system", content: "" },
				{ role: "user", content: messages[messages.length - 1].content },
			]);

			messages = [...messages, { role: "AI", content: aiResponse.content }];
			characterContent = aiResponse.content; // Set the AI response as the character sheet content
		}
	}
	
</script>

<div class="typing-container">
	{displayText}<span class="cursor"></span>
</div>

{#if showTextarea}
	<div class="textarea-wrapper {showCharacterSheet ? 'character-sheet' : ''}">
		<textarea
			class="character-input {showCharacterSheet ? 'character-sheet' : ''}"
			type="text"
			on:keydown={(e) => e.key === "Enter" && sendMessage()}
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


	.textarea-wrapper {
		margin-top: 50px;
		opacity: 0;
		transform: scale(0.8);
		animation: fadeInPop 0.5s ease forwards;
		transition: transform 0.5s ease, width 0.5s ease, left 0.5s ease;
		position: relative;
	}

	.textarea-wrapper.character-sheet {
		position: absolute;
		top: 50%;
		left: 10%;
		transform: translateY(-50%);
		width: 80%;
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
		transition: width 0.5s ease, height 0.5s ease;
	}

	.character-input.character-sheet {
		width: 100%;
		height: 300px;
		background-color: black;
		color: white;
		border: none;
		box-shadow: none;
		resize: none;
		pointer-events: none; /* Make it non-editable */
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
		0%, 100% {
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
