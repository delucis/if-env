#!/usr/bin/env node

const parse = require('querystring').parse
const conditions = process.argv.slice(2)
const query = conditions.join('&')
const expected = parse(query)
const match = require('matcher').isMatch

for (const name in expected) {
  const patterns = Array.isArray(expected[name]) ? expected[name] : [expected[name]]
  patterns.forEach(pattern => {
    if (!match(process.env[name], pattern)) process.exit(1)
  })
}

process.exit(0)
