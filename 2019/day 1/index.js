const fs = require('fs')

exports.calculateFuel = calculateFuel
exports.calculateFromInput = calculateFromInput

/**
 *
 * @param {number | string} mass The mass of the module
 * @returns {number} The fuel for the module
 */
function calculateFuel (mass) {
  if (typeof mass === 'string') {
    mass = parseInt(mass, 10)
    if (isNaN(mass)) return 0
  }
  return Math.floor(mass / 3) - 2
}

/**
 *
 * @param {string} input The path of the input file
 * @param {*} cb A callback with the calculated fuel, console.log if not defined
 */
function calculateFromInput (input, cb = console.log) {
  fs.readFile(input, 'utf8', (err, data) => {
    if (err) cb(err)
    let totalFuel = 0
    for (const moduleMass of data.split('\n')) {
      totalFuel += calculateFuel(moduleMass)
    }
    cb(null, totalFuel)
  })
}
