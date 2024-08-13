const emojis = ["😃","😋","🥳","🛻"]


function sendEmoji(){
    const numRamdom = Math.floor(Math.random() * (emojis.length - 0) + 0); // del 0.01 al 0.99
    return emojis[numRamdom]
}

module.export = sendEmoji()