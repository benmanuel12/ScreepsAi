var target_count = 0;
var hitsRepair_2 = 50000;

var roleRepairer = {

    run: function (creep) {

        if (creep.memory.building && creep.store.getUsedCapacity([RESOURCE_ENERGY]) === 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.store.getUsedCapacity([RESOURCE_ENERGY]) === creep.store.getCapacity([RESOURCE_ENERGY])) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType === STRUCTURE_WALL && structure.hits < 3000) || (structure.structureType === STRUCTURE_ROAD && structure.hits < 500) || structure.structureType === STRUCTURE_CONTAINER || (structure.structureType === STRUCTURE_RAMPART && structure.hits < 30000)) &&
                        structure.hits < structure.hitsMax;
                }
            });

            if (targets.length) {
                //console.log(targets[target_count].hits);
                if (targets[target_count].hits < hitsRepair_2) {
                    if (creep.repair(targets[target_count]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[target_count], {visualizePathStyle: {stroke: '#00FF00'}});
                    }
                } else {
                    target_count += 1;
                    if (target_count === targets.length) {
                        target_count = 0;
                    }
                }

            } else {
                var flag = Game.flags.Flag1;
                creep.moveTo(flag, {visualizePathStyle: {stroke: '#00FF00'}});
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE && creep.harvest(sources[0]) !== ERR_NO_PATH) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#00FF00'}});
            } else if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#00FF00'}});
            }
        }
    }
};

module.exports = roleRepairer;