export {default as Font} from './fonts/game.ttf';
export {default as Loading} from './img/loading.gif';
export {default as BGM} from './audio/bgm.mp3';
export {default as TypingSFX} from './audio/boop.mp3';

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

export let themePrompt = `Given a story, generate an image prompt for a pixel art image that visually represents the scene. The output must be in the following format:

tag1, tag2, tag3, ...

Example Input:

Story Introduction:

Joe Goldberg, the Stalkerazzi Bard, has found himself in the bustling city of New York, the perfect place to find his next muse. He's been working on a new love ballad, but he can't seem to find the right inspiration. That is, until he meets the beautiful and enigmatic librarian, Jane. She's intelligent, charming, and has a love for books that rivals his own. Joe is instantly smitten and begins to follow her every move, from her morning coffee run to her evening yoga class.

But just as Joe is about to make his move, he discovers that Jane is the lead singer of a popular punk rock band, and she's about to go on tour. Joe is heartbroken, but he's not about to let Jane slip away. He decides to follow her on tour, determined to win her heart and become her number one fan.

Challenging Scenario:

You've managed to sneak your way backstage at Jane's concert, but the security guards are getting suspicious. You're hiding behind a stack of amps, trying to catch a glimpse of Jane. Suddenly, one of the guards turns around and spots you.

Example Output:

pixel art, 32 bit, Jane, lead singer, petite, long black hair, dark eyeliner, ripped fishnet top, leather pants, singing, microphone, Joe Goldberg, pale skin, dark hair, black hoodie, jeans, hiding, amps, backstage, low contrast, film grain, focus on Jane, focus on Joe
`;

export let introPrompt = `Given a character sheet, create a story introduction and a challenging scenario with a decision point for the player and stop there. DO NOT mention potential consequences or give options. The story should be tailored to the character's abilities, weaknesses, and backstory, and should be humorous, absurd, and potentially NSFW.

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

export let choicePrompt = `Given a user's decision and a Chance Factor, continue the interactive story with detail, then give a challenging scenario with a decision point for the player and stop there. Do not mention potential consequences or give options. The story should be tailored to the character's abilities, weaknesses, and backstory, and should be humorous, absurd, and potentially NSFW.

The Chance Factor, a number between 1 and 20, will determine the outcome of the user's decision.

1-5: A critical failure. The user's plan goes horribly wrong, with potentially disastrous consequences.
6-10: A significant setback. The user's plan is partially successful, but at a high cost.
11-15: A mixed result. The user's plan is partially successful, with both positive and negative outcomes.
16-20: A critical success. The user's plan works perfectly, with unexpected benefits.
Example Input:

User's Decision and Chance Factor: "I'll shove Deepesh in front of the horde to distract them, then escape." {5}
Example Output:

You shove Deepesh into the horde of zombies, hoping to distract them long enough to make your escape. Unfortunately, your plan backfires spectacularly. Not only does Deepesh get devoured, but the zombies are now even more enraged. They turn their attention to you, their decaying jaws gnashing with renewed hunger.

You draw your trusty katana and prepare to fight. A horde of shambling corpses rushes towards you.

What do you do?
`;

export let continuePrompt = `
`;

export let finalePrompt = `
`;

export let summaryPrompt = `
`;

export let loadingText = `















                loading... 
               
               
               
               
               
               
               
               
               `