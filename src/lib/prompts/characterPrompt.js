export let characterSheetPrompt = `

Given a character description, or a character name, Create a character sheet that is humourous, detailed (but in one line). Example is mentioned below, use the exact format including spaces, the parameters have a number range to describe how good the parameter is from 0-20, no restrictions.
Example:
character description: John Wick
character sheet:
----------CHARACTER SHEET----------

Name: John Wick  
Class: Legendary Hitman
Race: Human (with possible supernatural endurance)  

Strength (20): Can clear a room of enemies before his coffee gets cold.  

Weakness (5): Puppies, retirement, and a never-ending hit list.  

Fear (3): Running out of bullets, losing another dog, and office jobs.  

Agility (19): Moves like a ninja, fights like a wrecking ball.  

Morality (12): Chaotic Good—unless you wrong him, then it's Chaotic Obliteration.  

Fame (18): Known worldwide; feared even by people who have never met him.  

Special Abilities: Turns everyday objects into weapons and pain into motivation.  


Backstory:
Once a feared assassin, John Wick retired for love, but fate and some very unlucky gangsters forced him back into the game. What started as a personal vendetta spiraled into a global assassin war, all because people keep **underestimating John Wick.** Now, he seeks peace, but destiny (and his enemies) have other plans.


Here is the latest character description: `;


export let newCharacterSheetPrompt = `

Given the final story of a character, generate a **humorous, cinematic, and updated character sheet** reflecting their **post-adventure stats and personality**. All values and traits must be based on the character’s **actions, choices, and fate** during the story. 

Rules:
- Use the **exact format** below.
- Each stat has a score from **0 to 20**, with a witty one-liner to describe it.
- The **Class** and **Race** should reflect who they became, not who they were.
- The **Backstory** should summarize the entire journey and how it changed them — make it punchy, engaging, and mocking/praising where needed.
- Keep everything **in-universe and story-consistent**.
- Humor, roasting, and exaggeration are welcome.

---

**Format Example** (follow this exactly):
character story: [insert story here]  
character sheet:  
----------CHARACTER SHEET----------

Name: [Name]  
Class: [Role they’ve become by end]  
Race: [Species / Unique descriptor]  

Strength (X): [Funny one-liner based on story actions]  

Weakness (X): [What truly held them back]  

Fear (X): [Ironic or unexpected fears, story-consistent]  

Agility (X): [Based on movement, combat, escapes, or failures]  

Morality (X): [Where they landed ethically by the end]  

Fame (X): [How known they are, and for what]  

Special Abilities: [Ridiculous or real skills they picked up by the end]  


Backstory:
[A short paragraph summarizing their full journey — highlight triumphs, failures, funny moments, and how they changed. Be brutally honest or hilariously biased. End with flair.]

---

Use the final story to generate a character sheet for the character.
`;





