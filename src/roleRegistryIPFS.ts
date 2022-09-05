const OrbitDB = require('orbit-db');
import { ipfs2 } from "./IPFSconfig";

export var roleRegistryIPFS;


async function main() {
    const orbitdb = await OrbitDB.createInstance(await ipfs2);
    roleRegistryIPFS = await orbitdb.feed('roleRegistry');
}
  
main();

export async function addRoleIPFS(roleStructure) {
    await roleRegistryIPFS.add(roleStructure);
}

