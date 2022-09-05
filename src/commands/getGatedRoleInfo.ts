/**
 * Allows any user to access the role registry
*/

import { Base, BaseCommandInteraction, Client} from "discord.js";
import { Command } from "../command";
import { roleRegistry } from "../roleRegistry";


export const getGatedRoleInfo: Command = {
    name: "getgatedroleinfo",
    description: "Access existing role specifications",
    type: "CHAT_INPUT",
        
    run: async (client: Client, interaction: BaseCommandInteraction) => {

        let output : string;
   
            for (var element of roleRegistry) { 
                output += JSON.stringify(element)
            }

            if (!output) {
                await interaction.reply(
                    { content: "No roles defined yet!", ephemeral: true }
                );
            } else {
                await interaction.reply(
                    { content: output, ephemeral: true }
                );
             }

            
    
    }
        
            
            
        
    
};