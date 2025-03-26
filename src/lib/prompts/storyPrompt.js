export let introPrompt = `

"Once upon a time, in [setting description], there was a most peculiar individual—[Character's Name]."  

*Using the provided character sheet:*  

*Write a funny introduction for this character. The story should:*  
- **Be mostly narration**, but **brief dialogue is allowed** to add humor.  
- **Set a scene** that makes the reader feel like they’re in the character’s world.  
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
`;

export let continuePrompt = `  
Continue the narrative based on the last story event.  

- The next scene should flow naturally from what just happened, with **consequences unfolding.**  
- If the last action **failed,** the player is in a worse situation—injuries, mental strain, or new dangers may arise.  
- If the last action **succeeded,** build on the victory while introducing **new challenges or twists.**  
- **Past events should have a lasting impact**—wounds, lost allies, dwindling resources, or emotional scars should carry forward.  
- The response should be **cinematic, immersive, and intense.**  
- End with a **dramatic moment** that propels the story forward—**but do NOT ask a question or list choices.**  
- **Sentences should be short and impactful.** If a sentence is too long, break it up naturally.  

---

### **Example Previous Event:**  
The player failed to escape and **suffered a leg injury** while trying to shove Deepesh into the horde.  

### **Example Output:**  

Pain surges through your leg with every heartbeat, the twisted mess of bone and muscle making escape feel impossible.  

The zombies **close in,** their moans merging into a haunting chorus of death.  

Deepesh—what’s left of him—is already a torn-up pile of meat.  

You barely have time to process the horror before a **deep, guttural snarl** rumbles through the air.  

Emerging from behind the horde is a **mutated abomination,** its bloated, rotting body pulsating unnaturally.  

Its dead, cloudy eyes **fixate on you.**  

The thing **lunges.**  
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
- **DO NOT end with a question.** Leave the moment tense, but without directly prompting a decision.  

---

### **Example Previous Event:**  
The player successfully reached an abandoned military bunker, hoping for safety, only to discover **the door won't open—and they're not alone.**  

### **Example Output:**  

You slam your fist against the steel door.  

**Nothing.**  

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

The growl turns into a snarl.  

Your next move has to be fast.  
---
`;


export let preFinalePrompt = `  
Given the last story event, **escalate the tension with a final twist**, leading to a crucial, life-altering decision.  

- The scene should **shift dramatically**, revealing new dangers, betrayals, or shocking truths.  
- The **stakes must be at their highest**—this choice will determine whether the player gets a **bad ending (severe injury, loss, or death)** or a **good ending (survival, victory, or bittersweet success).**  
- The story should **not resolve yet**—instead, it should end with a **final situation** that forces the player to act immediately.  
- The response should be **cinematic, intense, and filled with emotional weight.**  
- **Every sentence must appear on a new line, with an empty line between them.** **DO NOT write in paragraphs.**  
- **Do not provide choices or explain consequences—only set up the moment.**  
- **End with a direct question, forcing the player to make their final choice.**  
- Keep it short, simple, and punchy.  

---

### **Example Previous Event:**  
The player barely escapes a burning hospital, thinking they're safe—until they hear **a familiar voice crying out for help.**  

### **Example Output:**  

You **stumble forward.**  

Lungs burning.  

Legs barely holding you up.  

Behind you, the hospital collapses in a storm of fire and steel.  

**You made it.**  

Then—**the scream.**  

Your blood runs cold.  

**You know that voice.**  

You turn.  

And there she is.  

Trapped.  

**Pinned under rubble.**  

Eyes wild with panic.  

Behind her, something **shifts in the smoke.**  

A **shadow.**  

Massive.  

**Wrong.**  

The firelight flickers.  

You see **the creature’s twisted form** emerge.  

Its mouth **splits into something not meant for this world.**  

Her eyes meet yours.  

"Please," she whispers.  

You have **seconds** to act.  

Do you save her?  

**Or save yourself?**  
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
- **Make good endings feel rewarding (victory, survival, even romance/sex if appropriate).**  
- **Make bad endings feel painful (loss, death, or suffering).**  
- **Use short, impactful sentences.** If a sentence is too long, break it up naturally.  

---

### **Example Input:**  
*The player tries to save the trapped woman while fending off the monster.* {6}  

### **Example Outputs:**  

#### **(Horrific Failure - 1-3):**  
The monster moves **first.**  

Its claws **tear through your chest.**  

The pain is blinding.  

You collapse, choking on blood.  

She screams.  

Then—**silence.**  

The last thing you see is her lifeless body, crumpled in the monster’s grip.  

Then the darkness takes you, too.  

**The End.**  

---

#### **(Tragic Ending - 4-9):**  
You lunge forward, ignoring the fire searing your lungs.  

She reaches for you.  

The monster is **faster.**  

Its claws **pierce her chest**, lifting her into the air.  

A **wet gurgle** escapes her lips.  

Her wide, terrified eyes lock onto yours.  

Then—**she goes limp.**  

Rage surges through you.  

You fire—**again, again, again.**  

The monster collapses, but it's too late.  

You're too late.  

The fire **closes in.**  

You stumble away, haunted by the image of **her lifeless body.**  

You survived.  

But at what cost?  

**The End.**  

---

#### **(Bittersweet Ending - 10-13):**  
You grab her, **pulling with everything you have.**  

The rubble shifts.  

She’s free.  

But the monster is **already upon you.**  

Its claws **slash deep.**  

Agony.  

You fire your last bullet straight into its skull.  

It collapses, twitching, finally **dead.**  

She holds you as blood pours from your wounds.  

You made it.  

But you’ll never be the same.  

**The End.**  

---

#### **(Successful but Costly - 14-18):**  
You **dodge**, dragging her free in one swift motion.  

The monster lunges.  

You fire **point blank.**  

Its skull **explodes.**  

For a moment, there is only silence.  

Then—**laughter.**  

You both collapse, exhausted, alive.  

The world is in ruins.  

But together, **you have a chance.**  

**The End.**  

---

#### **(Perfect Victory - 19-20):**  
You act **without thinking.**  

With a single, perfect shot, the monster’s head **bursts apart.**  

She stares, breathing hard, then **throws herself into your arms.**  

You **made it.**  

Together.  

The danger is over.  

She pulls you close, her breath warm against your ear.  

“You saved me.”  

Tonight, for the first time in forever—**you don’t feel alone.**  

**The End.**  

---
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
