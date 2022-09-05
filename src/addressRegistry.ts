export var usernameToAddress = new Map<String, String[]>();
export var addressToUsername = new Map<String, String>();

export function addUsernameAddress(username : String, address : String) {
    // if username isn't in registry, add it
    if (!usernameToAddress.has(username)) {
        usernameToAddress.set(username, []);
    }

    var currUserAddresses = usernameToAddress.get(username);
    var containsAddress = false;
    
    //checking to see if address already exists in user's address array
    for (let element of currUserAddresses) {
        if (element === address) {
            containsAddress = true;
        }
    }

    //if not, add address
    if (!containsAddress) {
        currUserAddresses.push(address);
        addAddressUsername(address, username);
    }

}

export function addAddressUsername(address, username) {
    //add username to address if address is not a key in map
    if (!addressToUsername.has(address)) {
        addressToUsername.set(address, username);
    }
}

export function getUsernames() : string {
    return usernameToAddress.keys().next().value;
}