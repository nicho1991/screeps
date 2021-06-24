var GetCreepsByRole = (role) => {
    var CreepList = [];
        for (var creepname in Game.creeps){
        if (Game.creeps[creepname].memory.role === role){
        CreepList.push(Game.creeps[creepname]);
        }
    }
    return CreepList
}

exports.GetCreepsByRole = GetCreepsByRole