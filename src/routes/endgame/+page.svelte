<script>
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { goto } from '$app/navigation';

	let cards = $state([
		{ id: 1, content: 'JOKER', description: 'Description for Card 1' },
		{ id: 2, content: 'WICK', description: 'Description for Card 2' },
		{ id: 3, content: 'SOUP', description: 'Description for Card 3' },
		{ id: 4, content: 'SPIDEY', description: 'Description for Card 4' },
		{ id: 5, content: 'HITLER', description: 'Description for Card 5' }
	]);

	let currentIndex = $state(0);
	let isAnimating = $state(false);
	let flippedCardId = $state(null);
	let showIntro = $state(false);
	let showTitle = $state(false);
	let showButtons = $state(false);
	let showCarousel = $state(false);
	let showCarouselDone = $state(false);

	$effect(() => {
		setTimeout(() => {
			showTitle = true;
			
			setTimeout(() => {
				showIntro = true;
				showButtons = true;
			}, 3000);
		}, 100);
	});

	function handleKeydown(event) {
		if (isAnimating) return;
		if (event.key === 'ArrowLeft') {
			moveLeft();
		} else if (event.key === 'ArrowRight') {
			moveRight();
		}
	}

	function moveLeft() {
		isAnimating = true;
		flippedCardId = null;
		currentIndex = (currentIndex - 1 + cards.length) % cards.length;
		setTimeout(() => (isAnimating = false), 100);
	}

	function moveRight() {
		isAnimating = true;
		flippedCardId = null;
		currentIndex = (currentIndex + 1) % cards.length;
		setTimeout(() => (isAnimating = false), 100);
	}

	function handleCardClick(card) {
		if ((showCarousel && card.position === 'center') || (!showCarousel && card.id === cards[currentIndex].id)) {
			flippedCardId = flippedCardId === card.id ? null : card.id;
		} else if (card.position === 'left' && !isAnimating) {
			// Move left when clicking left card
			moveLeft();
		} else if (card.position === 'right' && !isAnimating) {
			// Move right when clicking right card
			moveRight();
		}
	}

	function startCarousel() {
		document.querySelectorAll('.card-wrapper.center, .card-wrapper.flipped').forEach((el) => {
			el.style.transform = 'translateX(-50%) translateY(-50%) scale(1) translateZ(0)';
		});

		document.querySelectorAll('.card-wrapper.center:hover:not(.flipped), .card-wrapper.flipped:hover').forEach((el) => {
			el.style.transform = 'translateX(-50%) translateY(-50%) scale(1) translateZ(0)';
		});

		document.querySelectorAll('.carousel-title, .button-container').forEach((el) => {
			el.style.setProperty('opacity', '0', 'important');
			el.style.animation = 'none';
		});

		document.querySelector('.carousel-title').textContent = 'Your Slave Collection';
		document.getElementById('hide-button').style.display = 'none';

		setTimeout(() => {
			showCarousel = true;
		}, 500);

		const firstPreviewCard = document.querySelector('.initial-wrapper');
		setTimeout(() => {
			firstPreviewCard.style.display = 'none';
			showCarouselDone = true;
			document.querySelector('.instructions').style.opacity = '1';
			document.querySelector('.carousel-title').style.setProperty('opacity', '1', 'important');
		}, 1000);

		setTimeout(() => {
			const buttons = document.querySelector('.button-container');
			buttons.style.setProperty('opacity', '1', 'important');
		}, 3000);
	}

	$effect(() => {
		if (showCarouselDone) {
			document.addEventListener('keydown', handleKeydown);
		}
		return () => document.removeEventListener('keydown', handleKeydown);
	});

	function getCardsWithPositions() {
		return cards.map((card, index) => {
			const totalCards = cards.length;
			const diff = (index - currentIndex + totalCards) % totalCards;
			const signedDiff = diff > totalCards / 2 ? diff - totalCards : diff;

			let position;
			switch (signedDiff) {
				case -1:
					position = 'left';
					break;
				case 0:
					position = 'center';
					break;
				case 1:
					position = 'right';
					break;
				default:
					position = signedDiff < 0 ? 'far-left' : 'far-right';
			}
			return { ...card, position, diff: signedDiff };
		});
	}
</script>

