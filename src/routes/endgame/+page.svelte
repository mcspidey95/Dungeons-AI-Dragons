<script>
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { openDB, getAllPrisoners, savePrisoner, deletePrisoner } from '$lib';
	import { blip1, blip2, dice2a, select, trash, switchSFX } from '$lib';

	let cards = $state([]);
	let charType = 1;
	let settings = $state(false);

	let boop1;
	let boop2;
	let selectSFX;
	let diceSFX1;
	let trashSFX;
	let switchSFXX;

	let currentIndex = $state(0);
	let isAnimating = $state(false);
	let flippedCardId = $state(null);
	let showIntro = $state(false);
	let showTitle = $state(false);
	let showButtons = $state(false);
	let showCarousel = $state(false);
	let showCarouselDone = $state(false);
	let showSettings = $state(false);
	let prisonerList = $state([]);


	onMount(() => {

		boop1 = new Audio(blip1);
		boop1.volume = 0.4;

		boop2 = new Audio(blip2);
		boop2.volume = 0.1;

		selectSFX = new Audio(select);
		selectSFX.volume = 0.2;

		trashSFX = new Audio(trash);
		trashSFX.volume = 0.2;

		switchSFXX = new Audio(switchSFX);
		switchSFXX.volume = 0.2;

		diceSFX1 = new Audio(dice2a);
		diceSFX1.volume = 0.8;
		diceSFX1.play();

		const data = JSON.parse(localStorage.getItem('endgame'));
		if (data) {
			charType = data.charType || 0;
			cards = [{
				id: 1,
				content: data.name || 'UNKNOWN',
				description: data.summary || 'No summary found.',
				cardAvatar: data.cardAvatar || '',
				avatar: data.avatar || '',
				charPrompt: data.charPrompt || ''
			}];
		}
	});

	$effect(() => {
		setTimeout(() => {
			showTitle = true;
			
			setTimeout(() => {
				showIntro = true;
				showButtons = true;
			}, 3000);
		}, 100);
	});

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

		if(index === 3){
			trashSFX.currentTime = 0;
			await trashSFX.play();
		}

		if(index === 4){
			switchSFXX.currentTime = 0;
			await switchSFXX.play();
		}
	}

	async function removePrisoner(id) {
		const db = await openDB();
		await deletePrisoner(db, id);

		// Update UI
		prisonerList = prisonerList.filter(p => p.id !== id);
		cards = cards.filter(c => c.id !== id);
	}

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
		SFX(1);
		setTimeout(() => (isAnimating = false), 100);
	}

	function moveRight() {
		isAnimating = true;
		flippedCardId = null;
		currentIndex = (currentIndex + 1) % cards.length;
		SFX(0);
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

	async function loadPrisonerCards() {
		const db = await openDB();
		const existingPrisoners = await getAllPrisoners(db);

		for (const prisoner of existingPrisoners) {
			cards.push({
				id: cards.length + 1,
				content: prisoner.content,
				description: prisoner.description,
				cardAvatar: prisoner.cardAvatar,
				avatar: prisoner.avatar,
				charPrompt: prisoner.charPrompt
			});
		}

		// repeat cards for carousel effect if only 1 or 2 exist
		if (cards.length === 1) {
			cards = [
				{ ...cards[0], id: 1 },
				{ ...cards[0], id: 2 },
				{ ...cards[0], id: 3 },
				{ ...cards[0], id: 4 },
				{ ...cards[0], id: 5 },
			];
		} else if (cards.length === 2) {
			cards = [
				{ ...cards[0], id: 1 },
				{ ...cards[1], id: 2 },
				{ ...cards[0], id: 3 },
				{ ...cards[1], id: 4 },
				{ ...cards[0], id: 5 },
				{ ...cards[1], id: 6 },
			];
		} else if (cards.length === 3) {
			cards = [
				{ ...cards[0], id: 1 },
				{ ...cards[1], id: 2 },
				{ ...cards[2], id: 3 },
				{ ...cards[0], id: 4 },
				{ ...cards[1], id: 5 },
				{ ...cards[2], id: 6 },
			];
		} else if (cards.length === 4) {
			cards = [
				{ ...cards[0], id: 1 },
				{ ...cards[1], id: 2 },
				{ ...cards[2], id: 3 },
				{ ...cards[3], id: 4 },
				{ ...cards[0], id: 5 },
				{ ...cards[1], id: 6 },
				{ ...cards[2], id: 7 },
			];
		}

		// Save current card to IndexedDB
		const firstCard = cards[0];

		if (charType === 2) {
			// Try to find matching content
			const existing = existingPrisoners.find(p => p.content === firstCard.content);

			if (existing) {
				// Update existing prisoner with same content
				await savePrisoner(db, {
					id: existing.id,
					content: firstCard.content,
					description: firstCard.description,
					cardAvatar: firstCard.cardAvatar,
					avatar: firstCard.avatar,
					charPrompt: firstCard.charPrompt
				});
				return;
			}
		}
		
		// Add as a new prisoner
		await savePrisoner(db, {
			id: Date.now() + Math.random(),
			content: firstCard.content,
			description: firstCard.description,
			cardAvatar: firstCard.cardAvatar,
			avatar: firstCard.avatar,
			charPrompt: firstCard.charPrompt
		});

		prisonerList = await getAllPrisoners(db);
	}


	function startCarousel() {

		if(charType == 0){ 
			window.location.href = '/';
			return; 
		}
		
		loadPrisonerCards();

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
			settings = true;
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
		{#if showIntro && cards[currentIndex]}
			<div class="initial-wrapper" class:fadeInPop={showIntro && !showCarousel}>
				<div
					class="card-wrapper center {flippedCardId === cards[currentIndex].id ? 'flipped' : ''}"
					on:click={() => handleCardClick(cards[currentIndex])}
				>
					<div class="card-front" on:click={() => SFX(4)}>
						<div class="card-top-left">
							{#each cards[currentIndex].content.split('') as letter}
								<div class="card-letter">{letter}</div>
							{/each}
						</div>

							<!-- Avatar image in center -->
							<div class="card-avatar-center">
								<img src={`data:image/png;base64,${cards[currentIndex].cardAvatar}`} alt="Avatar" />
							</div>

						<div class="card-bottom-right">
							{#each cards[currentIndex].content.split('') as letter}
								<div class="card-letter">{letter}</div>
							{/each}
						</div>
					</div>
					<div class="card-back" on:click={() => SFX(4)}>
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
					<div class="card-front" on:click={() => {if(card.position == 'center') SFX(4)}}>
						<div class="card-top-left">
							{#each card.content.split('') as letter}
								<div class="card-letter">{letter}</div>
							{/each}
						</div>

						<!-- Avatar image in center -->
						<div class="card-avatar-center">
							<img src={`data:image/png;base64,${card.cardAvatar}`} alt="Avatar" />
						</div>

						<div class="card-bottom-right">
							{#each card.content.split('') as letter}
								<div class="card-letter">{letter}</div>
							{/each}
						</div>
					</div>
					<div class="card-back" on:click={() => {if(card.position == 'center') SFX(4)}}>
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
			<button id="hide-button" class="start-button" on:click={startCarousel} on:mouseenter={() => SFX(0)} on:click={() => SFX(2)}>{charType == 0 ? 'Alt F4' : 'Keep'}</button>
			<button class="start-button" on:click={() => {window.location.href = '/';}} on:mouseenter={() => SFX(1)} on:click={() => SFX(2)}>{showCarousel ? 'One Moree' : 'Nah`'}</button>
		</div>
	{/if}
</div>

{#if settings}
	<div class="settings-icon" on:click={() => {showSettings = !showSettings; SFX(4);}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg></div>
{/if}
{#if showSettings}
	<div class="settings-panel">
		<h3 id="settings-title">Manage Prisoners</h3>
		<ul>
			{#each prisonerList as p}
				<li>
					<span>{p.content}</span>
					<svg class="delete-btn" on:click={() => {removePrisoner(p.id); SFX(3);}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
				</li>
			{/each}
		</ul>
	</div>
{/if}


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
		background-color: #e8e6e8;
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

	.card-avatar-center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 60%;
		border-radius: 15px;
		aspect-ratio: 1;
		overflow: hidden;
		mask-image: 
		linear-gradient(to top, transparent, black 10%, black 90%, transparent),
		linear-gradient(to left, transparent, black 10%, black 90%, transparent);
	-webkit-mask-image: 
		linear-gradient(to top, transparent, black 10%, black 90%, transparent),
		linear-gradient(to left, transparent, black 10%, black 90%, transparent);

	mask-composite: intersect;
	-webkit-mask-composite: destination-in;
	mask-repeat: no-repeat;
	mask-size: 100% 100%;
	}

	.card-avatar-center img {
		width: 100%;
		height: 100%;
		object-fit: cover;
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
		white-space: pre-wrap;
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

	/* Settings Icon */
	.settings-icon {
		position: fixed;
		top: 2rem;
		right: 2rem;
		cursor: pointer;
		font-size: 1.75rem;
		color: wheat;
		padding: 0.6rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
		z-index: 100;
		transition: transform 0.2s ease;
		animation: fadeIn 0.5s ease-in-out;
	}

	.settings-icon:hover {
		transform: scale(1.1);
	}

	/* Settings Panel */
	.settings-panel {
		position: fixed;
		top: 2rem;
		right: 2rem;
		background: #111;
		color: #f9fafb;
		padding: 1rem;
		border-radius: 10px;
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.35);
		z-index: 99;
		width: 300px;
		max-height: 70vh;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		animation: fadeIn 0.1s ease;
	}

	#settings-title{
		margin: 0;
		padding-bottom: 3rem;
		color: wheat;
	}

	/* List Reset */
	.settings-panel ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.settings-panel li:hover{
		transform: translateX(5px);
	}

	/* Individual Entry */
	.settings-panel li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #222;
		padding: 0.6rem 0.8rem;
		border-radius: 0.6rem;
		color: #f3f4f6;
		font-size: 0.95rem;
		transition: transform 0.1s ease;
	}

	/* Prisoner Name */
	.item-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 200px;
	}

	/* Delete Button */
	.delete-btn {
		background: transparent;
		border: none;
		cursor: pointer;
		fill: #ef4444; /* red-500 */
		height: 1rem;
		width: 1rem;
		transition: transform 0.1s ease;
	}

	.delete-btn:hover {
		transform: translateY(-3px);
	}

</style>
