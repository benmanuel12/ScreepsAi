var spawnCreeps = {

    //base function
    spawnCreepOfRole: function (role, spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned = 0){
        switch (role) {
            case 'harvester':
                spawnHarvester(spawn, roomDestination, creepsSpawned, creepsNeeded);
                break;
            case 'upgrader':
                spawnUpgrader(spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned);
                break;
            case 'builder':
                spawnBuilder(spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned);
                break;
            case 'repairer':
                spawnRepairer(spawn, roomDestination, creepsSpawned, creepsNeeded);
                break;
            case 'defender':
                spawnDefender(spawn, roomDestination, creepsSpawned, creepsNeeded);
                break;
            case 'attacker':
                spawnAttacker(spawn, roomDestination, creepsSpawned, creepsNeeded);
                break;
            case 'notifier':
                spawnNotifier(spawn, roomDestination, creepsSpawned, creepsNeeded);
                break;
            case 'claimer':
                spawnClaimer(spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned);
                break;
            case 'filler':
                spawnFiller(spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned);
                break;
            case 'explorer':
                spawnExplorer(spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned);
                break;
        }
    },

    spawnCreepWithTheseParts: function (spawn, parts, name, memory, number) {
        let room = spawn.room;
        if (spawn.spawnCreep(parts, name + "_" + room.name + "_" + number, {dryRun: true}) === 0) {
            console.log("Spawning " + name + "_" + room.name + "_" + number)
            spawn.spawnCreep(parts, name + "_" + room.name + "_" + number, {memory: memory});
        } else {
            console.log("Couldn't spawn " + name);
        }
    },

    // HARVESTER
    spawnHarvester: function (spawn, roomDestination, creepsSpawned, creepsNeeded) {
        console.log("Trying to spawn Harvester");
        if (creepsSpawned < creepsNeeded) {
            let number = Math.floor(Math.random() * (creepsSpawned + 1));
            if (room.energyAvailable >= 800) {
                spawnCreepWithTheseParts(spawn, [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Harvester", {role: 'harvester',room_dest: roomDestination}, number)
            } else {
                spawnCreepWithTheseParts(spawn, [WORK, CARRY, MOVE], "Harvester", {role: 'harvester',room_dest: roomDestination}, number);
            }
        } else {
            console.log("Enough Harvesters exist");
        }
    },

    // DEFENDER
    spawnDefender: function (spawn, roomDestination, creepsSpawned, creepsNeeded) {
        console.log("Trying to spawn Defender");
        if (creepsSpawned < creepsNeeded) {
            let number = Math.floor(Math.random() * (creepsSpawned + 1));
            if (room.energyAvailable >= 800) {
                this.spawnCreepWithTheseParts(spawn, [CARRY, CARRY, MOVE, MOVE, ATTACK, HEAL, HEAL, TOUGH, TOUGH], "Defender", {role: 'defender', room_dest: roomDestination}, number);
            } else {
                this.spawnCreepWithTheseParts(spawn, [CARRY, MOVE, ATTACK, MOVE, MOVE, TOUGH], "Defender", {role: 'defender', room_dest: roomDestination}, number)
            }
        } else {
            console.log("Enough Defenders exist");
        }
    },

    // REPAIRER
    spawnRepairer: function (spawn, roomDestination, creepsSpawned, creepsNeeded) {
        console.log("Trying to spawn Repairer");
        let room = spawn.room;

        if (creepsSpawned < creepsNeeded) {
            let number = Math.floor(Math.random() * (creepsSpawned + 1));
            if (room.energyAvailable >= 800) {
                this.spawnCreepWithTheseParts(spawn,[WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Repairer", {role: 'repairer', room_dest: roomDestination}, number);
            } else {
                this.spawnCreepWithTheseParts(spawn,[WORK, CARRY, MOVE], "Repairer", {role: 'repairer', room_dest: roomDestination}, number);
            }
        } else {
            console.log("Enough Repairers exist");
        }
    },

    // ATTACKER
    spawnAttacker: function (spawn, roomDestination, creepsSpawned, creepsNeeded) {
        console.log("Trying to spawn Attacker");
        let room = spawn.room;

        if (creepsSpawned < creepsNeeded) {
            let number = Math.floor(Math.random() * (creepsSpawned + 1));
            if (room.energyAvailable >= 800) {
                if (spawn.spawnCreep([ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], "Attacker_" + room.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Large Attacker_" + room.name + "_" + number)
                    spawn.spawnCreep([ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], "Attacker_" + room.name + "_" + number, {
                        memory: {
                            role: 'attacker',
                            room_dest: roomDestination
                        }
                    });
                } else {
                    console.log("Couldn't spawn Attacker");
                }
            } else {
                if (spawn.spawnCreep([ATTACK, TOUGH, MOVE], "Attacker_" + room.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Attacker_" + room.name + "_" + number)
                    spawn.spawnCreep([ATTACK, TOUGH, MOVE], "Attacker_" + room.name + "_" + number, {
                        memory: {
                            role: 'attacker',
                            room_dest: roomDestination
                        }
                    });
                } else {
                    console.log("Couldn't spawn Attacker");
                }
            }
        } else {
            console.log("Enough Attackers exist");
        }
    },

    // NOTIFIER
    spawnNotifier: function (spawn, roomDestination, creepsSpawned, creepsNeeded) {
        console.log("Trying to spawn Notifier");
        if (creepsSpawned < creepsNeeded) {
            let number = Math.floor(Math.random() * (creepsSpawned + 1));
            this.spawnCreepWithTheseParts(spawn, [MOVE, MOVE, MOVE], "Notifier", {role: 'notifier', room_dest: roomDestination}, number);
    
        } else {
            console.log("A Notifier exists");
        }
    },



    // EXTERNAL HARVESTER
    spawnHarvesterExternal: function (spawn, roomDestination, creepsSpawned, creepsNeeded) {
        console.log("Trying to spawn External Harvester");

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
            if (creepsSpawned < creepsNeeded) {
                let number = Math.floor(Math.random() * (creepsSpawned + 1));
                if (spawn.room.energyAvailable >= 850) {
                    this.spawnCreepWithTheseParts(spawn, [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Harvester_Ex", {role: 'harvester_external', room_dest: roomDestination.name, room_spawn: spawn.room.name, flag_dest_x: '25', flag_dest_y: '25'}, number);

                } else if (spawn.room.energyAvailable >= 650) {
                    this.spawnCreepWithTheseParts(spawn, [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Harvester_Ex", {role: 'harvester_external', room_dest: roomDestination.name, room_spawn: spawn.room.name, flag_dest_x: '25', flag_dest_y: '25'}, number);

                } else {
                    this.spawnCreepWithTheseParts(spawn, [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], "Harvester_Ex", {role: 'harvester_external', room_dest: roomDestination.name, room_spawn: spawn.room.name, flag_dest_x: '25', flag_dest_y: '25'}, number);
                }
            } else {
                console.log("Enough External Harvesters Exist");
            }
        }
    },

    // MINERAL HARVESTER
    spawnHarvesterMineral: function (spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned) {
        console.log("Trying to spawn Mineral Harvester");
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
                let number = Math.floor(Math.random() * (creepsSpawned.length + 1));
                this.spawnCreepWithTheseParts(spawn, [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Harvester_M", {role: 'harvester_mineral', room_dest: roomDestination.name, room_spawn: room.name, flag_dest_x: '28', flag_dest_y: '11'}, number);
            }
        }
    },

    // UPGRADER
    spawnUpgrader: function (spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned) {
        console.log("Trying to spawn Upgrader");
        let room = spawn.room;
        let controllerLevel = room.controller.level;

        if (controllerLevel < 8) {
            creepsNeeded = 3;
        } else {
            creepsNeeded = 2;
        }
        if (creepsSpawned < creepsNeeded && dependingCreepsSpawned > 0) {
            let number = Math.floor(Math.random() * (creepsSpawned + 1));
            if (room.energyAvailable >= 1200) {
                this.spawnCreepWithTheseParts(spawn, [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Upgrader", {role: 'upgrader', room_dest: roomDestination.name, cLevel: '3'}, number);

            } else if (room.energyAvailable >= 800) {
                this.spawnCreepWithTheseParts(spawn, [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Upgrader", {role: 'upgrader', room_dest: roomDestination.name, cLevel: '2'}, number);

            } else if (room.energyAvailable >= 500) {
                this.spawnCreepWithTheseParts(spawn, [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Upgrader", {role: 'upgrader', room_dest: roomDestination.name, cLevel: '1'}, number);
                
            } else {
                this.spawnCreepWithTheseParts(spawn, [WORK, CARRY, MOVE], "Upgrader", {role: 'upgrader', room_dest: roomDestination.name, cLevel: '0'}, number);
            }
        } else {
            console.log("Enough Upgraders exist");
        }

    },

    // BUILDER
    spawnBuilder: function (spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned) {
        console.log("Trying to spawn Builder");
        let targets = roomDestination.find(FIND_CONSTRUCTION_SITES);
        if (targets.length > 0 && targets.length <= 4) {
            creepsNeeded = 2;
        } else if (targets.length > 4) {
            creepsNeeded = 4;
        } else {
            creepsNeeded = 0
        }

        if (creepsSpawned < creepsNeeded && dependingCreepsSpawned > 0) {
            var number = Math.floor(Math.random() * (creepsSpawned + 1));
            if (roomDestination.energyAvailable >= 1200) {
                this.spawnCreepWithTheseParts(spawn, [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Builder", {role: 'builder', room_dest: roomDestination.name}, number);
            } else if (roomDestination.energyAvailable >= 600) {
                this.spawnCreepWithTheseParts(spawn, [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Builder", {role: 'builder', room_dest: roomDestination.name}, number);
            } else {
                this.spawnCreepWithTheseParts(spawn, [WORK, CARRY, MOVE], "Builder", {role: 'builder', room_dest: roomDestination.name}, number);
            }
        } else {
            console.log("Enough Builders exist");
        }
    },

    // FILLER
    spawnFiller: function (spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned) {
        console.log("Trying to spawn Filler");
        let links = roomDestination.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_LINK || structure.structureType === STRUCTURE_STORAGE;
            }
        });
        if ((links.length > 0) && (roomDestination.controller.level < 6)) {
            creepsNeeded = 1;
        } else if ((links.length > 0) && (roomDestination.controller.level > 5)) {
            creepsNeeded = 2;
        } else {
            creepsNeeded = 0
        }
        if (creepsSpawned < creepsNeeded && dependingCreepsSpawned > 0) {
            let number = Math.floor(Math.random() * (creepsSpawned + 1));
            if (spawn.room.energyAvailable >= 650) {
                this.spawnCreepWithTheseParts(spawn, [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], "Filler", {role: 'filler', room_dest: roomDestination.name}, number);
            } else {
                this.spawnCreepWithTheseParts(spawn, [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Filler", {role: 'filler', room_dest: roomDestination.name}, number);
            }
        }
        else {
            console.log("Enough Fillers exist");
        }
    },

    // CLAIMER
    spawnClaimer: function (spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned) {
        console.log("Trying to spawn Claimer");
        let room = Game.rooms[roomDestination];

        if (creepsSpawned < creepsNeeded && dependingCreepsSpawned > 0) {
            if (room !== undefined) {
                if (!room.controller.my) {
                    let number = Math.floor(Math.random() * (creepsSpawned + 1));
                    this.spawnCreepWithTheseParts(spawn, [CLAIM, MOVE, MOVE], "Claimer", {role: 'claimer', room_spawn: spawn.room.name, room_dest: roomDestination}, number);
                }
            }
        } else {
            console.log("Enough Claimers already");
        }
    },

    // EXPLORER
    spawnExplorer: function (spawn, roomDestination, creepsSpawned, creepsNeeded, dependingCreepsSpawned) {
        console.log("Trying to spawn Explorer");
        if (creepsSpawned < creepsNeeded && dependingCreepsSpawned > 0) {
            let number = Math.floor(Math.random() * (creepsSpawned + 1));
            this.spawnCreepWithTheseParts(spawn, [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], "Explorer", {role: 'explorer', stuckTimer: 0}, number);
        } else {
            console.log("Enough Explorers exist");
        }
    }
};

module.exports = spawnCreeps;