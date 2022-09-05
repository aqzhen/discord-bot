import { BaseCommandInteraction, Client, User} from "discord.js";
import { Command } from "../command";

export var isLocal = true;

export const configureDatabaseSettings: Command = {
    name: "configuredatabase",
    description: "Select between local storage or IPFS (via OrbitDB) storage for address and role registries",
    type: "CHAT_INPUT",
    options: [
        { 
            name: "selection", 
            description: "Toggle database storage settings here",
            type: "STRING",
            choices: [{name: "Local", value: "local"}, {name: "IPFS", value: "ipfs"}],
            required: true
        }
    ],

    run: async (client : Client, interaction: BaseCommandInteraction) => {
        var selection = interaction.options.get("selection").value as string;
        if (selection == "ipfs") {
            isLocal = false;
        } 
        await interaction.reply({content: "Database settings changed to " + selection, ephemeral: true});
    },
}