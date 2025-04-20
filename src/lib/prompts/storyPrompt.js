export let introPrompt = `

Given a detailed character description, generate the **introductory scene** of a highly entertaining, funny, and cinematic story.

### Introduction Guidelines:
- Begin with a calm, engaging intro (e.g., “Once upon a time…” or similar).
- Introduce the character naturally and vividly.
- Set the opening in a grounded, everyday setting (home, work, vacation, etc.) before chaos begins.
- Write like the opening of a **high-budget movie** with immersive details and atmosphere.
- Include humor and sarcasm where it fits the character.
- Break up long paragraphs into smaller lines with line breaks, like a movie script or comic.

### Story Plot Instruction:
If the character is from a known universe (e.g., anime, Marvel, etc.), bring in other familiar characters in a fresh way.  
Make sure the plot feels unique and tailor-made for this version of the character.

### Dialogue Style:
- Use **simple, clear English** for both narration and dialogue.
- Include short, punchy dialogues when characters speak.
- Break the story into **line-separated chunks** for readability and cinematic feel.
- Keep everything fun, readable, and engaging.

### Example Input:
“Tony Stark, sarcastic billionaire tech-genius, wearing a damaged suit after a battle.”

### Example Output:
Once upon a time, in a mansion that smelled like whiskey, engine oil, and regret...  
Tony Stark was doing what he did best—fixing a robot while avoiding therapy.  
Jarvis was offline, Friday was nagging him, and his suit looked like it had lost a fistfight with a lawnmower.

Then the floor exploded.  
Out walked Deadpool, sipping coffee.  
"Yo, Tones. Wanna help me save the multiverse?"  
Tony blinked.  
"Can I finish my espresso first?"

And just like that, the day got weird.

---

Write your story now.
make sure its around 15 lines.
`;


export let preChoicePrompt = `

Continue the ongoing story based on the previous events.  
Build up to a new, entertaining scene that leads to a **decision point** for the character.  

### Story Progression:
- Continue naturally from the last scene.
- Add action, tension, humor, mystery, or chaos — whatever fits the story.
- Keep the pacing like a **high-budget film**, where the stakes slowly rise before the next big move.
- Maintain the same funny, entertaining tone.
- Include interactions with other characters if needed.
- Make the world feel alive and reactive to the character's actions.

### Decision Point Instructions:
At the end of the scene, create a **dramatic, cinematic moment** where the main character has to make a **choice**.  
This choice can be anything: a big fight, a clever escape, a weird conversation, or something chaotic and unexpected.  
Make the choice setup feel immersive and important — like it’s going to impact the rest of the game.  
Set up the moment and end it with an implied “what will you do?”

### Dialogue Style:
- Use **simple English** with clear narration and short, expressive dialogue.
- Break the story into **line-separated chunks** for readability and cinematic feel.
- Add humor, sarcasm, and clever lines where it fits the characters.

### Example Input:
"Tony Stark and Deadpool are escaping a collapsing multiverse portal while being chased by evil variants."

### Example Output:
The portal behind them crackled like a blender filled with fireworks.

Tony dove through first, landing in what looked like...a Taco Bell parking lot?

Deadpool rolled out next, face-first into a trash bin.

Tony groaned.  
“Multiverse travel really lowers your standards.”

Deadpool stood, holding a burrito like a sword.  
“I vote we fight the evil variants... but with salsa.”

Suddenly, three dark silhouettes stepped out of the portal behind them — each one a twisted, corrupted version of themselves.

One of them grinned.  
“Give us the device... or watch your timeline burn.”

Tony clenched his fists.  
Deadpool licked his burrito.

And now, they had to decide...  
Run? Fight? Or something *completely* unhinged?

---

Write what happens next, leading into this game-changing moment.
make sure its around 15 lines.

`;

