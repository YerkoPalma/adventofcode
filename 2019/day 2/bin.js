#!/usr/bin/env node

const { makeIntcodeFromFile } = require('./')
let path

/**
 * replace position 1 with the value 12 and replace position 2 with the value 2
 */
if (process.argv.length === 3) {
  path = process.argv[2]
  makeIntcodeFromFile(path, { 1: 12, 2: 2 }, (err, intcode) => {
    if (err) console.error(err)
    console.log(intcode[0])
  })
}

// if (process.argv.length === 4 && process.argv[2] === '-r') {
//   path = process.argv[3]
//   calculateFromInputRecursive(path, (err, fuel) => {
//     if (err) console.error(err)
//     console.log(fuel)
//   })
// }
