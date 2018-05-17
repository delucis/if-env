const child = require('child_process')
const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('expect')
const path = require('path')

const run = function (args) {
  const bin = path.join(__dirname, '../bin/if-env.js')
  return child.spawnSync(bin, args)
}

describe('if-env', function () {
  describe('status', function () {
    describe('with no arguments', function () {
      it('should return 0', function () {
        expect(run().status).toBe(0)
      })
    })

    describe('with NODE_ENV=fake', function () {
      it('should return 1', function () {
        expect(run(['NODE_ENV=fake']).status).toBe(1)
      })
    })

    describe('with NODE_ENV=test', function () {
      it('should return 0', function () {
        expect(run(['NODE_ENV=test']).status).toBe(0)
      })

      describe('and DOES_NOT_EXIST=fake', function () {
        it('should return 1', function () {
          expect(run(['NODE_ENV=test", "DOES_NOT_EXIST=fake']).status).toBe(1)
        })
      })
    })

    describe('with NODE_ENV=*', function () {
      it('should return 0', function () {
        expect(run(['NODE_ENV=*']).status).toBe(0)
      })
    })

    describe('with NODE_ENV=*es*', function () {
      it('should return 0', function () {
        expect(run(['NODE_ENV=*es*']).status).toBe(0)
      })

      describe('and NODE_ENV=te*', function () {
        it('should return 0', function () {
          expect(run(['NODE_ENV=*es*', 'NODE_ENV=te*']).status).toBe(0)
        })
      })

      describe('and NODE_ENV=res*', function () {
        it('should return 1', function () {
          expect(run(['NODE_ENV=*es*', 'NODE_ENV=res*']).status).toBe(1)
        })
      })
    })

    describe('with NODE_ENV=!*', function () {
      it('should return 1', function () {
        expect(run(['NODE_ENV=!*']).status).toBe(1)
      })
    })

    describe('with NODE_ENV=!test', function () {
      it('should return 1', function () {
        expect(run(['NODE_ENV=!test']).status).toBe(1)
      })
    })
  })
})
