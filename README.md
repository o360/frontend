# Open360
[![Build Status](https://travis-ci.com/o360/frontend.svg?branch=master)](https://travis-ci.com/o360/frontend)
[![Coverage Status](https://coveralls.io/repos/github/o360/frontend/badge.svg?branch=master)](https://coveralls.io/github/o360/frontend?branch=master)

* [General info](#general-info)
* [Local Development](#local-development)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Environment Configuration](#environment-configuration)
    * [Development server](#development-server)
    * [Build](#build)
    * [Testing](#testing)
* [IDE Specific Usage](#ide-specific-usage)
    * [Intellij IDEA / WebStorm](#intellij-idea--webstorm)
   


## General info

Frontend project for Open360. The Open360 is a system to create, manage and run surveys in a convenient way for both employees and employers.

### Related project
[Open360 Backend](https://github.com/o360/backend)


# Local Development
## Prerequisites

Node.js - v12.x and yarn

* ```sudo curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -```
* ```sudo apt-get update```
* ```sudo apt-get install nodejs```
* ```sudo npm install -g npm```
* ```sudo npm install -g yarn```

## Installation

To get started locally, follow these instructions:

1. If you haven't done it already, [make a fork of this repo](https://github.com/o360/frontend/fork).
1. Clone to your local computer using `git`.
1. Make sure that you have Node 12 or later installed. See instructions [here](https://nodejs.org/en/download/).
1. Make sure that you have `yarn` installed; see instructions [here](https://yarnpkg.com/lang/en/docs/install/).
1. Run `yarn` (no arguments) from the root of your clone of this project to install dependencies.

## Environment Configuration

The environment configuration files in `/src/environments/` provide a way for you to set and override configuration settings based on a given environment.
The `/tools/env/env.config.ts` configuration is set up in base `LOCAL` environment, whereas the `/src/deploy-configs/dev.json` is specific the development environment,
 as is `/src/deploy-configs/prod.json` specific to the prod environment.
 
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:5555/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

 
## Testing

Run `yarn test` to run tests.

When debugging a specific test, change `describe()` or `it()` to `fdescribe()`
and `fit()` to focus execution to just that one test. This will keep the output clean and speed up execution by not running irrelevant tests.

## IDE Specific Usage

Some additional tips for developing in specific IDEs.

### Intellij IDEA / WebStorm

To load the project in Intellij products, simply `Open` the repository folder.
Do **not** `Import Project`, because that will overwrite the existing
configuration.
