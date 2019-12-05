const fs = require('fs')

exports.makeIntcode = makeIntcode
exports.makeIntcodeFromFile = makeIntcodeFromFile
exports.findInputsForTarget = findInputsForTarget

/**
 *
 * @param {number[]} intcode The input program
 * @returns {number[]} the corrected program
 */
function makeIntcode (intcode) {
  let i = 0
  let previousIntcode
  while (intcode) {
    previousIntcode = intcode
    intcode = processFour(intcode, i)
    i += 4
  }
  return previousIntcode
}

/**
 *
 * @param {string} inputFile The source of the input file
 * @param {Function} cb A callback with the result intcode
 */
function makeIntcodeFromFile (inputFile, replacements, cb) {
  if (typeof replacements === 'function') {
    cb = replacements
    replacements = null
  }
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) cb(err)
    data = data.split(',').map(n => parseInt(n, 10))
    if (replacements) {
      for (const replace in replacements) {
        data[replace] = replacements[replace]
      }
    }
    cb(null, makeIntcode(data))
  })
}

/**
 *
 * @param {string} inputFile The source file
 * @param {number} target The number to search for
 * @param {Function} cb The callback with resulting noun and verb
 */
function findInputsForTarget (inputFile, target, cb) {
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) cb(err)
    data = data.split(',').map(n => parseInt(n, 10))
    for (let noun = 0; noun < 100; noun++) {
      for (let verb = 0; verb < 100; verb++) {
        const copy = Object.assign([], data)
        copy[1] = noun
        copy[2] = verb
        const intcode = makeIntcode(copy)[0]
        if (intcode === target) {
          cb(null, [noun, verb])
          return
        }
      }
    }
    cb(new Error('No input possible'))
  })
}

function processFour (source, index) {
  if (Array.isArray(source) && source.length >= 1) {
    let result
    const opcode = source[index]
    const input1 = source[index + 1]
    const input2 = source[index + 2]
    const output = source[index + 3]

    if (opcode === 1) {
      result = source[input1] + source[input2]
      source[output] = result
    }
    if (opcode === 2) {
      result = source[input1] * source[input2]
      source[output] = result
    }
    if (opcode === 99) {
      return null
    }
    return source
  }
}
