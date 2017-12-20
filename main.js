var cleanup = require('check.cleanup');
var numCreeps = require('check.numCreeps');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    // Do any clean up for names that is needed
    cleanup.runCleanUp();
    // Check if any new spawns are needed
    numCreeps.checkNeedCreeps();
    // Check for enemies - move above new spawns?

    // Run actions for each creep by role
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch(creep.memory.role){
            case 'harvester':
              roleHarvester.run(creep);
              break;
            case 'upgrader':
              roleUpgrader.run(creep);
              break;
            case 'builder':
              roleBuilder.run(creep);
              break;
            default:
              console.log("You assigned a new role and didn't handle it dumb dumb." + creep.memory.role);
              break;
        }

    }
}
