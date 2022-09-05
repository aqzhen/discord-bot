import { BaseCommandInteraction, Client, User} from "discord.js";
import { Command } from "../command";
import { messageString } from "./connectWallet";
import { messageGenTimestamp } from "./connectWallet";
import { INFURA_TOKEN } from "../config";
import { addUsernameAddress } from "../addressRegistry";
import { assignRoles } from "../assignRoles";
import { isLocal } from "./configureDatabaseSettings";
import { addUsernameAddressIPFS } from "../addressRegistryIPFS";

const Web3 = require('web3');


export const signMessage: Command = {
    name: "signmessage",
    description: "sign the generated message from connectwallet by pasting your digital signature",
    type: "CHAT_INPUT",
    options: [
        { 
            name: "signature", 
            description: "paste your digital signature here",
            type: "STRING",
            required: true
        },
    ],

    run: async (client : Client, interaction: BaseCommandInteraction) => {
        var signature = interaction.options.get("signature")?.value;

        //should we be able to detect a network or have the user enter?
        var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + INFURA_TOKEN));

        if (Date.now() > messageGenTimestamp + 30000) {
            await interaction.reply(
                { content: "Your link has expired! Try again!", ephemeral: true }
            );
        }

        else {
            //try {
                var address = await web3.eth.accounts.recover(messageString, signature);
                if (isLocal) {
                    addUsernameAddress(interaction.user.tag, address);
                } else {
                    addUsernameAddressIPFS(interaction.user.tag, address);
                }
                await interaction.reply(
                    { content: "Address Verified: " + address + "\nGranting role now..." + "\n" + await (await assignRoles(client, interaction, address)).toString() + " Role granted!", ephemeral: true}
                );
           // }

           /** 
            catch (e) {
                
                await interaction.reply(
                    { content: "Unable to Verify Address!", ephemeral: true }
                )
                
            }
            */
        }
       
           
        
        
       
     
   
        
        
    }
};