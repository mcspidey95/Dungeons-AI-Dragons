export {default as Loading} from './img/loading.gif';
export {default as Loading1} from './img/loading1.gif';
export {default as back} from './img/back.png';
export {default as back1} from './img/back1.png';
export {default as diceLoading} from './img/dice.gif';
export {default as placeholderBg} from './img/placeholder_bg.png';
export {default as placeholderImg} from './img/placeholder_img.png';

export {default as bgm} from './audio/bgm.mp3';
export {default as bgm1} from './audio/bgm1.mp3';
export {default as bgm2} from './audio/bgm2.mp3';
export {default as bgm3} from './audio/bgm3.mp3';
export {default as bgm4} from './audio/bgm4.mp3';
export {default as bgm5} from './audio/bgm5.mp3';
export {default as bgm6} from './audio/bgm6.mp3';
export {default as bgm7} from './audio/bgm7.mp3';
export {default as bgm8} from './audio/bgm8.mp3';
export {default as bgm9} from './audio/bgm9.mp3';
export {default as bgm10} from './audio/bgm10.mp3';
export {default as bgm11} from './audio/bgm11.mp3';
export {default as bgm12} from './audio/bgm12.mp3';
export {default as dice1} from './audio/dice1.mp3';
export {default as dice2a} from './audio/dice2a.mp3';
export {default as dice2b} from './audio/dice2b.mp3';
export {default as response} from './audio/response.mp3';

export {default as TypingSFX} from './audio/boop.mp3';
export {default as blip1} from './audio/blip1.mp3';
export {default as blip2} from './audio/blip2.mp3';
export {default as death} from './audio/death.mp3';
export {default as select} from './audio/select.mp3';
export {default as switchSFX} from './audio/switch.mp3';
export {default as trash} from './audio/trash.mp3';

export let initialText = 'Press any key to continue... ';

export let gameLogo = `
██████╗░░█████╗░██████╗░
██╔══██╗██╔══██╗██╔══██╗
██║░░██║███████║██║░░██║
██║░░██║██╔══██║██║░░██║
██████╔╝██║░░██║██████╔╝
╚═════╝░╚═╝░░╚═╝╚═════╝░

Dungeons, AI & Dragons.`;

export async function getTxtFile(url) {
    const response = await fetch(url);
    return await response.text();
}

export let diceButtonText = [
    `Shake 'n' Pray`,
    `Yeet the Luck`,
    `Dice, Don’t Fail Me!`,
    `Send It!`,
    `Pray & Play`,
    `Spin the Doom Cube`,
    `Click Here, Cry Later`,
    `Roll It, Rascal`,
    `Doom Cube Go Brr`,
    `Skill Issue Incoming`,
    `Pure RNG Time`
];

export let plotPrompt = {
	'D': `Based on the character’s background, personality, or universe, create a **new, original storyline** that feels like an epic, cinematic adventure. `,
	'P': `Based on the character’s background, personality, or universe, create a **new, original storyline** that centers on a tense plane hijack and unfolds like an epic, cinematic adventure.`,
	'Z': `Based on the character’s background, personality, or universe, create a **new, original storyline** set in a chaotic zombie apocalypse where survival, strange alliances, and unexpected choices drive the plot.`,
	'M': `Based on the character’s background, personality, or universe, create a **new, original storyline** set during a bizarre murder spree, where mystery, mayhem, and twisted motives unfold around them.`,
	'J': `Based on the character’s background, personality, or universe, create a **new, original storyline** set in a wild, unpredictable game-world where each turn brings strange creatures, chaotic challenges, and reality-bending surprises.`,
	'C': `Based on the character’s background, personality, or universe, create a **new, original storyline** that feels like an epic, cinematic adventure. The story plot should be about `,
}

// db.js
export function openDB(name = 'PrisonDB', storeName = 'prisoners') {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(name, 1);

		request.onerror = () => reject('Failed to open IndexedDB');
		request.onsuccess = () => resolve(request.result);

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, { keyPath: 'id' });
			}
		};
	});
}

export function getAllPrisoners(db, storeName = 'prisoners') {
	return new Promise((resolve) => {
		const tx = db.transaction(storeName, 'readonly');
		const store = tx.objectStore(storeName);
		const request = store.getAll();
		request.onsuccess = () => resolve(request.result);
	});
}

export function savePrisoner(db, prisoner, storeName = 'prisoners') {
	return new Promise((resolve) => {
		const tx = db.transaction(storeName, 'readwrite');
		const store = tx.objectStore(storeName);
		store.put(prisoner);
		tx.oncomplete = () => resolve();
	});
}

export async function clearAllPrisoners() {
	const db = await openDB();
	const tx = db.transaction('prisoners', 'readwrite');
	const store = tx.objectStore('prisoners');
	await store.clear();
	await tx.done;

	console.log('All prisoners deleted!');
	// Optional: Refresh prisonerCount or UI here
	prisonerChars = [];
	prisonerCount = 0;
}

export function deletePrisoner(db, id, storeName = 'prisoners') {
	return new Promise((resolve) => {
		const tx = db.transaction(storeName, 'readwrite');
		const store = tx.objectStore(storeName);
		store.delete(id);
		tx.oncomplete = () => resolve();
	});
}