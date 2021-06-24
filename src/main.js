const MOVEMENT = require('./helpers_Movement')
const CREEPS = require('./helpers_Creeps')
const CONSTANTS = require('Constants');
module.exports.loop = function () {
    require('version')
    if(!Memory.SCRIPT_VERSION || Memory.SCRIPT_VERSION !== SCRIPT_VERSION) {
        Memory.SCRIPT_VERSION = SCRIPT_VERSION
        console.log('New code uplodated')
    }

    var harvesters = CREEPS.GetCreepsByRole(CONSTANTS.ROLES.HARVESTER)
    var spawn = Game.spawns["Spawn1"]
    var listSources = spawn.room.find(FIND_SOURCES)
    if (harvesters.length < listSources.length * 2 && spawn.room.energyAvailable > 200 ) {  // spawn harvester if none left
        var havesterNumber = harvesters.length

        console.log('spawning harvester: ' + havesterNumber)
        spawn.spawnCreep([WORK, CARRY, MOVE], 'Harvester' + havesterNumber, {
            memory: {role: CONSTANTS.ROLES.HARVESTER, source: listSources[havesterNumber % listSources.length].id}
        });
    }

    harvesters.forEach(creep => {
        if (creep.store.getFreeCapacity() > 0) {
            MOVEMENT.moveToSource(creep)
        }
        else {
            MOVEMENT.moveToSpawn(creep, Game.spawns['Spawn1'])
        }
    })



}