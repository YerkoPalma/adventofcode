#!/usr/bin/env node

const { calculateFromInput } = require('./')

if (process.argv.length >= 2) {
  const path = process.argv[2]
  calculateFromInput(path)
}
