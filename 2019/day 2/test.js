const test = require('tape')
const path = require('path')
const { makeIntcode, makeIntcodeFromFile, findInputsForTarget } = require('./')

test('makeIntcode', function (t) {
  t.plan(4)

  t.deepEqual(makeIntcode([1, 0, 0, 0, 99]), [2, 0, 0, 0, 99])
  t.deepEqual(makeIntcode([2, 3, 0, 3, 99]), [2, 3, 0, 6, 99])
  t.deepEqual(makeIntcode([2, 4, 4, 5, 99, 0]), [2, 4, 4, 5, 99, 9801])
  t.deepEqual(makeIntcode([1, 1, 1, 4, 99, 5, 6, 0, 99]), [30, 1, 1, 4, 2, 5, 6, 0, 99])
})

test('makeIntcodeFromFile', function (t) {
  t.plan(2)

  makeIntcodeFromFile(path.join(__dirname, 'input.test.txt'), (err, intcode) => {
    t.error(err)
    t.deepEqual(intcode, [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50])
  })
})

test('findInputsForTarget', function (t) {
  t.plan(2)

  findInputsForTarget(path.join(__dirname, 'input.txt'), 3166704, (err, nounAndVerb) => {
    t.error(err)
    t.deepEqual(nounAndVerb, [12, 2])
  })
})
