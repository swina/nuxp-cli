nuxp-cli
========

nuxpresso cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/nuxp-cli.svg)](https://npmjs.org/package/nuxp-cli)
[![Downloads/week](https://img.shields.io/npm/dw/nuxp-cli.svg)](https://npmjs.org/package/nuxp-cli)
[![License](https://img.shields.io/npm/l/nuxp-cli.svg)](https://github.com/swina/nuxp-cli/blob/master/package.json)


**Requirement: YARN**

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g nuxp-cli
$ nuxp-cli COMMAND
running command...
$ nuxp-cli (-v|--version|version)
nuxp-cli/0.0.0 win32-x64 node-v12.18.3
$ nuxp-cli --help [COMMAND]
USAGE
  $ nuxp-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nuxp-cli config`](#nuxp-cli-config)
* [`nuxp-cli help [COMMAND]`](#nuxp-cli-help-command)
* [`nuxp-cli nuxpresso:new`](#nuxp-cli-nuxpressonew)
* [`nuxp-cli nuxpresso:verify`](#nuxp-cli-nuxpressoverify)

## `nuxp-cli config`

NUXPRESSO for Strapi CMS configuration

```
USAGE
  $ nuxp-cli config

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/config/index.js](https://github.com/swina/nuxp-cli/blob/v0.0.0/src/commands/config/index.js)_

## `nuxp-cli help [COMMAND]`

display help for nuxp-cli

```
USAGE
  $ nuxp-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `nuxp-cli nuxpresso:new`

Clone NUXPRESSO for Strapi CMS repos and install dependencies

```
USAGE
  $ nuxp-cli nuxpresso:new

OPTIONS
  -h, --help       show CLI help
  -n, --name=name  destination folder
```

_See code: [src/commands/nuxpresso/new.js](https://github.com/swina/nuxp-cli/blob/v0.0.0/src/commands/nuxpresso/new.js)_

## `nuxp-cli nuxpresso:verify`

Verifies that versions of the package dependencies

```
USAGE
  $ nuxp-cli nuxpresso:verify

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/nuxpresso/verify.js](https://github.com/swina/nuxp-cli/blob/v0.0.0/src/commands/nuxpresso/verify.js)_
<!-- commandsstop -->