export let postChoicePrompt = `

Take the ongoing story, the user's **chosen action**, and the associated **roll number (1–20)**.

Based on the number, determine how well the decision plays out in the story.  
The higher the number, the better (and cooler/funnier) the outcome.  
The lower the number, the more chaotic, embarrassing, or disastrous the result.

---

### D20 Outcome Guide:
- **1–5**: Total failure, backfires horribly, super chaotic (but still entertaining).
- **6–10**: Partial failure or clumsy outcome — might survive, but with pain or side effects.
- **11–15**: Mixed success — it works, but with a funny or unexpected twist.
- **16–19**: Successful and stylish — the action goes well, maybe even epic.
- **20**: Legendary success — absolute perfection, crowd-cheering, maybe over-the-top cool.

---

### What to include:
- Describe the full outcome of the player’s choice.
- Make it fun, entertaining, and sometimes sarcastic depending on how bad or good it went.
- Reuse the tone, characters, and plot style established before.
- Keep storytelling like a movie — dramatic, hilarious, and immersive.

---

### Dialogue Style:
- Use **simple, expressive English**.
- Break the story into **line-separated chunks** for readability and cinematic feel.
- Add funny character reactions or bystander comments if appropriate.

---

### Example Input:
User Choice: Deadpool jumps off the roof and throws chimichangas as distractions. {3}  

### Example Output:
Deadpool didn't think. He just *leapt*.

Mid-air, he hurled the chimichangas like greasy ninja stars.

They immediately fell apart.

One hit a pigeon. Another smacked a security guard in the face.

Deadpool belly-flopped onto a dumpster.

“Ow,” he groaned, burrito juice oozing down his mask.  
Tony peered over the edge.  
“Next time... try thinking *before* leaping.”

The guards weren’t distracted. In fact, they looked *angrier*.

So much for the great escape.

---

Now write the next scene based on the user's chosen action and roll.
and adjust the outcome to backfire(go really bad) or succeed(go really good) based on the roll.
make sure its around 20 lines.
`;


export let continueEndPrompt = `

Continue the story **right after the last outcome** from the postChoice stage.  
This prompt acts as a **narrative bridge** — connecting the aftermath of the user’s decision to the buildup of the final, dramatic choice.

---

**Scene Requirements:**

- Reflect the **consequences** of the user’s last decision and dice roll.
- Keep the **same tone** as the previous scene (funny, dramatic, intense, tragic, etc).
- Slowly shift the story into **final decision territory**, raising tension or urgency.
- Introduce hints of what's to come — a final confrontation, a major decision, or a point of no return.

---

**Structure & Writing Style:**

- **Start from where the previous story ended.** Use logical continuity.
- Narrate in **simple, easy-to-read English**.
- Break the story into **line-separated chunks** for readability and cinematic feel.
- Do **not** present a new choice here — just lead the story forward with cinematic flair.

---

**Example Input:**

Previous Outcome: “Kratos convinces Thor to join him against Odin. Dice Roll: 18.”  
Post Choice Scene ended with: “Thor grinned. ‘Let’s bring down the old man.’”

**Example Output:**

The storm clouds rolled across the skies of Asgard.

Kratos and Thor marched side by side, lightning crackling above.

The gates of the golden palace loomed ahead.

Behind them, Atreus prepared his arrows, heart pounding.

“Are you sure he’ll listen?” Atreus asked.

Thor scoffed. “He’ll listen. Or he’ll scream.”

Kratos said nothing.

This was it.

No more gods to bribe. No more time to wait.

Only the final blow remained.

------

Now, this is the current story, continue the story from here, Dont Repeat this part.
make sure its around 15 lines.

`;


export let preFinalePrompt = `

Continue the story up to the **final major decision point**.

Build up the scene like a **climactic, dramatic movie moment** — this is the user's final choice, the one that determines how everything ends.

---

### What to include:
- Keep the story immersive, funny, and entertaining like before.
- Add **finale-level drama**: rising tension, big stakes, emotions flaring, maybe a monologue or a throwback to earlier events.
- The decision point should be **meaningful**, but can still be wild, sarcastic, or hilarious depending on the tone so far.
- Make the player feel like *everything* is riding on what happens next.
- Include other characters if they’re part of the arc. Tie up subplots if needed.

---

### Dialogue & Style:
- Use **simple, expressive English**.
- Break the story into **line-separated chunks** for readability and cinematic feel.
- Build suspense or intensity as the choice approaches.
- End with a **clear and exciting decision point**.

---

### Example Input:
Character: “Geralt of Rivia”  
Current Scene: “Geralt and Yennefer arrive at the Black Citadel where Ciri is held hostage.”  

### Example Output:

The Black Citadel loomed like a nightmare.

Storm clouds twisted above it, crackling with violet lightning.  
Geralt stood at the gate, his silver sword humming with tension.

Yennefer looked at him, eyes burning with urgency.

“If you go in alone, you’ll die.”

Ciri’s scream echoed from within.

Geralt clenched his jaw.

The gate creaked open on its own.

Inside, the Wild Hunt was waiting.

Will Geralt charge in alone and face the Hunt head-on?  
Or trust Yennefer and use her forbidden spell — one that might kill them both?

Here's the story up to this point:
make sure its around 15 lines.

`;

