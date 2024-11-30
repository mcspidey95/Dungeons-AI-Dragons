<script>
	import { onMount } from 'svelte';

	let text1 = 'Press any key to continue... ';
	let text2 = `
██████╗░░█████╗░██████╗░
██╔══██╗██╔══██╗██╔══██╗
██║░░██║███████║██║░░██║
██║░░██║██╔══██║██║░░██║
██████╔╝██║░░██║██████╔╝
╚═════╝░╚═╝░░╚═╝╚═════╝░

       The Gae Game!`;
	let displayText = '';
	let currentText = text1;
	let index = 0;
	let typingSpeed = 30; // Adjust speed (ms)

	onMount(() => {
		typeText();
		window.addEventListener('keydown', startText2); // Listen for any key press
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
		window.removeEventListener('keydown', startText2); // Remove the key press listener
		currentText = text2;
		index = 0;
		displayText = ''; // Clear the previous text
		typeText();
	}
</script>

<div class="typing-container">
	{displayText}<span class="cursor"></span>
</div>

<style>
	:global(body) {
		margin: 0;
		background-color: black;
		color: white;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.typing-container {
		display: inline-block;
		white-space: pre;
		font-family: monospace;
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
</style>
