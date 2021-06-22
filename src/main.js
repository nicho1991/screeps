module.exports.loop = function () {
    require('version')
    if(!Memory.SCRIPT_VERSION || Memory.SCRIPT_VERSION != SCRIPT_VERSION) {
        Memory.SCRIPT_VERSION = SCRIPT_VERSION
        console.log('New code uplodated')
    }
    var harvesters = harvesters = _(Game.creeps).filter({ memory: { role: 'harvester' }})
    if (harvesters.size() < 1) {  // spawn harvester if none left
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker1', {
            memory: {role: 'harvester'}
        });
    }
    
}