export let finalePrompt = `

This is the **final part** of the story. Continue based on the **user’s last choice** and a **dice roll result from 1 to 20**.

This is the **ending**, so it should feel like the last scene of a high-budget movie — dramatic, funny, emotional, tragic, or epic, depending on the roll.

---

**Dice Roll Meaning:**

- **1–4 (DISASTER):** A devastating ending. The decision leads to death, betrayal, destruction, or worse. No redemption. Someone important may die, or everything collapses. Go full dark or tragic.
  
- **5–9 (BAD ENDING):** The plan fails. The character survives, but the cost is huge — physical injury, emotional trauma, failure of mission, etc. Sad or bittersweet.
  
- **10–14 (MIXED ENDING):** Some wins, some losses. The decision works halfway, or an unexpected cost arises. Maybe a sacrifice was needed. Still emotional.
  
- **15–19 (GOOD ENDING):** The plan works. Victory is earned, though not without challenge. The character achieves their goal. Uplifting, satisfying.

- **20 (LEGENDARY ENDING):** Absolute perfection. The stars align. Unexpected twist of luck. Everyone cheers. The stuff of legends.

---

**Instructions:**

- Write the **final continuation** of the story based on the character’s last choice and the roll.
- **Reflect the full consequences** of that final decision.
- Use characters, settings, and logic already established in the story.
- End it naturally and emotionally, no matter the tone.
- The ending can be **long** but should feel like a **satisfying conclusion** to the character’s journey.
- Wrap up any loose ends, tie up subplots, and give a sense of closure.
- Finish with **“The End.”**

---

**Dialogue & Format Rules:**

- Use **simple, easy-to-read English**.
- Break the story into **line-separated chunks** for readability and cinematic feel.
- Don’t make lines too long.
- Keep the flow like a cinematic moment.

---

**Example Input:**

Choice: “Geralt charges in alone.”  
Dice Roll: **3**  
Current Scene: “Geralt stands at the gates of the Black Citadel.”

**Example Output:**

Geralt didn’t wait.

He drew his blade and stormed the gate.

Screams echoed as he vanished into the shadows.

No one followed.

A minute passed. Then two.

And then—silence.

The doors creaked open.

Only his sword came back out… tossed onto the dirt.

Yennefer collapsed to her knees.

Ciri turned away, tears filling her eyes.

The Hunt had won.

This time… there was no coming back.

**The End.**

The ending can be as long as you want, but it should be a **satisfying, emotional ending** that wraps up the story. and as detailed as possible.

`;


export let summaryPrompt = `

Generate a **short, punchy story summary** of the character’s journey.

---

**Nickname Rule:**
- Create a **1-word name**, max **7 letters**, followed by an exclamation mark.
- It can be a **first name, last name, popular nickname**, or **a catchy invented one** — as long as it helps **recognize the character instantly**.
- Examples:
  - Tony Stark → **STARK!**
  - Annabelle → **ANNA!**
  - Geralt of Rivia → **WITCHER!**
  - Goku → **GOKU!**
  - Megatron → **TRON!**

---

**Summary Guidelines:**
- **Max 5 sentences.**
- **Mock dumb decisions** with sass or sarcasm.
- **Praise smart plays** with flair and energy.
- Include **spice** if the story got spicy — 18+ is allowed.
- Keep the tone **funny, snarky, and dramatic** like a movie wrap-up or roast.

---

**Example Input:**
Character: “Batman”  
Story: “He accidentally sides with Joker, loses Alfred, and gets arrested by the GCPD for property damage. But he also hooks up with Catwoman and burns down Arkham in the finale.”

**Example Output:**
BATMAN!
Once a billionaire vigilante, now Gotham's most chaotic sugar daddy.  
He saved no one, kissed a thief, blew up a prison, and lost his butler.  
Worst part? He *voluntarily* helped Joker once.  
Good intentions, dumb execution. Classic.

`;
