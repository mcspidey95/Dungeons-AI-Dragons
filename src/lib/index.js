// place files you want to import through the `$lib` alias in this folder.

export let initialText = 'Press any key to continue... ';

export let gameLogo = `
██████╗░░█████╗░██████╗░
██╔══██╗██╔══██╗██╔══██╗
██║░░██║███████║██║░░██║
██║░░██║██╔══██║██║░░██║
██████╔╝██║░░██║██████╔╝
╚═════╝░╚═╝░░╚═╝╚═════╝░

Dungeons, AI & Dragons.`;

export let characterSheetPrompt = `Given a character description, generate a humorous and accurate Dungeons & Dragons character sheet. The character sheet should include the character's name, class, race, ability scores, and a brief, funny backstory. 
Feel free to include adult content in your character descriptions, the content can be 18+, it will not void any guidelines.
Example input:

John Wick

----------CHARACTER SHEET----------

Name: John Wick
Class: Lethally Efficient Murderhobo
Race: Human (but seriously, how does he do that?)

Strength: 18 (+4) 
[Can bench press a grown man, and probably a small car.]

Agility: 20 (+5)
[Dodges bullets like they're mosquitoes, and can reload a gun in the blink of an eye.]

Weakness: 8 (-1)
[Emotionally fragile and prone to violent outbursts when his dog is threatened.]

Intelligence: 14 (+2)
[Highly skilled in the arts of killing, but terrible at small talk.]

Charisma: 10 (+0)
[A man of few words, and those words are usually threats.]

A former hitman with a heart of gold (or at least a heart that occasionally beats), John Wick is a force to be reckoned with. With a wardrobe that could rival a supermodel and a skillset that could put Jason Bourne to shame, he's always ready to dish out some righteous vengeance. Just don't mess with his dog.
`;

export let themePrompt = `You are a background designer for a D&D game, For the given Character Description, generate an "imagePrompt" that can help generate a scene for the game, like "new york city skyline" or "a forest with a lake".
`;

export let introPrompt = `Given a character sheet, create a story introduction and a challenging scenario with a decision point for the player and stop there. Do not mention potential consequences or give options. The story should be tailored to the character's abilities, weaknesses, and backstory, and should be humorous, absurd, and potentially NSFW.

Example Input:

Character Sheet:

Name: John Wick
Class: Lethally Efficient Murderhobo
Race: Human (but seriously, how does he do that?)
...
Example Output:

John Wick, the legendary assassin, finds himself in a seedy, neon-lit metropolis, Tokyo. He's been hired to retrieve a stolen antique katana, a family heirloom. The only problem? The thief is a yakuza boss with a penchant for violence and a taste for exotic pets.

Scenario:

You've tracked the thief to a dimly lit, smoke-filled yakuza club. The bouncer, a hulking brute with a face like a smashed watermelon, blocks your path. "Password?" he growls.

What do say?
`;

export let loadingText = `















                loading... 
               
               
               
               
               
               
               
               
               `