const HARVESTER = 'harvester';
const HARVESTER_MOVE_COLOR = '#ffaa00';
const HARVESTER_PER_SOURCE = 1;
const HARVESTER_SPAWN_ENERGY_REQUIREMENT = 200;
const HARVESTER_ATTRIBUTES = [WORK, CARRY, MOVE];

var MyRooms = () => {
    var RoomList = [];
    for (var roomName in Game.rooms){
        if (Game.rooms[roomName]){
            RoomList.push(Game.rooms[roomName]);
        }
    }
    return RoomList
}

var GetMyHarvesters = (myCreepsInRoom) => {
    var CreepList = [];
        for (var creepname in myCreepsInRoom){
        if (myCreepsInRoom[creepname].memory.role === HARVESTER){
        CreepList.push(myCreepsInRoom[creepname]);
        }
    }
    return CreepList
}

var SpawnHarvesters = (harvesters, spawn, roomSources) => {
    if (harvesters.length < (roomSources.length * HARVESTER_PER_SOURCE) && (spawn.room.energyAvailable > HARVESTER_SPAWN_ENERGY_REQUIREMENT)) {
        var havesterNumber = harvesters.length

        console.log('spawning harvester: ' + havesterNumber + ' in room: ' + spawn.room.name)
        spawn.spawnCreep(HARVESTER_ATTRIBUTES, 'Harvester' + havesterNumber, {
            memory: {role: HARVESTER, source: roomSources[havesterNumber % roomSources.length].id}
        });
    }
}

var MoveToSource = (creep) => {
    var source = Game.getObjectById(creep.memory.source)
    var hostiles = creep.room.find(FIND_HOSTILE_CREEPS)[0]
    if (hostiles && hostiles.pos.isNearTo(source)) {
        console.log('Creep ' + creep.name + ' source is near hostile.. waiting')
    }
    else if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: HARVESTER_MOVE_COLOR}});
    }
};

var MoveToSpawn = (creep, spawn) => {
    if( creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ) {
        creep.moveTo(spawn, {visualizePathStyle: {stroke: HARVESTER_MOVE_COLOR}});
    }
};

// could need an upgrade to find closests spawn
var HarvestersFarm = (harvesters, collectionSpawn) => {
    harvesters.forEach(creep => {
        if (creep.store.getFreeCapacity() > 0) {
            MoveToSource(creep)
        }
        else {
            MoveToSpawn(creep, collectionSpawn)
        }
    })
}
 
var ManageHarvesters = () => {
    var rooms =  MyRooms()
    rooms.forEach((room) => {
        var roomSources = room.find(FIND_SOURCES)
        var myCreepsInRoom = room.find(FIND_MY_CREEPS)
        var harvesters = GetMyHarvesters(myCreepsInRoom)
        var mySpawns = room.find(FIND_MY_SPAWNS)


        SpawnHarvesters(harvesters, mySpawns[0], roomSources)
        HarvestersFarm(harvesters, mySpawns[0])
    })
}

exports.ManageHarvesters = ManageHarvesters