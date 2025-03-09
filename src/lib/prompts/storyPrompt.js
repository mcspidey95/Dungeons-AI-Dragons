export let introPrompt = `

"Once upon a time, in [setting description], there existed a most peculiar individual—[Character's Name]."*  

*Using the provided character sheet:*  

*Craft a humorous introduction for this character. The story should:*  
- **Be purely narration**—no dialogue.  
- **Set a scene** that immerses the reader in the character's world.  
- **Describe the character in a funny way** without listing stats—just naturally weave in the details.  
- **Keep it short, simple, and punchy** (aim for 3-5 sentences max).  
- **Introduce supporting characters** (nemeses, enemies, or unfortunate bystanders) if relevant.  
- **Ensure that each sentence is followed by a newline (enter) for better readability.**  

**Example Output Format:**  

*"Once upon a time, in the sleepy town of Bumbledorf, there lived a man whose greatest enemy was his own two feet.  

Sir Reginald Wobblebottom could trip over a shadow, and often did.  

The townsfolk had stopped gasping at his falls and had started taking bets.  

Even the town's pigeons, normally impartial creatures, seemed to target him with remarkable accuracy.  

Yet, despite the universe's clear bias against him, Reginald marched forward—until, of course, he marched straight into the town fountain."*  


- Now here is your new character sheet: 

`;



export let preChoicePrompt = `

*Continue the humorous story:*

*The continuation should:*  
- **Follow the same style**—pure narration, lighthearted, and comedic.  
- **Introduce a new scenario** that puts the character in an absurd or tricky situation.  
- **Force the character to make a choice**—one that could impact the story's direction.  
- **Keep it short, simple, and punchy** (3-5 sentences max).  
- **Include other characters or elements** (nemeses, allies, or even animals conspiring against them).  
- **End with a question** to prompt the user to decide the next action.  
- **Ensure each sentence has a newline (enter) for better readability.**  

**Example Output Format:**  

*"As Sir Reginald Wobblebottom emerged from the town fountain, drenched and defeated, he faced a dilemma.  

To his left, the mayor's wife approached, her prized porcelain poodle statue shattered at his feet.  

To his right, the annual Bumbledorf Pie Festival had just begun, and the scent of freshly baked disaster filled the air.  

He could stay and attempt an apology, though history suggested his words would somehow make things worse.  

Or he could flee—straight into a gathering of elderly ladies armed with dangerously wobbly custard pies.  

Both options seemed equally disastrous.  

What does he do?"*
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