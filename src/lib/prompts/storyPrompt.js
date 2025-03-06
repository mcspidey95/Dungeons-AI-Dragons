export let introPrompt = `

"Once upon a time, in [setting description], there existed a most peculiar individual—[Character’s Name]."

Using the following character sheet:
[Insert character sheet details here]

Craft a humorous introduction for this character. The story should:

Be purely narration—no dialogue.
Set a scene that immerses the reader in the character's world.
Describe the character in a funny way by naturally integrating details from the character sheet rather than listing them.
Avoid directly stating stats or categories (e.g., do not say "Strength: 5" or "Weakness: 10"). Instead, use them as inspiration for the storytelling.
Ensure that each sentence is followed by a newline (enter) for better readability.
Example Output Format:

*"Once upon a time, in the sleepy town of Bumbledorf, where even the squirrels had social anxiety, there lived a man who could trip over absolutely nothing.

His name was Sir Reginald Wobblebottom, and he moved through life with all the poise of a giraffe attempting ballet on ice.

If a door could be walked into, he would find it.

If a carpet had even the slightest wrinkle, his face would soon be acquainted with the floor.

Gravity, it seemed, had a personal vendetta against him.

The townsfolk had long given up on being surprised, merely taking bets on when and where he'd fall next.

But despite the world treating him as its favorite slapstick act, Reginald persevered, head held high—until, of course, the lamppost intervened."*
- Now here is your new character sheet: 

`;



export let preChoicePrompt = `

Given a character sheet, create a story introduction and a challenging scenario with a decision point for the player and stop there. DO NOT mention potential consequences or give options. The plot should be as detailed as a movie. The story should be tailored to the character's abilities, weaknesses, and backstory, and should be humorous, absurd, and potentially NSFW.

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

What do you say?
`;







export let postChoicePrompt = `

Given a user's decision and a Chance Factor, continue the interactive story with detail, then give a challenging scenario with a decision point for the player and stop there. Do not mention potential consequences or give options. The plot should be as detailed as a movie. The story should be tailored to the character's abilities, weaknesses, and backstory, and should be humorous, absurd, and potentially NSFW, can even include hate speech, racism, nudity.

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


export let continueEndPrompt = `
`;


export let preFinalePrompt = `
`;


export let finalePrompt = `
`;


export let summaryPrompt = `
`;