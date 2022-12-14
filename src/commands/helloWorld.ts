import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../command";

export const helloWorld: Command = {
    name: "hello",
    description: "Returns a greeting",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = "Hello there!";

        await interaction.reply({
            ephemeral: true,
            content
        });
    }
};