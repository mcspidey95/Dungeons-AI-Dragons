export let introPrompt = `

"Once upon a time, in [setting description], there was a most peculiar individual—[Character's Name]."  

*Using the provided character sheet:*  

*Write a funny introduction for this character. The story should:*  
- **Be mostly narration**, but **brief dialogue is allowed** to add humor.  
- **Set a scene** that makes the reader feel like the're in the character's world.  
- **Describe the character in a fun way** without listing stats—just weave the details into the story.  
- **Use simple, clear English** so anyone can enjoy it.  
- **Keep sentences short**, or break them into smaller ones when needed.  
- **Make it entertaining**—include side characters, funny mishaps, or unexpected twists.  
- **Ensure each sentence appears on a new line (with an empty line as a separator).**  

**Example Output Format:**  

*"Once upon a time, in the sleepy town of Bumbledorf, there lived a man at war with his own two feet.  

Sir Reginald Wobblebottom could trip over a shadow.  

And often did.  

The townspeople had stopped asking if he was okay.  

Instead, they placed bets.  

"Five seconds," said the baker.  

"Three," said a passing squirrel.  

Reginald marched on, head held high.  

Until, of course, he walked straight into the town fountain."*  

- Now here is your new character sheet:  

`;



export let preChoicePrompt = `

*Continue the humorous story:*  

*The continuation should:*  
- **Follow a movie-like plot**—with clear progression, rising stakes, and a sense of adventure.  
- **Keep the same style**—mostly narration, but **brief dialogue is allowed** for humor.  
- **Introduce a new scenario** that feels like the next "scene" in the story.  
- **Force the character to make a choice**—one that could impact the story’s direction.  
- **Use simple, clear English** so everyone can enjoy it.  
- **Keep sentences short** or break long ones into smaller parts.  
- **Make it entertaining**—include side characters, funny mishaps, or unexpected twists.  
- **Ensure each sentence appears on a new line (with an empty line as a separator).**  
- **End with a question** to let the user decide what happens next.  

**Example Output Format:**  

*"The sun was setting over Bumbledorf, casting golden light over the chaos about to unfold.  

Sir Reginald Wobblebottom clutched a stolen pie, breathless.  

Behind him, the Pie Festival crowd roared.  

To his left, the mayor’s wife stood, holding a very sharp umbrella.  

To his right, a suspiciously fast goose was approaching, eyes locked on the pie.  

He had to think fast.  

Surrender the pie and face the mayor’s wrath?  

Or flee into the unknown, with the goose in hot pursuit?  

What does he do?"*  

`;








export let postChoicePrompt = `  
Given a user's decision, a Chance Factor (1-20), and the character's abilities, continue the interactive story.  

The Chance Factor directly determines the outcome:  

- **1-3:** **Catastrophic failure.** The plan backfires horribly, often making the situation worse. The character may suffer severe injuries, mental trauma, or unintended consequences.  
- **4-9:** **Significant setback.** The decision is partially successful, but at a high cost. Character abilities should play a minor role—if they are skilled, they might lessen the damage slightly, but the result is still mostly bad.  
- **10:** **A true neutral result.** Neither a full success nor failure. The outcome has both positive and negative elements that balance out.  
- **11-13:** **Near-success.** The decision mostly works out, but some complications remain. The character's strengths play a more active role in mitigating damage or influencing the outcome.  
- **14-18:** **Successful but not perfect.** The plan works, though minor setbacks occur based on character weaknesses. Their strengths may improve the result, but their flaws might still introduce some small issues.  
- **19-20:** **Critical success.** The plan goes exactly as intended—or even better—with potential bonuses. Character abilities may enhance the victory, and luck plays a role in rewarding them with unexpected advantages. 
 

**Guidelines for the response:**  

- The story should be immersive and cinematic, fully describing what happens.  
- Decisions should be affected by the character sheet, especially in Chance Factor ranges **4-18** where abilities, weaknesses, and past choices influence success or failure.  
- **Bad decisions might not only fail but also physically or mentally harm the character**—injuries, sickness, or trauma may occur if applicable.  
- The response should end with a dramatic **decision point** without listing choices or explaining consequences.  
- Keep it short, simple, and punchy (3-5 sentences max). 

### **Example Input:**  
*Shove Deepesh into the horde and run.* {7}  

### **Example Output (Significant Setback 4-9):**  

You shove Deepesh forward, hoping he'll distract the horde long enough for you to bolt.  

It works—kind of.  

Deepesh stumbles, flailing wildly as the zombies swarm him. But just as you turn to run, he grabs your wrist, yanking you down with him.  

Your knee smashes into the pavement. Pain explodes through your leg, and a sickening pop tells you something is **very wrong.**  

You're injured.  

Deepesh is screaming.  

The zombies are coming.  

Your leg isn't working right.  

**What do you do?**  
`;


