const parse = require('querystring').parse
const match = require('matcher').isMatch

module.exports = function ifEnv ({ caseSensitive = false } = {}) {
  const conditions = process.argv.slice(2)
  const query = conditions.join('&')
  const expected = parse(query)

  for (const name in expected) {
    const patterns = Array.isArray(expected[name]) ? expected[name] : [expected[name]]
    patterns.forEach(pattern => {
      if (!match(process.env[name], pattern, { caseSensitive })) {
        process.exit(1)
      }
    })
  }

  process.exit(0)
}
