const CREEPS = require('./Creeps')
const CONSTANTS = require('./Constants');
module.exports.loop = function () {
    require('Version')
    if(!Memory.SCRIPT_VERSION || Memory.SCRIPT_VERSION !== SCRIPT_VERSION) {
        Memory.SCRIPT_VERSION = SCRIPT_VERSION
        console.log('New code uplodated')
    }

    var harvesters = CREEPS.GetCreepsByRole(CONSTANTS.ROLES.HARVESTER)
    var spawn = Game.spawns["Spawn1"]

    CREEPS.SpawnHarvesters(harvesters, spawn)
    CREEPS.HarvestersFarm(harvesters)
}