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
* [`nuxp-cli nuxpresso:new`](#nuxp-cli-new)
* [`nuxp-cli nuxpresso:verify`](#nuxp-cli-verify)
* [`nuxp-cli config`](#nuxp-cli-config)
* [`nuxp-cli help [COMMAND]`](#nuxp-cli-help-command)

## `nuxp-cli nuxpresso:new [OPTIONS]`

Clone and install dependencies for nuxpresso.

```
USAGE
  $ nuxp-cli nuxpresso:new

OPTIONS
  $ nuxp-cli nuxpresso:new [project_name]
  
DESCRIPTION
  Clone nuxpresso-moka, nuxpresso-nuxt and nuxpresso-strapi and install all dependecies
```

_See code: [src/commands/new.js](https://github.com/swina/nuxp-cli/blob/v0.0.0/src/commands/new.js)_

## `nuxp-cli nuxpresso:verify`

Verify that nuxpresso dependecies have been installed correctly

```
USAGE
  $ nuxp-cli nuxpresso:verify

```

_See code: [src/commands/verify.js](https://github.com/swina/nuxp-cli/blob/v0.0.0/src/commands/verify.js)_



## `nuxp-cli config [COMMAND]`

nuxpresso configuration with environment file creation

```
USAGE
  $ nuxp-cli config [COMMAND]

DESCRIPTION
  Automate creation of env files based on user input.
```

_See code: [src/commands/config/index.js](https://github.com/swina/nuxp-cli/blob/v0.0.0/src/commands/config/index.js)_

<!-- commandsstop -->

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
<!-- commandsstop -->
