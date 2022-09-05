import { Client,ClientOptions } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";
import {DISCORD_BOT_TOKEN} from "./config";


const token = DISCORD_BOT_TOKEN;
console.log("Bot is starting...");

export const client = new Client({
    intents: []
});

ready(client);
interactionCreate(client);

client.login(token);
console.log(client);