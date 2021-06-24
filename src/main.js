const harvesters = require('./Harvesters')
module.exports.loop = function () {
    require('Version')
    if(!Memory.SCRIPT_VERSION || Memory.SCRIPT_VERSION !== SCRIPT_VERSION) {
        Memory.SCRIPT_VERSION = SCRIPT_VERSION
        console.log('New code uplodated')
    }
    harvesters.ManageHarvesters();
}