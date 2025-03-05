export {default as Loading} from './img/loading.gif';
export {default as Loading1} from './img/loading1.gif';
export {default as back} from './img/back.png';
export {default as back1} from './img/back1.png';

export {default as bgm} from './audio/bgm.mp3';
export {default as bgm1} from './audio/bgm1.mp3';
export {default as bgm2} from './audio/bgm2.mp3';
export {default as bgm3} from './audio/bgm3.mp3';
export {default as bgm4} from './audio/bgm4.mp3';
export {default as bgm5} from './audio/bgm5.mp3';
export {default as bgm6} from './audio/bgm6.mp3';
export {default as bgm7} from './audio/bgm7.mp3';
export {default as bgm8} from './audio/bgm8.mp3';
export {default as bgm9} from './audio/bgm9.mp3';
export {default as bgm10} from './audio/bgm10.mp3';
export {default as bgm11} from './audio/bgm11.mp3';
export {default as bgm12} from './audio/bgm12.mp3';

export {default as TypingSFX} from './audio/boop.mp3';
export {default as blip1} from './audio/blip1.mp3';
export {default as blip2} from './audio/blip2.mp3';
export {default as death} from './audio/death.mp3';
export {default as select} from './audio/select.mp3';
export {default as switchSFX} from './audio/switch.mp3';

export let initialText = 'Press any key to continue... ';

export let gameLogo = `
██████╗░░█████╗░██████╗░
██╔══██╗██╔══██╗██╔══██╗
██║░░██║███████║██║░░██║
██║░░██║██╔══██║██║░░██║
██████╔╝██║░░██║██████╔╝
╚═════╝░╚═╝░░╚═╝╚═════╝░

Dungeons, AI & Dragons.`;

async function getTxtFile(url) {
    const response = await fetch(url);
    return await response.text();
}

export async function getDefaultCharacters() {
    let char1 = await getTxtFile('/characters/char1.txt');
    let char2 = await getTxtFile('/characters/char2.txt');
    let char3 = await getTxtFile('/characters/char3.txt');
    let char4 = await getTxtFile('/characters/char4.txt');
    let char5 = await getTxtFile('/characters/char5.txt');
    let char6 = await getTxtFile('/characters/char6.txt');
    let char7 = await getTxtFile('/characters/char7.txt');
    let char8 = await getTxtFile('/characters/char8.txt');
    let char9 = await getTxtFile('/characters/char9.txt');
    let char10 = await getTxtFile('/characters/char10.txt');
    let char11 = await getTxtFile('/characters/char11.txt');
    let char12 = await getTxtFile('/characters/char12.txt');
    let charSelmon1 = await getTxtFile('/characters/charSelmon1.txt');
    let charSelmon2 = await getTxtFile('/characters/charSelmon2.txt');
    let charSelmon3 = await getTxtFile('/characters/charSelmon3.txt');

    let sheet1 = await getTxtFile('/characters/sheet1.txt');
    let sheet2 = await getTxtFile('/characters/sheet2.txt');
    let sheet3 = await getTxtFile('/characters/sheet3.txt');
    let sheet4 = await getTxtFile('/characters/sheet4.txt');
    let sheet5 = await getTxtFile('/characters/sheet5.txt');
    let sheet6 = await getTxtFile('/characters/sheet6.txt');
    let sheet7 = await getTxtFile('/characters/sheet7.txt');
    let sheet8 = await getTxtFile('/characters/sheet8.txt');
    let sheet9 = await getTxtFile('/characters/sheet9.txt');
    let sheet10 = await getTxtFile('/characters/sheet10.txt');
    let sheet11 = await getTxtFile('/characters/sheet11.txt');
    let sheet12 = await getTxtFile('/characters/sheet12.txt');
    let sheetSelmon1 = await getTxtFile('/characters/sheetSelmon1.txt');
    let sheetSelmon2 = await getTxtFile('/characters/sheetSelmon2.txt');
    let sheetSelmon3 = await getTxtFile('/characters/sheetSelmon3.txt');

    return [
        {
            name: 'Deeps',
            pfp: char1,
            desc: sheet1,
        },
        {
            name: 'Aphrodite',
            pfp: char2,
            desc: sheet2,
        },
        {
            name: 'Drawf',
            pfp: char3,
            desc: sheet3,
        },
        {
            name: 'Yurei ',
            pfp: char4,
            desc: sheet4,
        },
        {
            name: 'Edamame',
            pfp: char5,
            desc: sheet5,
        },
        {
            name: 'Soup',
            pfp: char6,
            desc: sheet6,
        },
        {
            name: 'Cobra Bhai',
            pfp: char7,
            desc: sheet7,
        },
        {
            name: 'Dr. Volt',
            pfp: char8,
            desc: sheet8,
        },
        {
            name: 'The Penguin',
            pfp: char9,
            desc: sheet9,
        },
        {
            name: 'Raven',
            pfp: char10,
            desc: sheet10,
        },
        {
            name: "Nikhil's Cat",
            pfp: char11,
            desc: sheet11,
        },
        {
            name: "Your Mom",
            pfp: char12,
            desc: sheet12,
        },
        {
            name: 'Deer Killer',
            pfp: charSelmon1,
            desc: sheetSelmon1,
        },
        {
            name: 'Heavy Driver',
            pfp: charSelmon2,
            desc: sheetSelmon2,
        },
        {
            name: 'Selmon Bhai',
            pfp: charSelmon3,
            desc: sheetSelmon3,
        },
    ];
}