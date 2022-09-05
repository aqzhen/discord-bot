/**
 * Allows admin to assign token-gates to existing roles in the server
 * 
 * Takes network, token id, token amount (range), and the corresponding role to assign to
 */

import { BaseCommandInteraction, Client} from "discord.js";
import { Command } from "../command";
import { isLocal } from "./configureDatabaseSettings";
import { addRole } from "../roleRegistry";
import { addRoleIPFS } from "../roleRegistryIPFS";


 
export const createGatedRoles: Command = {
    name: "creategatedroles",
    description: "(ADMIN ONLY) create token-gated roles",
    type: "CHAT_INPUT",

    options: [
    { 
        name: "network", 
        description: "Enter a network",
        type: "STRING",
        choices: [{name: "Mainnet", value: "mainnet"}, {name: "Rinkeby", value: "rinkeby"}, {name: "Ropsten", value: "ropsten"}, {name: "Kovan", value: "kovan"},
        {name: "Goerli", value: "goerli"}, {name: "PolygonMainnet", value: "polygon"}, {name: "Optimism", value: "optimism"}, {name: "ArbitrumMainnet", value: "arbitrummain"},
        {name: "ArbitrumTestnet", value:"arbitrumtest"}],
        required: true
    }, 
    { 
        name: "role", 
        description: "Use @ to select a role from existing server roles",
        type: "STRING",
        required: true
    }, 
    { 
        name: "mintokens", 
        description: "Enter minimum amount of the token",
        type: "NUMBER",
        required: true
    }, 
    { 
        name: "maxtokens", 
        description: "Enter maximum amount (leave blank for no upper limit). If IPFS, blank is set to 9999999999999999",
        type: "NUMBER",
        required: false
    },
    { 
        name: "token", 
        description: "Enter token address here (Leave blank for ETH)",
        type: "STRING",
        required: false
    }
    ],
        
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        var network : string = interaction.options.get("network").value as string;
        var minTokens : number = interaction.options.get("mintokens").value as number;
        var roleInput : string = interaction.options.get("role").value as string;

        var tokenAddress : string;
        if (interaction.options.get("token") == null) { //checking to see if max tokens is left unentered, in which case it is unbounded
            tokenAddress = "ETH";
        } else {
            tokenAddress = interaction.options.get("token").value as string;
        }

        var maxTokens : number;
        if (interaction.options.get("maxtokens") == null) { //checking to see if max tokens is left unentered, in which case it is unbounded
            maxTokens = Number.POSITIVE_INFINITY;
        } else {
            maxTokens = interaction.options.get("maxtokens").value as number;
        }


        let roleID = undefined;
        if (roleInput.startsWith('<')) {
             roleID = roleInput.slice(3, roleInput.length - 1);
        } 
        
        
        if (interaction.memberPermissions.has("ADMINISTRATOR")) {
            let guild = await client.guilds.fetch(interaction.guildId);
            let roles = guild.roles.fetch();
            //let role = (await roles).find(role => role.name === roleName);
            let role = (await roles).find(role => role.id === roleID)

            if (!role) {
                await interaction.reply(
                    { content: "That role doesn't exist! Make sure to use the @ operator" +
                    " to find a role!", ephemeral: true }
                );
            }
            else if (minTokens > maxTokens || minTokens < 0) {
                await interaction.reply(
                    { content: "Check your token ranges and try again!", ephemeral: true }
                );
            }
            else {
                let roleStructureLocal= {network : network, token : tokenAddress, minTokens : minTokens, maxTokens : maxTokens, roleID : role.id};
                if (isLocal) {
                    addRole(roleStructureLocal);
                } else {
                    let roleStructureIPFS = roleStructureLocal;
                    roleStructureIPFS.maxTokens = 9999999999999999;
                    addRoleIPFS(roleStructureIPFS);
                }
                
                await interaction.reply(
                    { content: "Token Gated Role Created!", ephemeral: true }
                );
            }
            
            }

            else {
            await interaction.reply(
                { content: "Execution failed - You do not have administrator permissions!", ephemeral: true }
            );
            }
        
    }
};