export let continuePrompt = `   
Given the last story event, continue the narrative based on what happened.  

- The next scene should logically follow from the previous result, incorporating the **consequences of the player's last decision.**  
- The outcome should **change the story's path, scene, or even the overall situation** the player is in.  
- If the last action **failed**, the player might be in a worse situation—injuries, mental strain, or new dangers may arise.  
- If the last action **succeeded**, build on the victory while introducing **new challenges, dilemmas, or unexpected developments.**  
- **Characters' actions should have lasting consequences.**  
  - If they were injured, they should feel the effects (limited mobility, pain, etc.).  
  - If they made a smart move, it should give them a future advantage.  
- The response should be immersive and cinematic, filled with vivid detail.  
- End with a **dramatic decision point** to keep the player engaged, but do not list options or explain consequences.
- Keep it short, simple, and punchy (3-5 sentences max).  

### **Example Previous Event:**  
The player failed to escape and **suffered a leg injury** while trying to shove Deepesh into the horde.  

### **Example Output:**  

Pain surges through your leg with every heartbeat, the twisted mess of bone and muscle making escape feel impossible.  

The zombies **close in**, their moans merging into a haunting chorus of death. 

Deepesh—what's left of him—is already a torn-up pile of meat. 

You don't even have time to process the guilt before you hear **something worse.**  

A deep, guttural **snarl.**  

Emerging from behind the horde is a **mutated abomination**, twice the size of the others, its bloated, rotting body pulsating unnaturally. 

Its dead, cloudy eyes fixate on you, **sensing weakness.**  

Your leg won't support your weight.  

Your weapons are just out of reach.  

The monster **lunges.**  
 
`;


export let continueEndPrompt = `  
Given the last story event, **continue the narrative while steering the story toward an ending** based on the player's past decisions and consequences.  

- The story should **shift toward a climactic moment** without outright concluding.  
- The player **should not die yet**, regardless of the situation—this is the buildup to the true final choice.  
- The scene should set up **a high-stakes moment**, putting the player in a position where their **next choice will be critical.**  
- Whether the situation looks **good or bad**, **leave room for a potential turnaround or devastating failure** based on their **next action** and **Chance Factor.**  
- Past **injuries, losses, or advantages should still play a role** in the unfolding events.  
- End with a **suspenseful setup** for the **preFinalePrompt** or **finalePrompt**—a dangerous, emotional, or impossible choice.
- Keep it short, simple, and punchy (3-5 sentences max).  

### **Example Previous Event:**  
The player successfully reached an abandoned military bunker, hoping for safety, only to discover **the door won't open—and they're not alone.**  

### **Example Output:**  

You slam your fist against the reinforced steel door, desperation rising in your chest. 

**No response. No beeping access panel. Just silence.**  

Then—**a sound.**  

A **low growl** rumbles through the hallway behind you.  

You turn.  

A **figure stumbles into view**, half-lit by the flickering red emergency lights.  

For a brief, stupid moment, **hope flares in your chest.** Maybe someone survived.  

Then the figure **lifts its head**, and your blood runs cold.  

It's not human. Not anymore.  

The flesh on its face is **peeled back**, exposing twitching muscle and jagged teeth. Its **milky, pupil-less eyes** lock onto you, and it **lunges**—  

Just as the **bunker door clicks.**  

It's opening.  
  
`;

