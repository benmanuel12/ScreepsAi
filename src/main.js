// Import custom libraries from other files
var roleLib = require('roleLib');
var roleRegistry = require('roleRegistry');
var mapLib = require('mapLib');

var structureTower = require('structure.tower');
var structureLink = require('structure.link');

if (!mapLib.getRoomList().length) {
    mapLib.mapRoomsAroundStart(Game.spawns.Spawn1.room.name);
}

// Counts living creeps of a role, scoped to a home room (by memory.room_dest) or game-wide
function countCreeps(role, roomName) {
    let count = 0;
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role === role && (roomName === undefined || creep.memory.room_dest === roomName)) {
            count++;
        }
    }
    return count;
}

//mapLib.getRoomListClaimable().forEach(el => console.log(el.name));
//console.log(mapLib.getNextClaimableRoom("Next: " + Game.spawns.Spawn1.room.name));
//console.log(mapLib.getUnvisitedRooms().forEach(el => console.log(el.name)));
//console.log(mapLib.getGCLClaimsAvailable());
//console.log(mapLib.getRoomsWithUnbuildSpawn());

//mapLib.getRoomList().forEach(el => el.visited = false)

// Main Loop
module.exports.loop = function () {

    // Count how many creeps there are of each role
    let myCreeps = new Map();
    for (const i in Game.creeps) {
        let role = Game.creeps[i].memory.role;
        if (myCreeps.has(role)){
            myCreeps.set(role, myCreeps.get(role) + 1);
        } else {
            myCreeps.set(role, 1);
        }
    }

    // Print out how many creeps there are of each role
    let creepsOut = "";
    for (var [key, value] of myCreeps){
        creepsOut += key + ": " + value + " ";
    }
    console.log(creepsOut);

    for (let spawns in Game.spawns) {
        let spawn = Game.spawns[spawns];
        let room = spawn.room;
        let harvesterCount = countCreeps('harvester', room.name);

        for (let role in roleRegistry) {
            let cfg = roleRegistry[role];

            if (cfg.gate && !cfg.gate()) {
                continue;
            }

            let ctx = { spawn: spawn, room: room, harvesterCount: harvesterCount };
            let countRoomName = room.name;

            if (cfg.scope === 'claimable') {
                countRoomName = mapLib.getNextClaimableRoom(room.name);
                if (!countRoomName) {
                    continue;
                }
                ctx.targetRoom = Game.rooms[countRoomName];
                ctx.targetRoomName = countRoomName;
            }

            let creepsSpawned = cfg.scope === 'global' ? countCreeps(role) : countCreeps(role, countRoomName);
            let creepsNeeded = cfg.needed(ctx);

            if (creepsSpawned < creepsNeeded && (!cfg.canSpawn || cfg.canSpawn(ctx))) {
                roleLib.spawnCreep(role, cfg, spawn, ctx);
            } else {
                console.log(creepsSpawned + "/" + creepsNeeded + " " + cfg.name + "s exist");
            }
        }
    }

    // Clears old creep names from memory
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // Runs the AI for towers and links
    for (let rooms in Game.rooms) {
        let room = Game.rooms[rooms];
        structureTower.run(room);
        structureLink.run(room);
    }

    // Runs the AI for creeps
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        let cfg = roleRegistry[creep.memory.role];
        if (cfg) {
            cfg.run(creep);
        }
    }
    
    // Print out how much energy my rooms have
    for (const i in Game.rooms) {
        let room = Game.rooms[i];
        console.log("Room " + room.name + " has " + room.energyAvailable + "/" + room.energyCapacityAvailable + " energy.");
    }
};