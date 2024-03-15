// Creep Types
let Harvester = {
    parts: [
        [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        [WORK, CARRY, MOVE, MOVE]
    ],
    name: "Harvester",
    role: 'harvester',
}

let Defender = {
    parts: [
        [CARRY, CARRY, MOVE, MOVE, ATTACK, HEAL, HEAL, TOUGH, TOUGH],
        [CARRY, ATTACK, MOVE, MOVE, MOVE, TOUGH]
    ],
    name: "Defender",
    role: 'defender',
}

let Repairer = {
    parts: [
        [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        [WORK, CARRY, MOVE, MOVE]
    ],
    name: "Repairer",
    role: 'repairer',
}

let Attacker = {
    parts: [
        [ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE],
        [ATTACK, TOUGH, MOVE, MOVE]
    ],
    name: "Attacker",
    role: 'attacker',
}

let Notifier = {
    parts: [
        [MOVE, MOVE]
    ],
    name: "Notifier",
    role: 'notifier',
}

let ExternalHarvester = {
    parts: [
        [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
    ],
    name: "Harvester_Ex",
    role: 'harvester_external',
}

let MineralHarvester = {
    parts: [
        [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
    ],
    name: "HarvesterM",
    role: 'harvester_mineral',
}

let Upgrader = {
    parts: [
        [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        [WORK, CARRY, MOVE, MOVE]
    ],
    name: "Upgrader",
    role: 'upgrader',
}

let Builder = {
    parts: [
        [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        [WORK, CARRY, MOVE, MOVE]
    ],
    name: "Builder",
    role: 'builder',
}

let Filler = {
    parts: [
        [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        [CARRY, CARRY, MOVE, MOVE]
    ],
    name: "Filler",
    role: 'filler',
}

let Claimer = {
    parts: [
        [CLAIM, MOVE, MOVE]
    ],
    name: "Claimer",
    role: 'claimer',
}

let Explorer = {
    parts: [
        [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        [WORK, CARRY, MOVE, MOVE]
    ],
    name: "Explorer",
    role: 'explorer',
}

// Costs
let costs = new Map();
costs.set(MOVE, 50);
costs.set(WORK, 100);
costs.set(CARRY, 50);
costs.set(ATTACK, 80);
costs.set(RANGED_ATTACK, 150);
costs.set(HEAL, 250);
costs.set(CLAIM, 600);
costs.set(TOUGH, 10);


// Error Codes
let errorMap = new Map();
errorMap.set('0', 'The operation has been scheduled successfully.');
errorMap.set('-1', 'You are not the owner of this spawn.');
errorMap.set('-3', 'There is a creep with the same name already.');
errorMap.set('-4', 'The spawn is already in process of spawning another creep.');
errorMap.set('-6', 'The spawn and its extensions contain not enough energy to create a creep with the given body.');
errorMap.set('-10', 'Body is not properly described or name was not provided.');
errorMap.set('-14', 'Your Room Controller level is insufficient to use this spawn.');

var spawnCreeps = {

    creepCost: function (parts) {
        sum = 0;
        for (part in parts) {
            sum = sum + costs.get(part);
        }
        return sum
    },

    //base function
    spawnCreepOfRole: function (role, spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned = 0){
        switch (role) {
            case 'harvester':
                this.spawnHarvester(spawn, creepsSpawned, creepsNeeded);
                break;
            case 'upgrader':
                this.spawnUpgrader(spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned);
                break;
            case 'builder':
                // spawnBuilder has internal check on creepsNeeded, value not needed as parameter
                this.spawnBuilder(spawn, roomDestination, creepsSpawned, dependingCreepsSpawned);
                break;
            case 'repairer':
                this.spawnRepairer(spawn, creepsSpawned, creepsNeeded);
                break;
            case 'defender':
                this.spawnDefender(spawn, creepsSpawned, creepsNeeded);
                break;
            case 'attacker':
                this.spawnAttacker(spawn, creepsSpawned, creepsNeeded);
                break;
            case 'notifier':
                this.spawnNotifier(spawn, creepsSpawned, creepsNeeded);
                break;
            case 'claimer':
                this.spawnClaimer(spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned);
                break;
            case 'filler':
                // spawnFiller has internal check on creepsNeeded, value not needed as parameter
                this.spawnFiller(spawn, roomDestination, creepsSpawned, dependingCreepsSpawned);
                break;
            case 'explorer':
                this.spawnExplorer(spawn, creepsSpawned, creepsNeeded, dependingCreepsSpawned);
                break;
        }
    },

    newSpawnCreepWithTheseParts: function(creepType, spawn, creepsSpawned, creepsNeeded, extraMemory) {
        let roomDestination = spawn.room;
        let partsToUse = []
        let memory = {role: creepType.role, room_dest: roomDestination.name}
        if (Object.keys(extraMemory).length > 0) {
            memory = {...memory, ...extraMemory}
        }
        if (creepsSpawned < creepsNeeded) {
            let number = Game.time;
            for (item in creepType.parts) {
                console.log("Creep cost: " + this.creepCost(item));
                if (this.creepCost(item) <= roomDestination.energyAvailable) {
                    partsToUse = creepType.parts
                    break
                }
            }
            console.log("parts: " + partsToUse);
            
            if (partsToUse.length){
                errorCode = spawn.spawnCreep(partsToUse, creepType.name + "_" + roomDestination.name + "_" + creepType.number, {dryRun: true})
                if (errorCode === 0) {
                    console.log("Spawning " + creepType.name + "_" + roomDestination.name + "_" + creepType.number)
                    spawn.spawnCreep(partsToUse, creepType.name + "_" + roomDestination.name + "_" + creepType.number, {memory: memory});
                } else {
                    console.log("Couldn't spawn " + creepType.name + " - Error: " + errorMap.get(errorCode.toString()));
                }
            } else {
                console.log("Can't afford to spawn " + creepType.name);
            }
        } else {
            console.log(creepsSpawned + "/" + creepsNeeded + Harvester.name + "s exist");
        }
    },
    

    // HARVESTER
    spawnHarvester: function (spawn, creepsSpawned, creepsNeeded) {
        this.newSpawnCreepWithTheseParts(Harvester, spawn, creepsSpawned, creepsNeeded, {});
    },

    // DEFENDER
    spawnDefender: function (spawn, creepsSpawned, creepsNeeded) {
        this.newSpawnCreepWithTheseParts(Defender, spawn, creepsSpawned, creepsNeeded, {});
    },

    // REPAIRER
    spawnRepairer: function (spawn, creepsSpawned, creepsNeeded) {
        this.newSpawnCreepWithTheseParts(Repairer, spawn, creepsSpawned, creepsNeeded, {});
    },

    // ATTACKER
    spawnAttacker: function (spawn, creepsSpawned, creepsNeeded) {
        this.newSpawnCreepWithTheseParts(Attacker, spawn, creepsSpawned, creepsNeeded, {});
    },

    // NOTIFIER
    spawnNotifier: function (spawn, creepsSpawned, creepsNeeded) {
        this.newSpawnCreepWithTheseParts(Notifier, spawn, creepsSpawned, creepsNeeded, {});
    },

    // EXTERNAL HARVESTER
    spawnHarvesterExternal: function (spawn, roomDestination, creepsSpawned, creepsNeeded) {
        let roomConstruct = Game.rooms[roomDestination];
        let constructSpawn;
        if (roomConstruct !== undefined) {
            constructSpawn = roomConstruct.find(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_SPAWN;
                }
            });
        }

        if (roomConstruct === undefined || constructSpawn.length > 0) {
            extraMemory = {room_spawn: spawn.room.name, flag_dest_x: '25', flag_dest_y: '25'}
            this.newSpawnCreepWithTheseParts(ExternalHarvester, spawn, creepsSpawned, creepsNeeded, extraMemory);
        }
    },

    // MINERAL HARVESTER
    spawnHarvesterMineral: function (spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned) {
        let controllerLevel = roomDestination.controller.level;

        if(controllerLevel >= 6) {
            let room_mineral = roomDestination.find(FIND_MINERALS);
            let room_storage = roomDestination.storage;
            let room_storageFull = false;
            if(room_storage != null) {
                room_storageFull = room_storage.store < room_storage.store.getCapacity()
            }
            let room_extractor = roomDestination.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_EXTRACTOR;
                }});
            if(room_extractor.length === 0) {
                roomDestination.createConstructionSite(room_mineral[0].pos, STRUCTURE_EXTRACTOR)
            }

            if (creepsSpawned < creepsNeeded && room_extractor.length > 0 && room_mineral[0].mineralAmount > 0 && room_storageFull && dependingCreepsSpawned > 0) {
                extraMemory = {room_spawn: roomDestination.name, flag_dest_x: '28', flag_dest_y: '11'}
                this.newSpawnCreepWithTheseParts(MineralHarvester, spawn, creepsSpawned, creepsNeeded, extraMemory);
            }
        }
    },

    // UPGRADER
    spawnUpgrader: function (spawn, roomDestination, creepsSpawned, dependingCreepsSpawned) {
        //console.log("Trying to spawn Upgrader");
        let room = spawn.room;
        let controllerLevel = room.controller.level;
        let creepsNeeded;

        if (controllerLevel < 8) {
            creepsNeeded = 3;
        } else {
            creepsNeeded = 2;
        }
        if (creepsSpawned < creepsNeeded && dependingCreepsSpawned > 0) {
            let number = Game.time;
            if (room.energyAvailable >= 1200) {
                let extraMemory = {clevel: '3'}
                this.newSpawnCreepWithTheseParts(Upgrader, spawn, creepsSpawned, creepsNeeded, extraMemory);

            } else if (room.energyAvailable >= 800) {
                let extraMemory = {clevel: '2'}
                this.newSpawnCreepWithTheseParts(Upgrader, spawn, creepsSpawned, creepsNeeded, extraMemory);

            } else if (room.energyAvailable >= 500) {
                let extraMemory = {clevel: '1'}
                this.newSpawnCreepWithTheseParts(Upgrader, spawn, creepsSpawned, creepsNeeded, extraMemory);
                
            } else {
                let extraMemory = {clevel: '0'}
                this.newSpawnCreepWithTheseParts(Upgrader, spawn, creepsSpawned, creepsNeeded, extraMemory);
            }
        } else {
            console.log(creepsSpawned + "/" + creepsNeeded + " Upgraders exist");
        }

    },

    // BUILDER
    spawnBuilder: function (spawn, roomDestination, creepsSpawned, dependingCreepsSpawned) {
        let roomDestination = spawn.room;
        let targets = roomDestination.find(FIND_CONSTRUCTION_SITES);
        let creepsNeeded;
        if (targets.length > 0 && targets.length <= 4) {
            creepsNeeded = 2;
        } else if (targets.length > 4) {
            creepsNeeded = 4;
        } else {
            creepsNeeded = 0
        }

        if (creepsSpawned < creepsNeeded && dependingCreepsSpawned > 0) {
            this.newSpawnCreepWithTheseParts(Builder, spawn, creepsSpawned, creepsNeeded, {});
        } else {
            console.log(creepsSpawned + "/" + creepsNeeded + " Builders exist");
        }
    },

    // FILLER
    spawnFiller: function (spawn, roomDestination, creepsSpawned, dependingCreepsSpawned) {
        let links = roomDestination.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_LINK || structure.structureType === STRUCTURE_STORAGE;
            }
        });
        let creepsNeeded;

        if ((links.length > 0) && (roomDestination.controller.level < 6)) {
            creepsNeeded = 1;
        } else if ((links.length > 0) && (roomDestination.controller.level > 5)) {
            creepsNeeded = 2;
        } else {
            creepsNeeded = 0
        }
        if (creepsSpawned < creepsNeeded && dependingCreepsSpawned > 0) {
            this.newSpawnCreepWithTheseParts(Builder, spawn, creepsSpawned, creepsNeeded, {});
        }
        else {
            console.log(creepsSpawned + "/" + creepsNeeded + " Fillers exist or no storage/links are present");
        }
    },

    // CLAIMER
    spawnClaimer: function (spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned) {
        let room = Game.rooms[roomDestination];

        if (creepsSpawned < creepsNeeded && dependingCreepsSpawned > 0) {
            if (room !== undefined) {
                if (!room.controller.my) {
                    let number = Game.time;
                    this.newSpawnCreepWithTheseParts(Claimer, spawn, creepsSpawned, creepsNeeded, {});
                }
            }
        } else {
            console.log(creepsSpawned + "/" + creepsNeeded + " Claimers already");
        }
    },

    // EXPLORER
    spawnExplorer: function (spawn, creepsSpawned, creepsNeeded, dependingCreepsSpawned) {
        this.newSpawnCreepWithTheseParts(Explorer, spawn, creepsSpawned, creepsNeeded);
    }
};

module.exports = spawnCreeps;