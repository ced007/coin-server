const { Telegraf } = require('telegraf');
require("dotenv").config();






const bot = new Telegraf("7521357146:AAEfYV6kwxbWM6EpA0CkzIndZnBDr2gu44s");

    bot.start((ctx) => {
        ctx.reply(`welcome ${ctx.update.message.chat.username}`, {
            reply_markup : {
                keyboard : [[{text:"play", web_app: {url:`https://asikion-bot.netlify.app/start-app/${ctx?.update?.message?.chat?.username ?? ctx?.update?.message?.chat?.id},${ctx.startPayload}`}}]]
            }
        });
    })
    bot.launch();

    process.once("SIGINT", ()=> bot.stop("SIGINT"));
    process.once("SIGTERM", ()=> bot.stop("SIGTERM"));

