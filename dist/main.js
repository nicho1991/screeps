var moveToSource = (creep) => {
    var sources = creep.room.find(FIND_SOURCES);
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
    }
};

var moveToSpawn = (creep) => {
    if( creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
        creep.moveTo(Game.spawns['Spawn1']);
    }
};

module.exports.loop = function () {
    require('version')
    if(!Memory.SCRIPT_VERSION || Memory.SCRIPT_VERSION != SCRIPT_VERSION) {
        Memory.SCRIPT_VERSION = SCRIPT_VERSION
        console.log('New code uplodated')
    }

    var harvesters = harvesters = _(Game.creeps).filter({ memory: { role: 'harvester' }}) as Creep[]
    if (harvesters.size() < 1) {  // spawn harvester if none left
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker1', {
            memory: {role: 'harvester'}
        });
    }
    harvesters.each
    var creep = Game.creeps['Harvester1'];

    if(creep.store.getFreeCapacity() > 0) {
        moveToSource(creep)
    }
    else {
        moveToSpawn(creep)
    }


    
}