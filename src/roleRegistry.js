// Role Registry — single source of truth for each creep role: its body parts, how many
// are wanted, whether it's allowed to spawn right now, and its behavior (`run`).
// main.js and roleLib.js consume this table generically, so adding or tuning a role only
// means editing its entry here.
//
// Entry shape:
//   name         display name used in creep names / logs
//   run          the role's per-tick behavior function
//   parts        array of body-part arrays, ordered most to least expensive; the first one
//                affordable at the room's current energyCapacityAvailable is used
//   scope        'room' (default) - needed/spawned counts are per home room
//                'claimable'      - targets mapLib's next claimable room instead of home room
//                'global'         - needed/spawned counts are game-wide, not per room
//   needed(ctx)  returns how many of this role are wanted
//   canSpawn(ctx) [optional] extra gate beyond the needed/spawned count
//   gate()       [optional] whole-role on/off switch, checked before anything else
//   extraMemory(ctx) [optional] extra creep.memory fields to set on spawn

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

var mapLib = require('mapLib');

module.exports = {

    harvester: {
        name: 'Harvester',
        run: roleHarvester.run,
        parts: [
            [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            [WORK, CARRY, MOVE, MOVE]
        ],
        needed: function () { return 3; },
    },

    upgrader: {
        name: 'Upgrader',
        run: roleUpgrader.run,
        parts: [
            [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
            [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
            [WORK, CARRY, MOVE, MOVE]
        ],
        needed: function (ctx) { return ctx.room.controller.level < 8 ? 3 : 2; },
        canSpawn: function (ctx) { return ctx.harvesterCount > 0; },
        extraMemory: function (ctx) {
            var energy = ctx.room.energyAvailable;
            var clevel = energy >= 1200 ? '3' : energy >= 800 ? '2' : energy >= 500 ? '1' : '0';
            return { clevel: clevel };
        },
    },

    builder: {
        name: 'Builder',
        run: roleBuilder.run,
        parts: [
            [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
            [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
            [WORK, CARRY, MOVE, MOVE]
        ],
        needed: function (ctx) {
            var sites = ctx.room.find(FIND_CONSTRUCTION_SITES).length;
            return sites > 4 ? 4 : sites > 0 ? 2 : 0;
        },
        canSpawn: function (ctx) { return ctx.harvesterCount > 0; },
    },

    repairer: {
        name: 'Repairer',
        run: roleRepairer.run,
        parts: [
            [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            [WORK, CARRY, MOVE, MOVE]
        ],
        needed: function () { return 3; },
    },

    defender: {
        name: 'Defender',
        run: roleDefender.run,
        parts: [
            [CARRY, CARRY, MOVE, MOVE, ATTACK, HEAL, HEAL, TOUGH, TOUGH],
            [CARRY, ATTACK, MOVE, MOVE, MOVE, TOUGH]
        ],
        needed: function () { return 0; },
    },

    attacker: {
        name: 'Attacker',
        run: roleAttacker.run,
        parts: [
            [ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE],
            [ATTACK, TOUGH, MOVE, MOVE]
        ],
        needed: function () { return 0; },
    },

    notifier: {
        name: 'Notifier',
        run: roleNotifier.run,
        parts: [
            [MOVE, MOVE]
        ],
        scope: 'global',
        needed: function () { return 1; },
    },

    filler: {
        name: 'Filler',
        run: roleFiller.run,
        parts: [
            [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
            [CARRY, CARRY, MOVE, MOVE]
        ],
        needed: function (ctx) {
            var links = ctx.room.find(FIND_STRUCTURES, {
                filter: function (s) { return s.structureType === STRUCTURE_LINK || s.structureType === STRUCTURE_STORAGE; }
            });
            if (links.length === 0) return 0;
            return ctx.room.controller.level > 5 ? 2 : 1;
        },
        canSpawn: function (ctx) { return ctx.harvesterCount > 0; },
    },

    explorer: {
        name: 'Explorer',
        run: roleExplorer.run,
        parts: [
            [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            [WORK, CARRY, MOVE, MOVE]
        ],
        scope: 'global',
        gate: function () { return mapLib.getUnvisitedRooms().length > 0; },
        needed: function () { return mapLib.getGCLClaimsAvailable() || 1; },
    },

    claimer: {
        name: 'Claimer',
        run: roleClaimer.run,
        parts: [
            [CLAIM, MOVE, MOVE]
        ],
        scope: 'claimable',
        needed: function () { return mapLib.getGCLClaimsAvailable() / 2; },
        canSpawn: function (ctx) {
            return ctx.harvesterCount > 0 && ctx.targetRoom !== undefined && !ctx.targetRoom.controller.my;
        },
        extraMemory: function (ctx) { return { room_spawn: ctx.room.name }; },
    },

    // Disabled (needed stays 0) until the destination room actually needs an external
    // harvester - bump `needed` above 0 to turn it back on.
    harvester_external: {
        name: 'Harvester_Ex',
        run: roleHarvesterExternal.run,
        parts: [
            [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
        ],
        scope: 'claimable',
        needed: function () { return 0; },
        extraMemory: function (ctx) { return { room_spawn: ctx.room.name, flag_dest_x: '25', flag_dest_y: '25' }; },
    },

    // Disabled (needed stays 0) until an owned room hits RCL 6 and mineral hauling is
    // wanted - bump `needed` above 0 to turn it back on. canSpawn creates the extractor
    // construction site once the room qualifies, same as before.
    harvester_mineral: {
        name: 'HarvesterM',
        run: roleHarvesterMineral.run,
        parts: [
            [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        ],
        needed: function () { return 0; },
        canSpawn: function (ctx) {
            if (ctx.room.controller.level < 6) return false;

            var minerals = ctx.room.find(FIND_MINERALS);
            var extractor = ctx.room.find(FIND_STRUCTURES, {
                filter: function (s) { return s.structureType === STRUCTURE_EXTRACTOR; }
            });
            if (extractor.length === 0 && minerals.length > 0) {
                ctx.room.createConstructionSite(minerals[0].pos, STRUCTURE_EXTRACTOR);
            }

            var storage = ctx.room.storage;
            var storageHasSpace = storage ? storage.store.getFreeCapacity() > 0 : false;

            return ctx.harvesterCount > 0 && extractor.length > 0 && minerals.length > 0
                && minerals[0].mineralAmount > 0 && storageHasSpace;
        },
        extraMemory: function (ctx) { return { room_spawn: ctx.room.name, flag_dest_x: '28', flag_dest_y: '11' }; },
    },
};
