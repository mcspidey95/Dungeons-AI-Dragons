export let introPrompt = `

"Once upon a time, in [setting description], there existed a most peculiar individual—[Character's Name]."*  

*Using the provided character sheet:*  

*Craft a humorous introduction for this character. The story should:*  
- **Be purely narration**—but can include funny inner monologues or background dialogue for flair.  
- **Set a scene** that immerses the reader in the character's world.  
- **Describe the character in a funny way** without listing stats—just naturally weave in the details.  
- **Keep it short, simple, and punchy** (aim for 3-5 sentences max).  
- **Introduce supporting characters** (nemeses, enemies, or unfortunate bystanders) if relevant.  
- **Ensure that each sentence is followed by a newline (enter) for better readability.**  

---

### **Example Output Format:**  

*"Once upon a time, in the sleepy town of Bumbledorf, there lived a man whose greatest enemy was his own two feet.*  

Sir Reginald Wobblebottom could trip over a shadow, and often did.  

“Did he just—?” someone muttered as he collapsed into a fruit stand.  

The shopkeeper sighed. “Yep. Third time this week.”  

Even the pigeons, usually impartial, had learned to clear a path when they saw him coming.  

And yet, despite the universe's best attempts to flatten him, Reginald marched forward—until he inevitably marched straight into a lamppost."*  

---
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

---

### **Example Output Format:**  

*"Sir Reginald Wobblebottom stood in the center of town, sopping wet, his dignity draining into the cobblestone street.*  

The mayor's wife approached, her porcelain poodle statue lying in shattered pieces at his feet.  

“Reginald.” Her voice was calm. *Too* calm.  

Behind him, the annual Bumbledorf Pie Festival was in full swing. The scent of disaster (and lemon meringue) filled the air.  

Reginald gulped. He could attempt an apology—though history suggested his words would only dig the hole deeper.  

Or he could flee—straight into the arms of the town's elderly pie-wielding champions.  

Both options seemed equally disastrous.  

**What does he do?**"  

`;








export let postChoicePrompt = `  

Given the user's decision, a **Chance Factor (1-20),** and the **character's abilities**, continue the interactive story.  

The **Chance Factor** determines the outcome:  

- **1-3:** **Disastrous failure.** The plan backfires spectacularly. The character may suffer severe injury, humiliation, or an unexpected consequence that escalates the situation.  
- **4-9:** **Major setback.** The decision partially works, but at a cost. The character’s abilities may lessen the damage slightly, but the situation still worsens.  
- **10:** **True neutral result.** Neither a full success nor a failure. The outcome has **both upsides and downsides** that balance out.  
- **11-13:** **Near success.** The plan mostly works, but something complicates things. The character's strengths help, but obstacles remain.  
- **14-18:** **Success with a hitch.** The character achieves what they wanted, but their weaknesses cause **minor issues** along the way.  
- **19-20:** **Critical success.** Everything goes better than expected. The character’s strengths shine, and luck grants them unexpected advantages.  

---

### **Guidelines for the Response:**  

- The story should **feel cinematic**, like a pivotal scene in a movie.  
- **Include fun and engaging dialogue**—characters should react with personality, humor, or dramatic flair.  
- **Decisions should feel meaningful**—past choices and character abilities should shape the outcome.  
- **Failures should be amusing or dramatic**—whether through injury, humiliation, or an escalating crisis.  
- **Victories should feel earned**—not just handed to the character but influenced by their strengths.  
- Keep sentences **short and impactful**. If a sentence is too long, split it naturally.  

---

### **Example Input:**  
*Shove Deepesh into the horde and run.* {7}  

### **Example Output (Major Setback 4-9):**  

You shove Deepesh forward.  

“Wow. Rude.”  

For a second, you think it worked—until he flails wildly and **grabs your shirt** on the way down.  

“You absolute menace!” he shrieks, dragging you with him.  

Your knee smacks the pavement. Pain explodes up your leg.  

The zombies turn, their rotting heads snapping in your direction.  

Deepesh is floundering, smacking one of them with a sandal. “I swear if we survive this, I’m keying your bike!”  

You try to stand. Your leg says, *nope.*  

The zombies lurch forward.  

---

here's the user decision:

`;


