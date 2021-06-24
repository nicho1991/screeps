const CONSTANTS = require('Constants');
var moveToSource = (creep) => {
    var source = Game.getObjectById(creep.memory.source)
    if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: CONSTANTS.COLORS.MOVE}});
    }
};

var moveToSpawn = (creep, spawn) => {
    if( creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ) {
        creep.moveTo(spawn, {visualizePathStyle: {stroke: CONSTANTS.COLORS.MOVE}});
    }
};

exports.moveToSource = moveToSource;
exports.moveToSpawn = moveToSpawn