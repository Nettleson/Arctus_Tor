module.exports = {
    checkNeedCreeps: function() {
        //Build variables
        var NUM_HARVESTERS = 4;
        var HARVESTER_BUILD = [WORK, CARRY, MOVE];

        var NUM_BUILDERS = 2;
        var BUILDER_BUILD = [WORK, CARRY, MOVE];

        // If the Spawn1 is currently spawning something, print it out
        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }else {
            //Check the number of harvesters available
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            if(harvesters.length < NUM_HARVESTERS) {
                var newName = 'Harvester' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'harvester'}});
            }
            //Check the number of builders available
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            if(builders.length < NUM_BUILDERS) {
                var newName = 'Builder' + Game.time;
                console.log('Spawning new builder: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'builder'}});
            }
        }
    }
};
