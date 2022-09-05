import { ApplicationCommandManager, BaseCommandInteraction, Client, Options } from "discord.js";
import { Command } from "../command";
import { INFURA_TOKEN } from '../config';
import { getAddressBalanceHelper } from "../getAddressBalanceHelper";
const Web3 = require('web3');

const infuraToken = INFURA_TOKEN;


export const getAddressBalance: Command = {
    name: "getbalance",
    description: "Returns balance of inputted",
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
        name: "walletaddress", 
        description: "Enter wallet address here",
        type: "STRING",
        required: true
    }, 
    { 
        name: "tokenaddress", 
        description: "Enter token address here (leave blank if token is ETH)",
        type: "STRING",
        required: false 
    },
    ],
      
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        
        var network = interaction.options.get("network")?.value as string;
        var walletAddress = interaction.options.get("walletaddress")?.value as string;
        
        var tokenAddress : string;
        if (interaction.options.get("tokenaddress") == null) { //checking to see if max tokens is left unentered, in which case it is unbounded
            tokenAddress = "ETH";
        } else {
            tokenAddress = interaction.options.get("tokenaddress").value as string;
        }
        
        try {
            var helperArray = await getAddressBalanceHelper(network, tokenAddress, walletAddress);
            var name = helperArray.at(0);
            var balance = helperArray.at(1);

            await interaction.reply(
                { content: balance + " " + name, ephemeral: true }
            );
        } catch {
            await interaction.reply(
                { content: "There was an issue with your addresses, try again!", ephemeral: true }
            );
        }
            
  
    
    }
}