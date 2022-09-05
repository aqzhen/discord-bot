import { Command } from "./command";
import { helloWorld } from "./commands/helloWorld";
import { getAddressBalance } from "./commands/getAddressBalance";
import { connectWallet } from "./commands/connectWallet";
import { signMessage } from "./commands/signMessage";
import { createGatedRoles } from "./commands/createGatedRoles";
import { getGatedRoleInfo } from "./commands/getGatedRoleInfo";
import { configureDatabaseSettings } from "./commands/configureDatabaseSettings";
import { getAddressRegistry } from "./commands/getAddressRegistry";


export const Commands: Command[] = [helloWorld, getAddressBalance, connectWallet, 
    signMessage, createGatedRoles, getGatedRoleInfo, configureDatabaseSettings, getAddressRegistry];