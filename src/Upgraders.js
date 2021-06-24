const UPGRADER = 'upgrader';
const UPGRADER_MOVE_COLOR = '#ffaa00';
const UPGRADER_PER_ROOM = 1;
const UPGRADER_SPAWN_ENERGY_REQUIREMENT = 300;
const UPGRADER_ATTRIBUTES = [WORK, CARRY, MOVE];

var MyRooms = () => {
    var RoomList = [];
    for (var roomName in Game.rooms){
        if (Game.rooms[roomName]){
            RoomList.push(Game.rooms[roomName]);
        }
    }
    return RoomList
}

var GetMyUpgraders = (myCreepsInRoom) => {
    var CreepList = [];
        for (var creepname in myCreepsInRoom){
        if (myCreepsInRoom[creepname].memory.role === UPGRADER){
        CreepList.push(myCreepsInRoom[creepname]);
        }
    }
    return CreepList
}

var SpawnUpgraders = (upgraders, spawn, roomSources) => {
    if (upgraders.length < (UPGRADER_PER_ROOM) && (spawn.room.energyAvailable >= UPGRADER_SPAWN_ENERGY_REQUIREMENT)) {
        var upgraderNumber = upgraders.length

        console.log('spawning upgrader: ' + upgraderNumber + ' in room: ' + spawn.room.name)
        spawn.spawnCreep(UPGRADER_ATTRIBUTES, 'Upgrader' + upgraderNumber, {
            memory: {role: UPGRADER, source: roomSources[upgraderNumber % roomSources.length].id}
        });
    }
}

/*
var MoveToSource = (creep) => {
    var source = Game.getObjectById(creep.memory.source)
    if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: UPGRADER_MOVE_COLOR}});
    }
};

var MoveToSpawn = (creep, spawn) => {
    if( creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ) {
        creep.moveTo(spawn, {visualizePathStyle: {stroke: UPGRADER_MOVE_COLOR}});
    }
};
*/

// could need an upgrade to find closests spawn

var UpgradeRoomController = (upgraders, controller, spawn, room) => {
 
    upgraders.forEach(creep => {
        if (creep.store.getUsedCapacity() === 0 ) {
            creep.moveTo(spawn, {visualizePathStyle: {stroke: UPGRADER_MOVE_COLOR}})
            if (room.energyAvailable > 250)
                creep.withdraw(spawn, RESOURCE_ENERGY, 50)
        } else {
            creep.moveTo(controller, {visualizePathStyle: {stroke: UPGRADER_MOVE_COLOR}})
            creep.upgradeController(controller)
        }


    })
}

 
var ManageUpgraders = () => {
    var rooms =  MyRooms()
    rooms.forEach((room) => {
        var roomSources = room.find(FIND_SOURCES)
        var myCreepsInRoom = room.find(FIND_MY_CREEPS)
        var upgraders = GetMyUpgraders(myCreepsInRoom)
        var mySpawns = room.find(FIND_MY_SPAWNS)

        SpawnUpgraders(upgraders, mySpawns[0], roomSources)
        UpgradeRoomController(upgraders, room.controller, mySpawns[0], room)
    })
}

exports.ManageUpgraders = ManageUpgraders