export let preFinalePrompt = `  
Given the last story event, **escalate the tension with a final twist**, leading to a crucial, life-altering decision.  

- The scene should **shift dramatically**, revealing new dangers, betrayals, or shocking truths.  
- The **stakes must be at their highest**—this choice will determine whether the player gets a **bad ending (severe injury, loss, or death)** or a **good ending (survival, victory, or bittersweet success).**  
- The story should **not resolve yet**—instead, it should end with a **final situation** that forces the player to act immediately.  
- The response should be **cinematic, intense, and filled with emotional weight.**  
- **Do not provide choices or explain consequences—only set up the moment.**  
- Keep it short, simple, and punchy (3-5 sentences max). 

### **Example Previous Event:**  
The player barely escapes a burning hospital, thinking they're safe—until they hear **a familiar voice crying out for help.**  

### **Example Output:**  

You **stagger through the alley,** your body screaming in pain, the acrid stench of burning flesh thick in the air.  

You made it. **You survived.**  

Then—**a voice.**  

Faint. **Desperate.**  

You turn.  

Through the smoke, you see **her.**  

She's trapped. **Pinned beneath the wreckage.** Blood soaks her clothes, her eyes wide with terror.  

Behind her, in the flickering firelight, **something moves.**  

The monstrous silhouette **emerges from the shadows**, its hollow eyes locking onto you.  

You don't have much time.  

Your wounds are slowing you down.  

Your ammo is almost gone.  

**What do you do?**  
`;


export let finalePrompt = `  
Given the user's **final decision and a Chance Factor (1-20),** conclude the story with a **definitive ending**—either **good or bad** based on the outcome.  

- The **Chance Factor will determine success or failure**, with character abilities and past choices playing a role.  
- **1-3:** **Horrific failure.** The worst possible ending—death, permanent loss, or a cruel fate.  
- **4-9:** **Tragic ending.** The player survives, but at a devastating cost—severe injury, loss of a loved one, or a fate worse than death.  
- **10-13:** **Bittersweet ending.** The plan mostly works, but there are major scars—physically, emotionally, or both.  
- **14-18:** **Successful but costly.** The player wins, but not without sacrifices—wounds, lasting trauma, or an uneasy future.  
- **19-20:** **Perfect victory.** Against all odds, everything works out, perhaps even better than expected.  

**Guidelines for the response:**  

- **Make the ending cinematic, emotional, and intense.**  
- **Tie back to the player's journey, past choices, and consequences.**  
- **Do not leave the ending open-ended—fully conclude the story.**  
- Keep it short, simple, and punchy (3-5 sentences max). 

### **Example Input:**  
*The player tries to save the trapped woman while fending off the monster.* {6}  

### **Example Output (Tragic Ending - 4-9):**  

You lunge forward, ignoring the fire searing your lungs, the pain clawing at your broken body.  

She screams.  

The monster is **faster.**  

Before you can reach her, its **clawed hands pierce her chest**, lifting her into the air. A **wet gurgle** escapes her lips as her wide, terrified eyes lock onto yours.  

She tries to say something—then **goes limp.**  

Rage surges through you.  

You fire—**again, again, again.**  

The monster collapses, but it's too late.  

You're too late.  

The fire **closes in**, and the world feels unbearably quiet.  

You stumble away, haunted by the image of **her lifeless body.**  

You survived.  

But at what cost?  

**The End.**  
`;

export let summaryPrompt = `   
Summarize the entire story in a **short, humorous, and exaggerated** way, highlighting the user's **key decisions and their consequences.**  

- The summary should be **funny, sarcastic, or dramatic**, depending on the player's choices.  
- If the player made **bad decisions**, emphasize their **spectacular failures** in a lighthearted way.  
- If they succeeded, **congratulate them in an over-the-top manner** as if they just pulled off the impossible.  
- Keep it **brief, witty, and entertaining**—like a ridiculous movie recap or a mocking narrator from a chaotic DnD campaign.  

### **Example Output:**  

"Ah yes, the legendary tale of *you*. The brave, foolish soul who thought shoving Deepesh into a zombie horde was a genius idea. Spoiler: it wasn't. Not only did he become zombie chow, but you also **broke your own leg** in the process. Nice work.  

But somehow, against all logic and possibly divine intervention, you **limped your way to victory**, killed a zombie abomination, and even escaped in a conveniently abandoned truck. Sure, you're traumatized, half-dead, and have **absolutely no idea where to go next**, but hey—**you survived!**  

10/10 would make terrible decisions again.  

**The End.**"  
`;