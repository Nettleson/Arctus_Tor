var roleBuilder = {
    run: function(creep) {
      //Determine if the Builder needs to harvest or build
	    if(creep.memory.isBuilding && creep.carry.energy == 0) {
            creep.memory.isBuilding = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.isBuilding && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.isBuilding = true;
	        creep.say('🚧 build');
	    }
      //Find the next site to build or harvest site
	    if(creep.memory.isBuilding) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else {
              //If there is nothing left to build, go back to being a harvester
              creep.memory.role = 'harvester';
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }

	}
};

module.exports = roleBuilder;
