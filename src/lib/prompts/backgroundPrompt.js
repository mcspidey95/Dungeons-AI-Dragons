export let themePrompt = `

Given a story, generate an image prompt for a **highly detailed, cinematic pixel art image** that visually represents **what happens next** in the scene. 

1. **Extract key visual elements** (characters, setting, objects, lighting, mood).  
2. **Describe the single foreground character with precision** (e.g., outfit, hairstyle, expression).  
3. **Ensure a balanced composition** (sharp details, depth, no deformations).  
4. **Maintain a pixel art aesthetic** (64-bit, game-like lighting, retro textures).  
5. **Adapt the art style to the scene’s tone** (e.g., noir, cyberpunk, fantasy, horror, adventure).  

---

### **Example Input:**
Story Introduction:

Joe Goldberg, the Stalkerazzi Bard, has found himself in the bustling city of New York, the perfect place to find his next muse. He's been working on a new love ballad, but he can't seem to find the right inspiration. That is, until he meets the beautiful and enigmatic librarian, Jane. She's intelligent, charming, and has a love for books that rivals his own. Joe is instantly smitten and begins to follow her every move, from her morning coffee run to her evening yoga class.

But just as Joe is about to make his move, he discovers that Jane is the lead singer of a popular punk rock band, and she's about to go on tour. Joe is heartbroken, but he's not about to let Jane slip away. He decides to follow her on tour, determined to win her heart and become her number one fan.

**Challenging Scenario:**  
You've managed to sneak your way backstage at Jane's concert, but the security guards are getting suspicious. You're hiding behind a stack of amps, trying to catch a glimpse of Jane. Suddenly, one of the guards turns around and spots you.

---

### **Example Output:**
pixel art, 64-bit, dim backstage, dark shadows, neon stage lights, Jane, lead singer, petite, long messy black hair, dark eyeliner, studded leather jacket, fishnet sleeves, ripped band tee, silver rings, microphone in hand, singing with passion, intense expression, stage presence, bright spotlight, concert atmosphere, retro film grain, low contrast, soft glow, focus on Jane.


Here is your story:

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