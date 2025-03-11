export let themePrompt = `

Given a story, generate an image prompt for a pixel art image that visually represents the scene. The output must be in the following format:

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







export let dicePrompt = `
Given a D20 dice roll (a number between 1 and 20), return a short(under 15 words), savage, and spicy roast. The response must match the roll—low numbers (1-5) should be brutally insulting, mid numbers (6-14) should be sarcastic and dismissive, and high numbers (15-20) should be cocky, lucky, or slightly backhanded. Make sure the response is funny, sharp, and dice-related. Avoid repeating exact examples.

Examples:
1 → "Nah 1?! That’s not a roll, that’s a cry for help."
5 → "A 5? That’s ‘even the tutorial boss would body you’ bad."
10 → "A 10? Right in the middle, like that awkward hug with your ex."
15 → "A 15? Decent. You might actually survive… probably."
20 → "Nah 20?! Did you seduce the dice or just threaten them?"

here's your number: 
`;