import {INFURA_TOKEN} from './config';
const Web3 = require('web3');
const infuraToken = INFURA_TOKEN;

// The minimum ABI to get ERC20 Token balance
let minABI = [
    // balanceOf
    {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
    },
    // decimals
    {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
    }
];

export async function getAddressBalanceHelper(network : string, tokenAddress: string, walletAddress: string) : Promise<string[]> {
    var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + infuraToken));
    if (network === "rinkeby") {
        web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + infuraToken));
    }

    
    else if (network === "ropsten") {
        web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/' + infuraToken));
    }
    else if (network === "kovan") {
        web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/' + infuraToken));
    }
    else if (network === "goerli") {
        web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/' + infuraToken));
    }
    else if (network === "polygon") {
        web3 = new Web3(new Web3.providers.HttpProvider('https://polygon.infura.io/v3/' + infuraToken));
    }
    else if (network === "optimism") {
        web3 = new Web3(new Web3.providers.HttpProvider('https://optimism.infura.io/v3/' + infuraToken));
    }
    else if (network === "arbitrummain") {
        web3 = new Web3(new Web3.providers.HttpProvider('https://arbitrummain.infura.io/v3/' + infuraToken));
    }
    else if (network === "arbitrumtest") {
        web3 = new Web3(new Web3.providers.HttpProvider('https://arbitrumtest.infura.io/v3/' + infuraToken));
    }

      
    // logic for ethereum address
    if (web3.utils.isAddress(walletAddress)) {
        var balance = await web3.eth.getBalance(walletAddress);
        balance = web3.utils.fromWei(balance);
        
        return ["Ethereum", balance];
    }


    // Otherwise, get ERC20 Token contract instance
    const contract = new web3.eth.Contract(minABI, tokenAddress);

    try {
        // Call balanceOf function
        var decimal = await contract.methods.decimals().call();
        const balance = await contract.methods.balanceOf(walletAddress).call();
        var adjustedBalance = balance / Math.pow(10, decimal)
        var name = contract.name();
        var symbol = contract.symbol();
        return [name, balance];

    } catch {
        throw new Error();
    }
    
    
    return [];
}
