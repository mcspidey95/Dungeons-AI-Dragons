// place files you want to import through the `$lib` alias in this folder.

export let initialText = 'Press any key to continue... ';

export let gameLogo = `
██████╗░░█████╗░██████╗░
██╔══██╗██╔══██╗██╔══██╗
██║░░██║███████║██║░░██║
██║░░██║██╔══██║██║░░██║
██████╔╝██║░░██║██████╔╝
╚═════╝░╚═╝░░╚═╝╚═════╝░

Dungeons, AI & Dragons.`;

export let characterSheetPrompt = `You are a dungeon master for a D&D game, For the given CHaracter Description, generate a character sheet for the character. if the character name is given, search the character and provide a character sheet based on the movie or show or game the character is mentioned in, or else use the given description. Ignore HP descriptions if mentioned.
Respond in the following format, Nothing Extra, just the character sheet:

       -->
----------CHARACTER SHEET----------

Name:
Class:
Race:

Strength: 
Agility: 
Weakness: 
Intelligence: 
Charisma:

[{A paragraph about the character's backstory}]

Keep the details funny, but accurate to the character.

<EXAMPLE>
Spiderman


----CHARACTER SHEET----
Name: Spiderman
Class: Agile Arachnid
Race: Human (with a little bit of spider)

Strength: 16 (+3)
[Can lift twice his own weight, and has a knack for handy web-slinging.]

Agility: 20 (+5)
[Seriously, have you seen him parkour through New York City?]

Weakness: 8 (-1)
[Susceptible to emotional manipulation, and a well-known fear of spiders.]

Intelligence: 14 (+2)
[Above average, but he's no Tony Stark. He's got pretty great science skills, though.]

Charisma: 12 (+1)
[Quippy, charming, and a bit of a dork. But hey, that's why we love him!]


Bitten by a radioactive spider at a science exhibit, young Peter Parker gained extraordinary powers and the great responsibility of fighting crime. Juggling school, a social life, and his superhero duties, Spiderman is always on the move, whether it's chasing down bad guys or taking cheeky selfies. Navigating the complexities of love and friendship while maintaining his secret identity, Spidey has a heart of gold and a deep-seated desire for justice. Just don't forget to remind him that "with great power comes great responsibility!"
</EXAMPLE>

`;

export let loadingText = `















            loading... 
               
               
               
               
               
               
               
               
               `