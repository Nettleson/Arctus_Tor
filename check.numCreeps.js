module.exports = {
    checkNeedCreeps: function() {
        //Colony Constants - Harvesters and Builders have equal builds
        let FIRST_SPAWN = Game.spawns['Spawn1'];
        let TOTAL_HARVESTERS_PER_SOURCE = 2;
        let TOTAL_SOURCES = FIRST_SPAWN.room.find(FIND_SOURCES).length;

        //Unit Build Numbers
        let TOTAL_HARVESTERS = TOTAL_HARVESTERS_PER_SOURCE * TOTAL_SOURCES;

        //Unit Builds
        let HARVESTER_BUILD = [WORK, CARRY, MOVE];
        let BUILDER_BUILD = [WORK, CARRY, MOVE];

        let minEnergyNeed = 200;

        // If the Spawn1 is currently spawning something, print it out
        if(FIRST_SPAWN.spawning) {
            var spawningCreep = Game.creeps[FIRST_SPAWN.spawning.name];
            FIRST_SPAWN.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                FIRST_SPAWN.pos.x + 1,
                FIRST_SPAWN.pos.y,
                {align: 'left', opacity: 0.8});
        }else {
            //Check if there are sufficient resources to build something
            if(FIRST_SPAWN.energy < minEnergyNeed){
              return;
            }
            //Check the number of harvesters available
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            if((harvesters.length + builders.length) < TOTAL_HARVESTERS) {
                var newName = 'Harvester' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                FIRST_SPAWN.spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'harvester', number: harvesters.length + 1, source: (TOTAL_SOURCES % (harvesters.length + 1)) }});
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
