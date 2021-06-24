const MOVEMENT = require('./Movement');
const CONSTANTS = require('./Constants');
var GetCreepsByRole = (role) => {
    var CreepList = [];
        for (var creepname in Game.creeps){
        if (Game.creeps[creepname].memory.role === role){
        CreepList.push(Game.creeps[creepname]);
        }
    }
    return CreepList
}

var SpawnHarvesters = (harvesters, spawn) => {
    var listSources = spawn.room.find(FIND_SOURCES)
    if (harvesters.length < listSources.length * 2 && spawn.room.energyAvailable > 200 ) {  // spawn harvester if none left
        var havesterNumber = harvesters.length

        console.log('spawning harvester: ' + havesterNumber)
        spawn.spawnCreep([WORK, CARRY, MOVE], 'Harvester' + havesterNumber, {
            memory: {role: CONSTANTS.ROLES.HARVESTER, source: listSources[havesterNumber % listSources.length].id}
        });
    }
}

var HarvestersFarm = (harvesters) => {
    harvesters.forEach(creep => {
        if (creep.store.getFreeCapacity() > 0) {
            MOVEMENT.moveToSource(creep)
        }
        else {
            MOVEMENT.moveToSpawn(creep, Game.spawns['Spawn1'])
        }
    })
}

exports.GetCreepsByRole = GetCreepsByRole
exports.SpawnHarvesters = SpawnHarvesters
exports.HarvestersFarm = HarvestersFarm