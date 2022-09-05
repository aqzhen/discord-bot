import { BaseCommandInteraction, Client} from "discord.js";
import { assignRoles } from "../assignRoles";
import { Command } from "../command";
const { MessageEmbed } = require('discord.js');
import { client_cooldowns, client_COOLDOWN_MILLISECONDS } from "../index";
export var messageString;
export var messageGenTimestamp;


export const connectWallet: Command = {
    name: "connectwallet",
    description: "generates a temporary, unique link for user wallet authentication",
    type: "CHAT_INPUT",

    run: async (client : Client, interaction: BaseCommandInteraction) => {
        if (client_cooldowns.has(interaction.user.id)) {
            // cooldown not ended
            interaction.reply({ content: "Please wait for 30 second cooldown to end. ", ephemeral: true });
        } 
        else {
            // no cooldown
            //generate unique url for signature
            messageString = "Welcome to discord-bot! ";
            messageGenTimestamp = Date.now();
            messageString += messageGenTimestamp;

            // generate unique link
            var baseURL = "https://signator.io/view?message=";
            var tail = encodeURIComponent(messageString);
            var URL = baseURL + tail;

            //generate embed message with link
            var content = new MessageEmbed();
            content = {
                color: 0x0099ff,
                title: 'Connect Your Wallet',
                url: URL,
                description: 'Here is a temporary link, generated just for you! Sign the message and paste the resulting signature to the signmessage command.',
                timestamp: new Date()
            };

            
            await interaction.reply({ephemeral: true, embeds:[content]});

            //now, set cooldown
            client_cooldowns.set(interaction.user.id, true);

            // After the time you specified, remove the cooldown
            setTimeout(() => {client_cooldowns.delete(interaction.user.id);
            }, client_COOLDOWN_MILLISECONDS);
        }

    }

};