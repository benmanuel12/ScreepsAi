// Costs of creep parts
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

var roleLib = {

    // takes an array of creep part constants as parameter, returns the energy cost sum of those parts
    creepCost: function (parts) {
        let sum = 0;
        for (let part in parts) {
            sum = sum + costs.get(parts[part]);
        }
        return sum;
    },

    // Attempts to spawn a creep for the given role-registry entry. Assumes the caller has
    // already checked creepsSpawned < creepsNeeded and any role-specific canSpawn gate.
    spawnCreep: function (role, roleConfig, spawn, ctx) {
        let roomDestination = spawn.room;
        let partsToUse = [];
        let currentCost = 0;

        // Roles scoped to a claimable room head there; everything else stays in its home room
        let memory = { role: role, room_dest: ctx.targetRoomName || roomDestination.name };
        if (roleConfig.extraMemory) {
            memory = { ...memory, ...roleConfig.extraMemory(ctx) };
        }

        // Check each array of parts in turn (ordered most to least expensive) and use the
        // first one this room can afford at full energy capacity
        for (let index in roleConfig.parts) {
            currentCost = this.creepCost(roleConfig.parts[index]);
            if (currentCost <= roomDestination.energyCapacityAvailable) {
                partsToUse = roleConfig.parts[index];
                break;
            }
        }

        if (!partsToUse.length) {
            console.log("Can't afford to spawn " + roleConfig.name);
            return;
        }

        let name = roleConfig.name + "_" + roomDestination.name + "_" + Game.time;
        let errorCode = spawn.spawnCreep(partsToUse, name, { dryRun: true });

        if (errorCode === 0) {
            console.log("Spawning " + name);
            spawn.spawnCreep(partsToUse, name, { memory: memory });
        } else if (errorCode === -6) {
            console.log("Couldn't spawn " + roleConfig.name + " - " + roomDestination.energyAvailable + "/" + currentCost + " available (Limit: " + roomDestination.energyCapacityAvailable + ")");
        } else {
            console.log("Couldn't spawn " + roleConfig.name + " - Error: " + errorMap.get(errorCode.toString()));
        }
    },
};

module.exports = roleLib;
