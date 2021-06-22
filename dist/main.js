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

    var harvesters = GetCreepsByRole('harvester')
    if (harvesters.length < 1) {  // spawn harvester if none left
        console.log('spawning harvester')
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker1', {
            memory: {role: 'harvester'}
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