var moveToSource = (creep) => {
    var source = Game.getObjectById(creep.memory.source)
    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
};

var moveToSpawn = (creep) => {
    if( creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
        creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
};

function GetCreepsByRole(role){
    var CreepList = [];
        for (var creepname in Game.creeps){
        if (Game.creeps[creepname].memory.role == role){
        CreepList.push(Game.creeps[creepname]);
        }
    }
    return CreepList
}

module.exports.loop = function () {
    require('version')

    if(!Memory.SCRIPT_VERSION || Memory.SCRIPT_VERSION != SCRIPT_VERSION) {
        Memory.SCRIPT_VERSION = SCRIPT_VERSION
        console.log('New code uplodated')
    }

    var harvesters = GetCreepsByRole("harvester")
    var spawn = Game.spawns["Spawn1"]
    var listSources = spawn.room.find(FIND_SOURCES)
    if (harvesters.length < listSources.length * 2 && spawn.room.energyAvailable > 200 ) {  // spawn harvester if none left
        var havesterNumber = harvesters.length

        spawn.spawnCreep([WORK, CARRY, MOVE], 'Harvester' + havesterNumber, {
            memory: {role: 'harvester', source: listSources[havesterNumber % listSources.length].id}
        });
    }

    harvesters.forEach(creep => {
        if (creep.store.getFreeCapacity() > 0) {
            moveToSource(creep)
        }
        else {
            moveToSpawn(creep)
        }
    })



}