<div class="carousel-container">
	{#if showTitle}
		<h2 class="{showIntro ? 'carousel-title' : 'centered-intro-title'} fadeInPop">The End. Somehow, you made it.</h2>
	{/if}

	<div class="carousel">
		{#if showIntro}
			<div class="initial-wrapper" class:fadeInPop={showIntro && !showCarousel}>
				<div
					class="card-wrapper center {flippedCardId === cards[currentIndex].id ? 'flipped' : ''}"
					on:click={() => handleCardClick(cards[currentIndex])}
				>
					<div class="card-front">
						<div class="card-top-left">
							{#each cards[currentIndex].content.split('') as letter}
								<div class="card-letter">{letter}</div>
							{/each}
						</div>
						<div class="card-bottom-right">
							{#each cards[currentIndex].content.split('') as letter}
								<div class="card-letter">{letter}</div>
							{/each}
						</div>
					</div>
					<div class="card-back">
						<div class="card-content">
							{cards[currentIndex].description}
						</div>
					</div>
				</div>
			</div>
		{/if}

		{#if showCarousel}
			{#each getCardsWithPositions() as card (card.id)}
				<div
					class="card-wrapper {card.position} {flippedCardId === card.id
						? 'flipped'
						: ''} {card.position === 'far-left' || card.position === 'far-right'
						? 'delayed-fade-in'
						: 'fade-in'}"
					animate:flip={{ duration: 600, easing: cubicOut }}
					on:click={() => handleCardClick(card)}
				>
					<div class="card-front">
						<div class="card-top-left">
							{#each card.content.split('') as letter}
								<div class="card-letter">{letter}</div>
							{/each}
						</div>
						<div class="card-bottom-right">
							{#each card.content.split('') as letter}
								<div class="card-letter">{letter}</div>
							{/each}
						</div>
					</div>
					<div class="card-back">
						<div class="card-content">
							{card.description}
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>

	{#if showButtons}
		<div class="instructions">Use ← and → arrow keys to navigate, click center card to flip</div>
		<div class="button-container fadeInPop">
			<button id="hide-button" class="start-button" on:click={startCarousel}>Keep</button>
			<button class="start-button" on:click={() => goto('/')}>{showCarousel ? 'One Moree' : 'Nah`'}</button>
		</div>
	{/if}
</div>

<style>
	#hide-button{
		display: block;
	}

	.instructions{
		position: absolute;
		width: 500px;
		align-items: center;
		text-align: center;
		margin-top: 500px;
		color: gray;
		font-size: 14px;
		opacity: 0;
	}

	.centered-intro-title {
		position: fixed;
		top: 40%;
		text-align: center;
		width: 500px;
		align-items: center;
		color: wheat;
		font-size: 48px;
	}

	.carousel-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		perspective: 1000px;
	}

	.carousel-title {
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 50px;
		color: wheat;
		text-align: center;
	}

	.carousel {
		position: relative;
		width: 100%;
		height: 400px;
		transform-style: preserve-3d;
	}

	.initial-wrapper {
		position: absolute;
		left: 50%;
		top: 50%;
	}

	.carousel-title,
	.button-container,
	.instructions {
		transition: all 0.4s ease-in-out;
	}

	.card-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 250px;
		height: 350px;
		transform-origin: center center;
		transform: translateX(-50%) translateY(-50%) scale(1) translateZ(0);
		transform-style: preserve-3d;
		transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
	}

	.card-wrapper.left {
		filter: grayscale(0.5);
		transform: translateX(-450px) translateY(-50%) scale(0.8) translateZ(-100px);
	}

	.card-wrapper.left:hover {
		cursor: w-resize;
		filter: grayscale(0.7);
		transform: translateX(-450px) translateY(-53%) scale(0.8) translateZ(-90px);
	}

	.card-wrapper.center {
		transform: translateX(-50%) translateY(-50%) scale(1) translateZ(0);
		z-index: 3;
		opacity: 1;
		cursor: pointer;
	}

	.card-wrapper.center:hover:not(.flipped) {
		transform: translateX(-50%) translateY(-52%) scale(1.05) translateZ(0);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	}

	.initial-wrapper .card-wrapper.center {
		transform: translateX(-50%) translateY(-45%) scale(1.3) translateZ(0);
		z-index: 3;
		opacity: 1;
		cursor: pointer;
	}

	.initial-wrapper .card-wrapper.center:hover:not(.flipped) {
		transform: translateX(-50%) translateY(-48%) scale(1.31) translateZ(0);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	}

	.card-wrapper.right {
		filter: grayscale(0.5);
		transform: translateX(200px) translateY(-50%) scale(0.8) translateZ(-100px);
	}

	.card-wrapper.right:hover {
		cursor: e-resize;
		filter: grayscale(0.5);
		transform: translateX(200px) translateY(-53%) scale(0.8) translateZ(-90px);
	}

	.card-wrapper.far-left {
		opacity: 0;
		filter: grayscale(0);
		transform: translateX(-450px) translateY(-50%) scale(0.6) translateZ(-200px);
	}

	.card-wrapper.far-right {
		opacity: 0;
		filter: grayscale(0);
		transform: translateX(200px) translateY(-50%) scale(0.6) translateZ(-200px);
	}

	.card-wrapper.flipped {
		transform: translateX(-50%) translateY(-50%) scale(1) translateZ(0) rotateY(180deg);
		z-index: 3;
	}

	.card-wrapper.flipped:hover {
		transform: translateX(-50%) translateY(-52%) scale(1.05) translateZ(0) rotateY(180deg);
		z-index: 3;
	}

	.initial-wrapper .card-wrapper.flipped {
		transform: translateX(-50%) translateY(-45%) scale(1.3) translateZ(0) rotateY(180deg);
		z-index: 3;
	}

	.initial-wrapper .card-wrapper.flipped:hover {
		transform: translateX(-50%) translateY(-48%) scale(1.31) translateZ(0) rotateY(180deg);
		z-index: 3;
	}

	.card-front,
	.card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		background-color: white;
		border-radius: 15px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
		padding: 20px;
		box-sizing: border-box;
	}

	.card-back {
		transform: rotateY(180deg);
		background-color: #f5f5f5;
	}

	.card-front {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.card-top-left {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-size: 24px;
		font-weight: bold;
		color: #333;
	}

	.card-bottom-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		font-size: 24px;
		font-weight: bold;
		color: #333;
		transform: rotate(180deg);
		position: absolute;
		bottom: 20px;
		right: 20px;
	}

	.card-letter {
		line-height: 1;
		margin: 2px 0;
	}

	.card-content {
		font-size: 14px;
		font-weight: bold;
		color: #333;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.button-container {
		margin-top: 60px;
		display: flex;
		gap: 20px;
	}

	button {
		font-size: 16px;
		cursor: pointer;
		color: wheat;
		background-color: #333;
		outline: none;
		border: none;
		border-radius: 5px;
	}

	.fade-in {
		animation: fadeIn 0.3s ease-in none;
	}

	.delayed-fade-in {
		animation: fadeIn 0.1s ease-in 1s forwards;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.fadeInPop {
		animation: fadeInPop 0.5s ease-out forwards;
	}
</style>
