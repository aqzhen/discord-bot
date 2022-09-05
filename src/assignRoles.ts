// function that checks if the user that calls the function meets requirements and assigns their role (as defined by role registry in createGatedRole)
import { BaseCommandInteraction, Client} from "discord.js";
import { roleRegistry } from "./roleRegistry";
import { getAddressBalanceHelper } from "./getAddressBalanceHelper";
import { isLocal } from "./commands/configureDatabaseSettings";
import { roleRegistryIPFS } from "./roleRegistryIPFS";


export async function assignRoles(client : Client, interaction: BaseCommandInteraction, walletAddress : string) : Promise<string[]> {
    let guild = await client.guilds.fetch(interaction.guildId);
    let member = guild.members.cache.get(interaction.member.user.id);
    let rolesAssigned = [];

    if (isLocal) {
        for (var roleSpecs of roleRegistry) { //iterating through role registry to see if user satifies token requirements
            let network = roleSpecs.network;
            let tokenAddress = roleSpecs.token;
            let minTokens = roleSpecs.minTokens;
            let maxTokens = roleSpecs.maxTokens;
            let roleID = roleSpecs.roleID;

            var userBalance = (await getAddressBalanceHelper(network, tokenAddress, walletAddress)).at(1);
            if (userBalance <= maxTokens && userBalance >= minTokens) {
                member.roles.add(roleID);
                let role = await guild.roles.fetch(roleID);
                rolesAssigned.push(role.name);
            }
        }
    } else {
        const all = roleRegistryIPFS.iterator({ limit: -1 }).collect().map((e) => e.payload.value);
        for (var roleSpecs of all) { //iterating through role registry to see if user satifies token requirements
            let network = roleSpecs.network;
            let tokenAddress = roleSpecs.token;
            let minTokens = roleSpecs.minTokens;
            let maxTokens = roleSpecs.maxTokens;
            let roleID = roleSpecs.roleID;

            var userBalance = (await getAddressBalanceHelper(network, tokenAddress, walletAddress)).at(1);
            if (userBalance <= maxTokens && userBalance >= minTokens) {
                member.roles.add(roleID);
                let role = await guild.roles.fetch(roleID);
                rolesAssigned.push(role.name);
            }
        }
    }
        
    return rolesAssigned;
    
}
