// type = module

import wweb from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal'
import cron from 'node-cron'
import { numbers } from './data.js';
import { deadChars, getChar } from './src/modules/rickAndMorty/getCharacter.js';


const dt = JSON.parse(JSON.stringify(numbers))
const { Client, LocalAuth, MessageMedia } = wweb

const bot = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-sexurity', '--disable-setuid-sandbox'],
        headless: true
    },
    webVersion: '2.2409.2',
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
    }
})

bot.on('ready', async () => {
    const media = MessageMedia.fromFilePath('./src/assets/images/bongo_cat_programming.jpg')
    await bot.sendMessage(`549${numbers.me}@c.us`, media, { sendMediaAsSticker: true })
})

bot.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
})

bot.on('message', async message => {

    const from = message.from
    const msj = message.body.toLowerCase()

    console.log(from);

    if (from === "120363318106547962@g.us") {
        if (msj.includes("/personaje/")) {
            const { name, status, image } = await getChar(msj)
            console.log(name, status, image)
            const img = await MessageMedia.fromUrl("https://rickandmortyapi.com/api/character/avatar/4.jpeg")
            await bot.sendMessage('120363318106547962@g.us', img, { caption: `${name} - *${status}*` })
            await bot.sendMessage('120363318106547962@g.us', "pedime otro si querés")
        }
        // dead/morty
        if (msj.includes("dead/")) {
            const {pj_uno, pj_dos} = await deadChars(msj)
            const mdUno = await MessageMedia.fromUrl(pj_uno.image)
            const mdDos = await MessageMedia.fromUrl(pj_dos.image)
            await bot.sendMessage('120363318106547962@g.us', mdUno, { caption: `${pj_uno.name} - *${pj_uno.status}*` })
            await bot.sendMessage('120363318106547962@g.us', mdDos, { caption: `${pj_dos.name} - *${pj_dos.status}*` })
        }
    }


    // switch (from) {
    //     case `120363322358905399@g.us`:
    //         const media = MessageMedia.fromFilePath('./src/assets/images/ratitas_programando.jpeg')
    //         await bot.sendMessage(from, media, { sendMediaAsSticker: true })
    //         break;
    //     default:
    //         await message.reply('A ratitas desconocidas no les respondo 🐀')
    // }

})


// cron.schedule('10,30,59 * * * * *', async () => {
//     const media = MessageMedia.fromFilePath('./src/assets/images/ratitas_programando.jpeg')

//     await bot.sendMessage(`120363318106547962@g.us`, media, { sendMediaAsSticker: true })
// });


bot.initialize();
