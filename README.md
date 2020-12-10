# [<img src=".github/Hac_k.svg">](https://abdfn-hac_k.github.io)
from [@abdfnx](https://github.com/abdfnx)

> CLI app messenger & helper

## Features

- Parses arguments
- Negates flags when using the `--no-` prefix
- Outputs version when `--version`
- Outputs description and supplied help text when `--help`
- Sets the process title to the binary name defined in package.json

## Install

```s
$ npm i hac_k
```

## Usage

```s
$ ./foo-app.js xbox --xbox
```

**CommonJS**

```js
#!/usr/bin/env node
"use strict";
const hac_k = require("hac_k");
const foo = require(".");

const cli = hac_k(
	`
	Usage
	  $ foo <input>

	Options
	  --xbox, -x  Include a xbox

	Examples
	  $ foo consoles --xbox
	  🎮 consoles 🎮
`,
	{
		flags: {
			xbox: {
				type: "boolean",
				alias: "x",
			},
		},
	}
);
/*
{
	input: ['consoles'],
	flags: {xbox: true},
	...
}
*/

foo(cli.input[0], cli.flags);
```

**ES Modules**

```js
#!/usr/bin/env node
import { createRequire } from "module";
import foo from "./lib/index.js";

const hac_k = createRequire(import.meta.url)("hac_k");

const cli = hac_k(
	`
	Usage
	  $ foo <input>

	Options
	  --xbox, -x  Include a xbox

	Examples
	  $ foo consoles --xbox
	  🎮 consoles 🎮
`,
	{
		flags: {
			xbox: {
				type: "boolean",
				alias: "x",
			},
		},
	}
);
/*
{
	input: ['consoles'],
	flags: {xbox: true},
	...
}
*/

foo(cli.input[0], cli.flags);
```

## API

### hac_k(helpText, options?)

### hac_k(options)

Returns an `object` with:

- `input` _(Array)_ - Non-flag arguments
- `flags` _(Object)_ - Flags converted to camelCase excluding aliases
- `unnormalizedFlags` _(Object)_ - Flags converted to camelCase including aliases
- `pkg` _(Object)_ - The `package.json` object
- `help` _(string)_ - The help text used with `--help`
- `showHelp([exitCode=2])` _(Function)_ - Show the help text and exit with `exitCode`
- `showVersion()` _(Function)_ - Show the version text and exit

#### helpText

Type: `string`

Shortcut for the `help` option.

#### options

Type: `object`

##### flags

Type: `object`

Define argument flags.

The key is the flag name and the value is an object with any of:

- `type`: Type of value. (Possible values: `string` `boolean` `number`)
- `alias`: Usually used to define a short flag alias.
- `default`: Default value when the flag is not specified.
- `isRequired`: Determine if the flag is required. (Default: false)
  - If it's only known at runtime whether the flag is required or not, you can pass a `Function` instead of a `boolean`, which based on the given flags and other non-flag arguments, should decide if the flag is required. Two arguments are passed to the function:
  - The first argument is the **flags** object, which contains the flags converted to camel-case excluding aliases.
  - The second argument is the **input** string array, which contains the non-flag arguments.
  - The function should return a `boolean`, true if the flag is required, otherwise false.

Example:

```js
flags: {
	xbox_ninja_cat: {
		type: 'string',
		alias: 'xnc',
		default: ['xbox', 'ninja_cat'],
		isMultiple: true,
		isRequired: (flags, input) => {
			if (flags.otherFlag) {
				return true;
			}

			return false;
		}
	}
}
```


**Caution: Explicitly specifying `undefined` for `booleanDefault` has different meaning from omitting key itself.**

Example:

```js
const hac_k = require("hac_k");

const cli = hac_k(
	`
	Usage
	  $ foo

	Options
	  --xbox, -x  Include xbox
	  --ninja_cat, -nc  Include a ninja_cat

	Examples
	  $ foo
	  🎮 consoles 🎮
`,
	{
		booleanDefault: undefined,
		flags: {
			xbox: {
				type: "boolean",
				default: true,
				alias: "x",
			},
			ninja_cat: {
				type: "boolean",
				default: false,
				alias: "nc",
			},
			football: {
				type: "boolean",
				alias: "f",
			},
		},
	}
);
/*
{
	flags: {
		xbox: true,
		ninja_cat: true,
		footbal: true
	},
	unnormalizedFlags: {
		xbox: true,
		x: true,
		ninja_cat: true,
		nc: true,
		f: true
	},
	…
}
*/
```

## Promises

hac_k will make unhandled rejected promises [fail hard](https://github.com/sindresorhus/hard-xejection) instead of the default silent fail. Meaning you don't have to manually `.catch()` promises used in your CLI.

---
