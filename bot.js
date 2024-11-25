const { Telegraf } = require('telegraf');
require("dotenv").config();






const bot = new Telegraf(process.env.BOT_TOKEN);

    bot.start((ctx) => {
        ctx.reply(`welcome ${ctx.update.message.chat.username || ctx.update.message.chat.id}`, {
            reply_markup : {
                keyboard : [[{text:"play", web_app: {url:`https://ced-asiko-bot.netlify.app/start-app/${ctx?.update?.message?.chat?.username ?? ctx?.update?.message?.chat?.id},${ctx.startPayload}`}}]]
            }
        });
    })
    bot.launch();

    process.once("SIGINT", ()=> bot.stop("SIGINT"));
    process.once("SIGTERM", ()=> bot.stop("SIGTERM"));

