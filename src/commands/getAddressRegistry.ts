/**
 * Allows any user to access the address registry
*/

import { BaseCommandInteraction, Client} from "discord.js";
import { Command } from "../command";
import { roleRegistry } from "../roleRegistry";
import { isLocal } from "./configureDatabaseSettings";
import { usernameToAddressIPFS} from "../addressRegistryIPFS";
import { usernameToAddress } from "../addressRegistry";

var usernameToAddressFinal = usernameToAddressIPFS;
if (isLocal) {
    let usernameToAddressFinal = usernameToAddress;
} 
 
export const getAddressRegistry: Command = {
    name: "getaddressregistry",
    description: "Access existing username address mappings",
    type: "CHAT_INPUT",
        
    run: async (client: Client, interaction: BaseCommandInteraction) => {

        let output : string;
   
            // will replace this with some link to orbit control center when i figure that out
            output = JSON.stringify(usernameToAddressFinal)
            

            if (!output) {
                await interaction.reply(
                    { content: "No entries defined yet!", ephemeral: true }
                );
            } else {
                await interaction.reply(
                    { content: output, ephemeral: true }
                );
             }

            
    
    }
        
            
            
        
    
};