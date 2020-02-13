# Welcome to Open360

[![Build Status](https://travis-ci.org/o360/frontend.svg?branch=master)](https://travis-ci.org/o360/frontend)

## General Information

The root of this folder contains the following files:

| Filename     | Description |
| :----------- | :---------- |
| `.editorconfig` | Configuration for code editors. See [EditorConfig](https://editorconfig.org/). |
| `.gitignore` | Specifies intentionally untracked files that [Git](https://git-scm.com/) should ignore. |
| `.angular.json`  | CLI configuration defaults for all projects in the workspace, including configuration options for build, serve, and test tools that the CLI uses, such as [TSLint](https://palantir.github.io/tslint/), [Karma](https://karma-runner.github.io/latest/index.html). For details, see [Angular Workspace Configuration](https://angular.io/guide/workspace-config). |
| `.gitlab-ci.yml`  | Provides the project build and deploy configuration for Gitlab |
| `package.json`   | 	Configures [npm package dependencies](https://angular.io/guide/npm-packages) that are available to all projects in the workspace. See [npm documentation](https://docs.npmjs.com/files/package.json) for the specific format and contents of this file. |
| `tsconfig.json`   | Default [TypeScript](https://www.typescriptlang.org/) configuration for apps in the workspace, including TypeScript and Angular template compiler options. See TypeScript Configuration. |
| `tslint.json`   | Default [TSLint](https://palantir.github.io/tslint/) configuration for apps in the workspace. |
| `README.md`  | Introductory documentation for the root app. |

## Configuration

The configuration provided by `angular.json` file.

## Environment Configuration

The environment configuration files in `/src/environments/` provide a way for you to set and override configuration settings based on a given environment.
The `/tools/env/env.config.ts` configuration is set up in base `LOCAL` environment, whereas the `/src/deploy-configs/dev.json` is specific the development environment,
 as is `/src/deploy-configs/prod.json` specific to the prod environment.

## Development environment settings and general information of project structure  

All steps are described for Ubuntu 18.04 LTS. Can be different in other systems.

## Prerequisites

Node.js - v10.x and yarn

* ```sudo curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -```
* ```sudo apt-get update```
* ```sudo apt-get install nodejs```
* ```sudo npm install -g npm```
* ```sudo npm install -g yarn```

[JetBrains WebStorm](https://www.jetbrains.com/webstorm/download/) - latest

### Setting up
Import IDE's Code Style settings.

* File > Settings > Editor > Code Style > HTML > 
Do not indent children of: Set only HTML
* File > Settings > Editor > Code Style > TypeScript > Spaces 
Set: Object literal braces, ES6 Import/Export braces
* File > Settings > Editor > Code Style > TypeScript > Other
Set: Quote marks: Single Quote, use ‘public’ modifier

Allow EditorConfig to overwrite code style settings.
 
### Configure TypeScript support:

* File > Settings > Languages & Frameworks > TypeScript
Disable TypeScript compiler.
* File > Settings > Languages & Frameworks > TypeScript > TSLint
Set: Enable. TSLint package will be available after packages install. 
Set: Search for tslint.json.

## Install packages:
  `yarn install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:5555/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
