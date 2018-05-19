# @delucis/if-env


[![latest npm release version](https://img.shields.io/npm/v/@delucis/if-env.svg)](https://www.npmjs.com/package/@delucis/if-env) [![Build Status](https://travis-ci.com/delucis/if-env.svg?branch=master)](https://travis-ci.com/delucis/if-env) [![Coverage Status](https://coveralls.io/repos/github/delucis/if-env/badge.svg?branch=master)](https://coveralls.io/github/delucis/if-env?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/delucis/if-env.svg)](https://greenkeeper.io/) ![npms.io package score](https://badges.npms.io/%40delucis%2Fif-env.svg)

> Run an npm script if an environment variable matches a pattern

This is a fork of Eric Clemmons’s [`if-env`](https://github.com/ericclemmons/if-env). It allows you to match environment variables using wildcards (`*`) rather than using simple string equality. See Sindre Sorhus’s [`matcher`](https://github.com/sindresorhus/matcher) for details about how the matching works.

## Installation

```
npm install --save @delucis/if-env
```

## Usage

This package installs `if-env`, a script which lets you easily match environment variable values against a pattern using wildcards. It also includes `if-env-cs`, which is [case sensitive](#case-sensitivity).

If you want to to run an NPM script conditionally, depending on the value of an environment variable, you can use `if-env` in your `package.json`. In this example, we only want to run our `test` script when the `SOME_VAR` variable starts with `new`:

```json
"scripts": {
  "test": "if-env SOME_VAR=new* && npm run test-suite"
}
```

### Multiple conditions

If you want several conditions to be met you can pass them all to `if-env`:

```json
"scripts": {
  "yay": "if-env VAR1=woo* VAR2=*hoo && echo yay"
}
```

If you want to run a script if either one or another condition is met, you can use the `||` operator:

```json
"scripts": {
  "moo": "if-env ANIMAL=cow || if-env ANIMAL=bull* && echo moo"
}
```

If you want to do different things depending on the value of a variable, you can also use the `||` operator:

```json
"scripts": {
  "joy": "if-env MOOD=happy && echo 😄 || echo 😭"
}
```

### Negating conditions

If you want to do something if a variable does **_not_** match a pattern, you have two options. Note the single quotes in the first example; they escape `!` for your shell.

```json
"scripts": {
  "ifenv": "if-env MOOD='!happy' && echo 😭",
  "shell": "if-env MOOD=happy || echo 😭"
}
```

### Escaping characters

If you need to have spaces in your pattern, make sure you wrap it in quotes:

```json
"scripts": {
  "spacious": "if-env SENTENCE='I want * spaces.' && echo You get spaces!"
}
```

### Case sensitivity

`if-env` is case insensitive, which means `if-env VAR=foo` will match both `foo` and `FOO`. If you need to test a variable and case is important, use the `if-env-cs` command:

```json
"scripts": {
  "case": "if-env-cs WORD=lower && echo nice! || echo STOP SHOUTING!"
}
```
