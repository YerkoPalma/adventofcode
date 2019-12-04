#!/usr/bin/env node

const { calculateFromInput, calculateFromInputRecursive } = require('./')
let path

if (process.argv.length === 3) {
  path = process.argv[2]
  calculateFromInput(path, (err, fuel) => {
    if (err) console.error(err)
    console.log(fuel)
  })
}

if (process.argv.length === 4 && process.argv[2] === '-r') {
  path = process.argv[3]
  calculateFromInputRecursive(path, (err, fuel) => {
    if (err) console.error(err)
    console.log(fuel)
  })
}
