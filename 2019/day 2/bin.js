#!/usr/bin/env node

const { makeIntcodeFromFile, findInputsForTarget } = require('./')
let path
let target

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

if (process.argv.length === 4) {
  path = process.argv[2]
  target = parseInt(process.argv[3], 10)
  findInputsForTarget(path, target, (err, nounAndVerb) => {
    if (err) console.error(err)
    console.log(nounAndVerb)
  })
}
