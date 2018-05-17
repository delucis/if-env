# @delucis/if-env

> Simplify npm scripts with `if-env ... && npm run this || npm run that`

This is a fork of Eric Clemmons’s [`if-env`](https://github.com/ericclemmons/if-env). It allows you to match environment variables using Sindre Sorhus’s [`matcher`](https://github.com/sindresorhus/matcher) rather than using simple string equality.

## Installation

```sh
npm install --save @delucis/if-env
```

## Usage

If you want to to run an NPM script conditionally, depending on the value of environment variables, you can use `if-env` in your `package.json`.

In this example, we only want to run our `test` script when the `SOME_VAR` variable starts with “new”:

```json
"scripts": {
  "test": "if-env SOME_VAR=new* && npm run test-suite"
}
```

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
  "joy": "if-env MOOD=!happy && echo 😭 || echo 😄"
}
```
