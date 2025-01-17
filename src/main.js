// Import creep roles from other files
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleDefender = require('role.defender');
var roleAttacker = require('role.attacker');
var roleNotifier = require('role.notifier');
var roleHarvesterExternal = require('role.harvester_external');
var roleHarvesterMineral = require('role.harvester_mineral');
var roleClaimer = require('role.claimer');
var roleFiller = require('role.filler');
var roleExplorer = require('role.explorer');

// Import custom libraries from other files
var roleLib = require('roleLib');
var mapLib = require('mapLib');

var structureTower = require('structure.tower');
var structureLink = require('structure.link');

// Define global limits on creep numbers
var harvester_spawn = 3;
var harvester_external_spawn = 0;
var harvester_mineral_spawn = 0;
var upgrader_spawn = 3;
var builder_spawn = 1;
var repairer_spawn = 3;
var defender_spawn = 0;
var attacker_spawn = 0;
var notifier_spawn = 1;
var filler_spawn = 1;

if (!mapLib.getRoomList().length) {
    mapLib.mapRoomsAroundStart(Game.spawns.Spawn1.room.name);
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

    let mapRooms = mapLib.getRoomListClaimable();

    // Creates an array of all creeps that are of a certain role for each role
    var role_Harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    var role_Harvesters_External = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester_external');
    var role_Harvesters_Mineral = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester_mineral');
    var role_Upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    var role_Builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    var role_Repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');
    var role_Defenders = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender');
    var role_Attackers = _.filter(Game.creeps, (creep) => creep.memory.role === 'attacker');
    var role_Notifier = _.filter(Game.creeps, (creep) => creep.memory.role === 'notifier');
    var role_Claimers = _.filter(Game.creeps, (creep) => creep.memory.role === 'claimer');
    var role_Fillers = _.filter(Game.creeps, (creep) => creep.memory.role === 'filler');
    var role_Explorer = _.filter(Game.creeps, (creep) => creep.memory.role === 'explorer');

    for (let spawns in Game.spawns) {
        let spawn = Game.spawns[spawns];
        let room = spawn.room;
        
        // Limits the above arrays to only those creeps of those roles in the current room
        var room_Harvesters = _.filter(role_Harvesters, (creep) => creep.memory.room_dest === room.name);
        var room_Harvesters_External = _.filter(role_Harvesters_External, (creep) => creep.memory.room_dest.name === room.name);
        var room_Harvesters_Mineral = _.filter(role_Harvesters_Mineral, (creep) => creep.memory.room_dest === room.name);
        var room_Upgraders = _.filter(role_Upgraders, (creep) => creep.memory.room_dest === room.name);
        var room_Builders = _.filter(role_Builders, (creep) => creep.memory.room_dest === room.name);
        var room_Repairers = _.filter(role_Repairers, (creep) => creep.memory.room_dest === room.name);
        var room_Defenders = _.filter(role_Defenders, (creep) => creep.memory.room_dest === room.name);
        var room_Attackers = _.filter(role_Attackers, (creep) => creep.memory.room_dest === room.name);
        var room_Claimers = _.filter(role_Claimers, (creep) => creep.memory.room_dest === room.name);
        var room_Fillers = _.filter(role_Fillers, (creep) => creep.memory.room_dest.name === room.name);
        var room_Explorer = role_Explorer;
        var room_Notifier = role_Notifier;

        // Attempts to spawn new creeps
        // Priority of spawning does not prioritise harvester, instead explorer, notifier, repairer then harvester
        //HARVESTER
        roleLib.spawnCreepOfRole('harvester', spawn, room, room_Harvesters.length, harvester_spawn);

        //HARVESTER_MINERAL
        //roleLib..spawnCreepOfRole();

        //UPGRADER
        roleLib.spawnCreepOfRole('upgrader', spawn, room, room_Upgraders.length, upgrader_spawn, room_Harvesters.length);

        //BUILDER
        roleLib.spawnCreepOfRole('builder', spawn, room, room_Builders.length, builder_spawn, room_Harvesters.length);
        
        //REPAIRER
        roleLib.spawnCreepOfRole('repairer', spawn, room, room_Repairers.length, repairer_spawn, room_Harvesters.length);
        
        //DEFENDER
        roleLib.spawnCreepOfRole('defender', spawn, room, room_Defenders.length, defender_spawn);

        //ATTACKER
        roleLib.spawnCreepOfRole('attacker', spawn, room, room_Attackers.length, attacker_spawn);
        
        //NOTIFIER
        roleLib.spawnCreepOfRole('notifier', spawn, room, room_Notifier.length, notifier_spawn, room_Harvesters.length);
        
        //FILLER
        roleLib.spawnCreepOfRole('filler', spawn, room, room_Fillers.length, filler_spawn, room_Harvesters.length);

        //EXPLORER
        if (mapLib.getUnvisitedRooms().length) {
            roleLib.spawnCreepOfRole('explorer', spawn, null, room_Explorer.length, mapLib.getGCLClaimsAvailable() ? mapLib.getGCLClaimsAvailable() : 1, room_Harvesters.length);
        }
        
        for (let x = 0; x < mapRooms.length; x++) {

            var room_Harvesters_External = _.filter(role_Harvesters_External, (creep) => creep.memory.room_dest == mapRooms[x].name);
            var room_Claimers = _.filter(role_Claimers, (creep) => creep.memory.room_dest === mapRooms[x].name);

            //HARVESTER_EXTERNAL
            roleLib.spawnCreepOfRole('harvester_external', spawn, mapLib.getNextClaimableRoom(room.name), room_Harvesters_External.length, harvester_external_spawn);
            
            //CLAIMER
            roleLib.spawnCreepOfRole('claimer', spawn, mapLib.getNextClaimableRoom(room.name), room_Claimers.length, mapLib.getGCLClaimsAvailable() / 2, room_Harvesters.length);
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
        switch (creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'harvester_external':
                roleHarvesterExternal.run(creep);
                break;
            case 'harvester_mineral':
                roleHarvesterMineral.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'repairer':
                roleRepairer.run(creep);
                break;
            case 'defender':
                roleDefender.run(creep);
                break;
            case 'attacker':
                roleAttacker.run(creep);
                break;
            case 'notifier':
                roleNotifier.run(creep);
                break;
            case 'claimer':
                roleClaimer.run(creep);
                break;
            case 'filler':
                roleFiller.run(creep);
                break;
            case 'explorer':
                roleExplorer.run(creep);
                break;
        }
    }
    
    // Print out how much energy my rooms have
    for (const i in Game.rooms) {
        let room = Game.rooms[i];
        console.log("Room " + room.name + " has " + room.energyAvailable + "/" + room.energyCapacityAvailable + " energy.");
    }
};