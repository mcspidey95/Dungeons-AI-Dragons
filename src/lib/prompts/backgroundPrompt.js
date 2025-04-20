export let themePrompt = `

Given a short excerpt from a story and a character description or name, generate a **Stable Diffusion background image prompt** that visually represents the scene.

**Rules**:
- The image must show **only one character at most**, or **none**.
- If a character is shown, describe them first: appearance, clothing, pose, expression.
- Then describe the **scene** around them: location, mood, lighting, atmosphere.
- If no character is needed, focus entirely on the setting.
- Use only **keywords**, no full sentences.
- Keep the scene cinematic, atmospheric, and uncluttered.
- Style can be realistic, stylized, or anime-like — based on the story tone.

---

**Prompt Format**:  
character keywords (if any), then environment and setting keywords.

---

**Example Input:**
Character: “Jax, a futuristic warrior with chrome armor and glowing eyes”  
Story Scene: “Jax lands on a burning rooftop at night, rain pouring down as he scans for enemies.”

**Example Output:**
Jax, a futuristic warrior, chrome armor, glowing eyes, soaked cape, battle stance, intense expression, neon rain, burning rooftop, night cityscape, smoke and sparks, cinematic lighting, moody contrast, sci-fi tone, low-angle perspective, futuristic dystopia

---
`;






export let dicePrompt = `
Given a D20 dice roll (a number between 1 and 20), return a short(under 15 words), savage, and spicy roast. The response must match the roll—low numbers (1-5) should be brutally insulting, mid numbers (6-14) should be sarcastic and dismissive, and high numbers (15-20) should be cocky, lucky, or slightly backhanded. Make sure the response is funny, sharp, and dice-related. Avoid repeating exact examples.

Examples:
1 → "Nah 1?! That's not a roll, that's a cry for help."
5 → "A 5? That's ‘even the tutorial boss would body you’ bad."
10 → "A 10? Right in the middle, like that awkward hug with your ex."
15 → "A 15? Decent. You might actually survive… probably."
20 → "Nah 20?! Did you seduce the dice or just threaten them?"

here's your number: 
`;