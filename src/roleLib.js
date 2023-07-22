var spawnCreeps = {

    // DEFENDER
    spawnDefender: function (spawn, roomDestination, creepsSpawned, creepsNeeded) {
        console.log("Trying to spawn Defender");
        let room = spawn.room;

        if (creepsSpawned < creepsNeeded) {
            let number = Math.floor(Math.random() * (creepsSpawned + 1));
            if (room.energyAvailable >= 800) {
                if (spawn.spawnCreep([CARRY, CARRY, MOVE, MOVE, ATTACK, HEAL, HEAL, TOUGH, TOUGH], "Defender_" + room.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Large Defender_" + room.name + "_" + number)
                    spawn.spawnCreep([CARRY, CARRY, MOVE, MOVE, ATTACK, HEAL, HEAL, TOUGH, TOUGH], "Defender_" + room.name + "_" + number, {
                        memory: {
                            role: 'defender',
                            room_dest: roomDestination
                        }
                    });
                } else {
                    console.log("Couldn't spawn Defender")
                }
            } else {
                if (spawn.spawnCreep([CARRY, MOVE, ATTACK, MOVE, MOVE, TOUGH], "Defender_" + room.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Defender_" + room.name + "_" + number)
                    spawn.spawnCreep([CARRY, MOVE, ATTACK, MOVE, MOVE, TOUGH], "Defender_" + room.name + "_" + number, {
                        memory: {
                            role: 'defender',
                            room_dest: roomDestination
                        }
                    });
                }
                else {
                    console.log("Couldn't spawn Defender")
                }
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
                if (spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Repairer_" + room.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Large Repairer_" + room.name + "_" + number)
                    spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Repairer_" + room.name + "_" + number, {
                        memory: {
                            role: 'repairer',
                            room_dest: roomDestination
                        }
                    });
                } else {
                    console.log("Couldn't spawn Harvester");
                }
            } else {
                if (spawn.spawnCreep([WORK, CARRY, MOVE], "Repairer_" + room.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Repairer_" + room.name + "_" + number)
                    spawn.spawnCreep([WORK, CARRY, MOVE], "Repairer_" + room.name + "_" + number, {
                        memory: {
                            role: 'repairer',
                            room_dest: roomDestination
                        }
                    });
                } else {
                    console.log("Couldn't spawn Repairer");
                }
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
        let room = spawn.room;

        if (creepsSpawned < creepsNeeded) {
            let number = Math.floor(Math.random() * (creepsSpawned + 1));
            if (spawn.spawnCreep([MOVE, MOVE, MOVE], "Notifier_" + room.name + "_" + number, {dryRun: true}) === 0) {
                console.log("Spawning Notifier_" + room.name + "_" + number)
                spawn.spawnCreep([MOVE, MOVE, MOVE], "Notifier_" + room.name + "_" + number, {
                    memory: {
                        role: 'notifier',
                        room_dest: roomDestination
                    }
                });
            } else {
                console.log("Couldn't spawn Notifier");
            }
        } else {
            console.log("A Notifier exists");
        }
    },

    // HARVESTER
    spawnHarvester: function (spawn, roomDestination, creepsSpawned, creepsNeeded) {
        console.log("Trying to spawn Harvester");
        let room = spawn.room;

        if (creepsSpawned < creepsNeeded) {
            let number = Math.floor(Math.random() * (creepsSpawned + 1));
            if (room.energyAvailable >= 800) {
                if (spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Harvester_" + room.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Large Harvester_" + room.name + "_" + number)
                    spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Harvester_" + room.name + "_" + number, {
                        memory: {
                            role: 'harvester',
                            room_dest: roomDestination.name
                        }
                    });
                } else {
                    console.log("Couldn't spawn Harvester");
                }
            } else {
                if (spawn.spawnCreep([WORK, CARRY, MOVE], "Harvester_" + room.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning " + "Harvester_" + room.name + "_" + number)
                    spawn.spawnCreep([WORK, CARRY, MOVE], "Harvester_" + room.name + "_" + number, {
                        memory: {
                            role: 'harvester',
                            room_dest: roomDestination.name
                        }
                    });
                } else {
                    console.log("Couldn't spawn Harvester");
                }
            }
        } else {
            console.log("Enough Harvesters exist");
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
                if (spawn.room.energyAvailable >= 850) {
                    let number = Math.floor(Math.random() * (creepsSpawned + 1));
                    if (spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Harvester_Ex_" + roomDestination + number, {dryRun: true}) === 0) {
                        console.log("Spawning Extra Large Harvester_Ex_" + roomDestination + "_"+ number)
                        spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Harvester_Ex_" + roomDestination + "_" + number, {
                            memory: {
                                role: 'harvester_external',
                                room_dest: roomDestination,
                                room_spawn: spawn.roomDestination,
                                flag_dest_x: '25',
                                flag_dest_y: '25'
                            }
                        });
                    }  else {
                        console.log("Couldn't spawn External Harvester");
                    }
                } else if (spawn.room.energyAvailable >= 650) {
                    let number = Math.floor(Math.random() * (creepsSpawned + 1));
                    if (spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Harvester_Ex_" + roomDestination + number, {dryRun: true}) === 0) {
                        console.log("Spawning Large Harvester_Ex_" + roomDestination + "_" + number)
                        spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Harvester_Ex_" + roomDestination + "_" + number, {
                            memory: {
                                role: 'harvester_external',
                                room_dest: roomDestination,
                                room_spawn: spawn.room.name,
                                flag_dest_x: '25',
                                flag_dest_y: '25'
                            }
                        });
                    } else {
                        console.log("Couldn't spawn External Harvester");
                    }
                } else {
                    let number = Math.floor(Math.random() * (creepsSpawned + 1));
                    if (spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], "Harvester_Ex_" + roomDestination + number, {dryRun: true}) === 0) {
                        console.log("Spawning Harvester_Ex_" + roomDestination + "_" + number)
                        spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], "Harvester_Ex_" + roomDestination + "_" + number, {
                            memory: {
                                role: 'harvester_external',
                                room_dest: roomDestination,
                                room_spawn: spawn.room.name,
                                flag_dest_x: '25',
                                flag_dest_y: '25'
                            }
                        });
                    } else {
                        console.log("Couldn't spawn Harvester");
                    }
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
                if (spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Harvester_M_" + rooms_around[x] + number, {dryRun: true}) === 0) {
                    console.log("Spawning " + "Harvester_M_" + rooms_around[x] + "_" + number)
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Harvester_M_" + rooms_around[x] + "_" + number, {
                        memory: {
                            role: 'harvester_mineral',
                            room_dest: roomDestination,
                            room_spawn: room.name,
                            flag_dest_x: '28',
                            flag_dest_y: '11'
                        }
                    });
                } else {
                    console.log("Couldn't spawn Mineral Harvester");
                }
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
                if (spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Upgrader_" + room.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Mega Upgrader_" + room.name + "_" + number);
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "Upgrader_" + room.name + "_" + number, {
                        memory: {
                            role: 'upgrader',
                            room_dest: room.name,
                            cLevel: '3'
                        }
                    });
                }
                else {
                    console.log("Couldn't spawn Upgrader");
                }
            } else if (room.energyAvailable >= 800) {
                if (spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Upgrader_" + room.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Extra Large Upgrader_" + room.name + "_" + number);
                    spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Upgrader_" + room.name + "_" + number, {
                        memory: {
                            role: 'upgrader',
                            room_dest: room.name,
                            cLevel: '2'
                        }
                    });
                } else {
                    console.log("Couldn't spawn Upgrader");
                }
            } else if (room.energyAvailable >= 500) {
                if (spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Upgrader_" + room.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Large Upgrader_" + room.name + "_" + number);
                    spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Upgrader_" + room.name + "_" + number, {
                        memory: {
                            role: 'upgrader',
                            room_dest: room.name,
                            cLevel: '1'
                        }
                    });
                } else {
                    console.log("Couldn't spawn Upgrader");
                }
                
            } else {
                if (spawn.spawnCreep([WORK, CARRY, MOVE], "Upgrader_" + room.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Upgrader_" + room.name + "_" + number);
                    spawn.spawnCreep([WORK, CARRY, MOVE], "Upgrader_" + room.name + "_" + number, {
                        memory: {
                            role: 'upgrader',
                            room_dest: room.name,
                            cLevel: '0'
                        }
                    });
                } else {
                    console.log("Couldn't spawn Upgrader");
                }
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
                if (spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Builder_" + roomDestination.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Extra Large Builder_" + roomDestination.name + "_" + number)
                    spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Builder_" + roomDestination.name + "_" + number, {
                        memory: {
                            role: 'builder',
                            room_dest: roomDestination.name
                        }
                    });
                } else {
                    console.log("Couldn't spawn Builder");
                }
            } else if (roomDestination.energyAvailable >= 600) {
                if (spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Builder_" + roomDestination.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Large Builder_" + roomDestination.name + "_" + number)
                    spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Builder_" + roomDestination.name + "_" + number, {
                        memory: {
                            role: 'builder',
                            room_dest: roomDestination.name
                        }
                    });
                } else {
                    console.log("Couldn't spawn Builder");
                }
            } else {
                if (spawn.spawnCreep([WORK, CARRY, MOVE], "Builder_" + roomDestination.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Builder_" + roomDestination.name + "_" + number)
                    spawn.spawnCreep([WORK, CARRY, MOVE], "Builder_" + roomDestination.name + "_" + number, {
                        memory: {
                            role: 'builder',
                            room_dest: roomDestination.name
                        }
                    });
                } else {
                    console.log("Couldn't spawn Builder");
                }
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
            if (spawn.room.energyAvailable >= 650) {
                let number = Math.floor(Math.random() * (creepsSpawned + 1));
                if (spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], "Filler_" + roomDestination.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Large Filler_" + roomDestination.name + "_" + number)
                    spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], "Filler_" + roomDestination.name + "_" + number, {
                        memory: {
                            role: 'filler',
                            room_dest: roomDestination.name
                        }
                    });
                } else {
                    console.log("Couldn't spawn Filler");
                }

            } else {
                var number = Math.floor(Math.random() * (creepsSpawned + 1));
                if (spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Filler_" + roomDestination.name + "_" + number, {dryRun: true}) === 0) {
                    console.log("Spawning Filler_" + roomDestination.name + "_" + number)
                    spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], "Filler_" + roomDestination.name + "_" + number, {
                        memory: {
                            role: 'filler',
                            room_dest: roomDestination.name
                        }
                    });
                } else {
                    console.log("Couldn't spawn Filler");
                }
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
                    if (spawn.spawnCreep([CLAIM, MOVE, MOVE], "Claimer_" + roomDestination + "_" + number, {dryRun: true}) === 0) {
                        console.log("Spawning " + "Claimer_" + roomDestination + "_" + number)
                        spawn.spawnCreep([CLAIM, MOVE, MOVE], "Claimer_" + roomDestination + "_" + number, {
                            memory: {
                                role: 'claimer',
                                room_spawn: spawn.room.name,
                                room_dest: roomDestination
                            }
                        });
                    } else {
                        console.log("Couldn't spawn Claimer");
                    }
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
            if (spawn.spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], "Explorer_" + number, {dryRun: true}) === 0) {
                console.log("Spawning " + "Explorer_" + number)
                spawn.spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], "Explorer_" + number, {
                    memory: {
                        role: 'explorer',
						stuckTimer: 0
                    }
                });
            } else {
                console.log("Couldn't spawn Explorer");
            }
        } else {
            console.log("Enough Explorers exist");
        }
    }
};

module.exports = spawnCreeps;