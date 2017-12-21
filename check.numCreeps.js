module.exports = {
    checkNeedCreeps: function() {
        //Colony Constants - Harvesters and Builders have equal builds
        var NUM_HARVESTERS = 2;
        var HARVESTER_BUILD = [WORK, CARRY, MOVE];
        var NUM_BUILDERS = 0;
        var BUILDER_BUILD = [WORK, CARRY, MOVE];

        var FIRST_SPAWN = Game.spawns['Spawn1'];
        var minEnergyNeed = 200;

        // If the Spawn1 is currently spawning something, print it out
        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }else {
            //Check if there are sufficient resources to build something
            if(FIRST_SPAWN.energy < minEnergyNeed){
              return;
            }
            //Check the number of harvesters available
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            if((harvesters.length + builders.length) < NUM_HARVESTERS) {
                var newName = 'Harvester' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'harvester', number: harvesters.length + 1}});
            }
            /*
            //Check the number of builders available
            if(builders.length < NUM_BUILDERS) {
                var newName = 'Builder' + Game.time;
                console.log('Spawning new builder: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                   {memory: {role: 'builder', number: builders.length + 1, isBuilding: false}});
            }
            */
        }
    }
};
