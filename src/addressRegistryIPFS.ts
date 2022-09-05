const OrbitDB = require('orbit-db');
import { ipfs } from "./IPFSconfig";

export var usernameToAddressIPFS;
export var addressToUsernameIPFS;


async function main() {
    const orbitdb = await OrbitDB.createInstance(await ipfs);
    usernameToAddressIPFS = await orbitdb.keyvalue('usernameToAddressRegistry');
    addressToUsernameIPFS = await orbitdb.keyvalue('addressToUsernameRegistry');

    console.log(usernameToAddressIPFS.address.toString());
    console.log(addressToUsernameIPFS.address.toString());
    
}
  
main();

export async function addUsernameAddressIPFS(username : string, address : string) {
    // if username isn't in registry, add it
    if (await usernameToAddressIPFS.get(username) == undefined) {
        await usernameToAddressIPFS.set(username, []);
    }
 
    var currUserAddresses : string[] = await usernameToAddressIPFS.get(username);
    var containsAddress = false;
    
    //checking to see if address already exists in user's address array
    for (var element of currUserAddresses) {
        if (element === address) {
            containsAddress = true;
        }
    }

    //if not, add address
    if (!containsAddress) {
        await currUserAddresses.push(address);
        await usernameToAddressIPFS.set(username, currUserAddresses);
        addAddressUsernameIPFS(address, username);
    }
}

export async function addAddressUsernameIPFS(address : string, username : string) {
    //add username to address if address is not a key in map
    if (await addressToUsernameIPFS.get(address) == undefined) {
        await addressToUsernameIPFS.set(address, username);
    }
}
