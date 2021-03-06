const test = require('tape')
const path = require('path')
const { calculateFuel, calculateFromInput, calculateFuelRecursive, calculateFromInputRecursive } = require('./')

test('calculateFuel', function (t) {
  t.plan(4)

  t.equal(calculateFuel(12), 2)
  t.equal(calculateFuel(14), 2)
  t.equal(calculateFuel(1969), 654)
  t.equal(calculateFuel(100756), 33583)
})

test('calculateFromInput', function (t) {
  t.plan(2)

  calculateFromInput(path.join(__dirname, 'input.test.txt'), (err, fuel) => {
    t.error(err)
    t.equal(fuel, 658)
  })
})

test('calculateFuelRecursive', function (t) {
  t.plan(3)

  t.equal(calculateFuelRecursive(14), 2)
  t.equal(calculateFuelRecursive(1969), 966)
  t.equal(calculateFuelRecursive(100756), 50346)
})

test('calculateFromInputRecursive', function (t) {
  t.plan(2)

  calculateFromInputRecursive(path.join(__dirname, 'input.test.txt'), (err, fuel) => {
    t.error(err)
    t.equal(fuel, 970)
  })
})
