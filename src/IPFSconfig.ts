const IPFS = require('ipfs');
//const OrbitDB = require('orbit-db');

export var orbitdb;

export var ipfs = IPFS.create(
    {repo: './ipfs', config: {
    Addresses: {
    Swarm: ["/ip4/0.0.0.0/tcp/4001", "/ip4/127.0.0.1/tcp/4001/ws"]}},
    relay: { enabled: true, hop: {enabled: true, active: true }},
});




export var ipfs2 = IPFS.create({repo: './ipfs2', config: {
    Addresses: {
    Swarm: ["/ip4/0.0.0.0/tcp/4002", "/ip4/127.0.0.1/tcp/4002/ws"]}},
    relay: { enabled: true, hop: {enabled: true, active: true }},
});


/*
async function main() {
    orbitdb = await OrbitDB.createInstance(await ipfs);
}       

main();
*/
