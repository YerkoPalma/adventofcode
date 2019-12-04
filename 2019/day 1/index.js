const fs = require('fs')

exports.calculateFuel = calculateFuel
exports.calculateFuelRecursive = calculateFuelRecursive
exports.calculateFromInput = calculateFromInputFactory(calculateFuel)
exports.calculateFromInputRecursive = calculateFromInputFactory(calculateFuelRecursive)

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
  const fuel = Math.floor(mass / 3) - 2
  return fuel > 0 ? fuel : 0
}

/**
 *
 * @param {number} mass Initial mass
 */
function calculateFuelRecursive (mass) {
  if (mass <= 0) return 0
  const currentFuel = calculateFuel(mass)
  return currentFuel + calculateFuelRecursive(currentFuel)
}

/**
 *
 * @param {string} fn The function to run on each line of the file
 * @returns {Function}
 */
function calculateFromInputFactory (fn) {
  return (input, cb = console.log) => {
    fs.readFile(input, 'utf8', (err, data) => {
      if (err) cb(err)
      let totalFuel = 0
      for (const moduleMass of data.split('\n')) {
        totalFuel += fn(moduleMass)
      }
      cb(null, totalFuel)
    })
  }
}