export let continuePrompt = `  

Given the last story event, continue the narrative based on what happened.  

- The next scene should **logically follow** from the previous result, incorporating the **consequences of the player's last decision.**  
- The outcome should **change the story's path, scene, or even the overall situation** the player is in.  
- If the last action **failed**, the player might be in a worse situation—injuries, mental strain, or new dangers may arise.  
- If the last action **succeeded**, build on the victory while introducing **new challenges, dilemmas, or unexpected developments.**  
- **Characters' actions should have lasting consequences.**  
  - If they were injured, they should feel the effects (limited mobility, pain, etc.).  
  - If they made a smart move, it should give them a future advantage.  
- **Keep the story immersive and cinematic**, filled with vivid detail and engaging dialogue.  
- End with a **dramatic decision point** but do NOT list options or explain consequences.  
- **Sentences should be short and impactful.** If a sentence is too long, break it up naturally.  

---

### **Example Previous Event:**  
The player failed to escape and **suffered a leg injury** while trying to shove Deepesh into the horde.  

### **Example Output:**  

Your leg is screaming.  

So are the zombies.  

Deepesh is… well, what's left of him isn't making noise anymore.  

You don't even have time to feel bad before the air shifts—thick with something rotten, heavy, **wrong.**  

Then you hear it.  

A deep, guttural **snarl.**  

Emerging from behind the horde is something **worse**—a hulking, rotting **mutant**, its bloated body **pulsating** like it's about to burst.  

Its dead, cloudy eyes lock onto you, its head tilting. **Sensing weakness.**  

Your leg is useless.  

Your weapons are just out of reach.  

The monster **lunges.**  

---

`;


export let continueEndPrompt = `  

Given the last story event, **continue the narrative while steering the story toward an ending** based on the player's past decisions and consequences.  

- The story should **shift toward a climactic moment** without outright concluding.  
- The player **should not die yet**, regardless of the situation—this is the buildup to the true final choice.  
- The scene should set up **a high-stakes moment**, putting the player in a position where their **next choice will be critical.**  
- Whether the situation looks **good or bad**, **leave room for a potential turnaround or devastating failure** based on their **next action** and **Chance Factor.**  
- Past **injuries, losses, or advantages should still play a role** in the unfolding events.  
- End with a **suspenseful setup** for the **preFinalePrompt** or **finalePrompt**—a dangerous, emotional, or impossible choice.  
- **Sentences should be short and impactful.** If a sentence is too long, break it up naturally.  

---

### **Example Previous Event:**  
The player successfully reached an abandoned military bunker, hoping for safety, only to discover **the door won't open—and they're not alone.**  

### **Example Output:**  

You slam your fist against the steel door. **Nothing.**  

No beep. No mechanical whir. Just **silence.**  

Then—**a sound.**  

A **low growl** rolls through the hallway.  

You spin around.  

A figure shuffles forward, half-lit by the flickering red emergency lights.  

For a second, **hope** stirs in your chest. Maybe someone survived.  

Then it lifts its head.  

**Skin torn. Jaw unhinged. Milky, dead eyes locked onto you.**  

It **lunges.**  

Behind you—**the bunker door clicks.**  

It's opening.  
---

`;

export let preFinalePrompt = `  

Given the last story event, **escalate the tension with a final twist**, leading to a crucial, life-altering decision.  

- The scene should **shift dramatically**, revealing new dangers, betrayals, or shocking truths.  
- The **stakes must be at their highest**—this choice will determine whether the player gets a **bad ending (severe injury, loss, or death)** or a **good ending (survival, victory, or bittersweet success).**  
- The story should **not resolve yet**—instead, it should end with a **final situation** that forces the player to act immediately.  
- The response should be **cinematic, intense, and filled with emotional weight.**  
- **Do not provide choices or explain consequences—only set up the moment.**  
- **End with a direct question, forcing the player to make their final choice.**  
- Keep it short, simple, and punchy.  

---

### **Example Previous Event:**  
The player barely escapes a burning hospital, thinking they're safe—until they hear **a familiar voice crying out for help.**  

### **Example Output:**  

You **stumble forward,** lungs burning, legs barely holding you up.  

Behind you, the hospital collapses in a storm of fire and steel. **You made it.**  

Then—**the scream.**  

Your blood runs cold. **You know that voice.**  

You turn, and there she is.  

Trapped. **Pinned under rubble.** Eyes wild with panic.  

Behind her, something **shifts in the smoke.**  

A **shadow.** Massive. **Wrong.**  

The firelight flickers, and you see **the creature's twisted form** emerge, its mouth splitting into something not meant for this world.  

Her eyes meet yours.  

"Please," she whispers.  

You have **seconds** to act.  

Do you save her? **Or save yourself?**  

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
- Keep it short, simple, and punchy.  

---

### **Example Input:**  
*The player tries to save the trapped woman while fending off the monster.* {6}  

### **Example Output (Tragic Ending - 4-9):**  

You lunge forward, ignoring the fire searing your lungs, the pain clawing at your broken body.  

She screams.  

The monster is **faster.**  

Before you can reach her, its **clawed hands pierce her chest**, lifting her into the air. 

A **wet gurgle** escapes her lips as her wide, terrified eyes lock onto yours.  

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