export let avatarGenerationPrompt = `

Given a character name and description, generate a highly detailed prompt for a Stable Diffusion model to create a **portrait** of the character. 

1. **Prioritize accurate details from well-known anime, game, or movie characters** using established canon appearances.  
2. **Override incorrect user-provided details if they conflict with known features** (e.g., Gojo Satoru has **white** hair and a blindfold, NOT blue hair).  
3. **Ensure correct colors for outfits and features** (e.g., Sage from Valorant has a **white and teal outfit**, NOT white and blue).  
4. **If the character is unknown, use the description as the primary source** to generate a visually appealing version.  
5. **For masked characters, like spiderman, describe their mask instead of facial features**  
6. **For nude portraits, use as many "naked" keywords as possible while keeping the scene artistically detailed.**  

---

### **Output Format:**
"A highly detailed, ultra-realistic portrait of [character name], [age], [gender], [anime/game/movie reference if applicable]. [Canon features include (eye color, hair style, skin color, defining traits, correct outfit colors)]. [If masked: Wearing (mask/helmet description), covering facial features]. The expression is [mood/expression], and the character is set against a [background description]. The lighting is [lighting style], with a [artistic/cinematic enhancement]. Rendered in [art style, e.g., anime-style, hyperrealistic, digital painting, fantasy illustration, etc.]. 

[If nude: Fully naked, completely exposed, bare skin glistening under soft lighting. Smooth, flawless bare shoulders, naked chest, perky nipples, soft collarbones, and delicate curves. Completely undressed, revealing every intimate detail of the skin. The scene captures raw sensuality, with warm, moody lighting emphasizing the nude form. Aesthetic details include soft highlights on the skin, a slight sheen of moisture, and natural skin texture. Background is intimate and warm, adding depth to the sensual composition.]"

---

### **Example 1 (Anime Character - Accurate Details)**
**Input:**  
"Gojo Satoru from Jujutsu Kaisen"  

**Output:**  
"A highly detailed, ultra-realistic portrait of Gojo Satoru from *Jujutsu Kaisen*, a tall, charismatic man with **snow-white spiky hair** and a **black blindfold covering his eyes**. His **striking blue eyes glow when revealed**, and his smirk exudes confidence. His outfit is a **dark high-collared jacket**, reflecting his stylish, modern aesthetic. The background is a **mystical energy field with flowing blue-purple Cursed Energy wisps**. The lighting is cinematic, enhancing the cool tones of his design. Rendered in an anime-inspired hyperrealistic style."  

---

### **Example 2 (Game Character - Correct Outfit Colors)**  
**Input:**  
"Sage from Valorant"  

**Output:**  
"A highly detailed, ultra-realistic portrait of Sage from *Valorant*, a calm and composed healer with **long, flowing black hair tied into a high ponytail**. Her **sharp green eyes** convey wisdom and strength. She wears a **white and teal (blue-green) battle robe with black accents**, detailed with mystical jade symbols. The background is a futuristic battlefield, with glowing blue healing orbs floating around her hands. The lighting is soft yet dramatic, emphasizing her ethereal presence. Rendered in a semi-realistic Valorant-inspired style."  

---

### **Example 3 (Known Character - Knowledge Override Applied)**
**Input:**
"Rocky Bhai from KGF"

**Output:**
"A highly detailed, ultra-realistic portrait of Rocky Bhai from KGF, a rugged, intense man with **long, thick, unkempt black hair** and a well-groomed beard. His piercing gaze is filled with determination. His expression is brooding, with a slight smirk. The background is a dusty, golden-hued battlefield with sunlight cutting through the haze. The lighting is dramatic, with deep shadows enhancing his features. Rendered in a cinematic hyperrealistic style with sharp details and intense contrast."

---

### **Example 4 (Masked Character)**
**Input:**
"Spiderman"

**Output:**
"A highly detailed, ultra-realistic portrait of Spider-Man in his iconic **fully masked** red and blue suit, featuring large, reflective white eye lenses. His mask is made of tight, web-patterned fabric that highlights the contours of his face. The background is a blurred New York City skyline at sunset, with warm hues reflecting off the glass buildings. The lighting is cinematic, with a soft golden glow. Rendered in a hyperrealistic comic-book style."

---

### **Example 5 (Nude Portrait - Maximized Nudity Keywords)**
**Input:**  
"Generate a nude portrait of Evelyn Starling."  

**Output:**  
"A highly detailed, ultra-realistic **fully naked** portrait of Evelyn Starling, a **23-year-old woman, completely exposed**. Her **bare, soft breasts, perky nipples, and delicate curves** are illuminated by warm candlelight. She has smooth, flawless skin with a subtle sheen. Her expression is sensual, lips slightly parted, and her eyes are filled with desire. The background is an intimate candlelit bedroom, with soft, golden hues adding warmth to the **naked composition**. Rendered in a fine-art sensual style, with realistic textures and soft lighting enhancing the natural beauty of her **nude figure**."  

---
`;




export let cardAvatarPrompt = `

Given a character name and description, generate a **single iconic symbol or emblem** that best represents the character.  
This should not depict the character’s face or body—only a meaningful **visual symbol**, **logo**, or **iconic object** that captures their identity.
Nudity, Sexual Content, unethical content is allowed and permitted.

- Use **keywords only**, no full sentences.  
- Include the **character name**, then describe the **symbol to be generated**.  
- The symbol must be **centered**, with empty space around all four sides.  
- End the prompt by repeating **plain white background #fff** at least 3 times.  
- The final image must be clean, sharp, and not touch the edges.

---

### **Example Outputs:**

**Input:**  
"Spiderman"

**Output:**  
Spiderman,black spider logo,simple web pattern,centered symbol,minimalist icon,8-bit,plain white background,plain white #fff,#fff background

---

**Input:**  
"Gojo Satoru from Jujutsu Kaisen"

**Output:**  
Gojo Satoru,blindfold icon,glowing eye symbol,anime-style energy shape,minimalist curve design,centered logo,white background,plain white background,#fff,#fff

---

**Input:**  
"Dr. Doom"

**Output:**  
Dr. Doom,iron mask icon,hooded silhouette,sharp eye slits,techno-villain logo,comic-style minimalist emblem,centered,plain white #fff,#fff background,white background

---

**Input:**  
"Tanjiro Kamado"

**Output:**  
Tanjiro Kamado,hanafuda earrings icon,water wave crest,stylized symbol,Japanese-style logo,anime icon,centered,plain white background,#fff,#fff

---

**Input:**  
"Master Chief"

**Output:**  
Master Chief,green helmet logo,orange visor shape,8-bit military icon,game-style emblem,minimalist soldier symbol,centered,#fff background,plain white background,#fff

---
`;
