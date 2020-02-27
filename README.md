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


#Development
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

To set up all necessary variables config file should be provided.
Example config file can be found at `/src/deploy-configs/example.json`

While running the project locally (without `--prod` flag) the `/tools/env/env.config.ts` configuration will be used to set up `LOCAL` environment.
In case of production build and run the system will be looking for configuration file at `/assets/config.json`.

The configuration file has the following properties:

| Field     | Description |
| :----------- | :---------- |
| `API` | API address |
| `ENV` | Environment name |
| `PROVIDERS` | Configurations for social auth providers |
| `DEFAULT_LANG` | Language code for translations to be used by default |
| `TITLE_MAIN` | Main title of website |
| `TITLE_NAV` | Title of website in shown in navbar |
| `AGREEMENTS` | Path to agreements .md files |

To configure login via social providers the following object need to be provided in the config file in `providers` field:
```
'<provider_name>': {
      authorizationUrlBase: '<provider_auth_url>',
      getParams: {
        client_id: '<client_id>',
        // other params required by the provider
      }
    }
```

Currently available providers: "FACEBOOK", "GOOGLE", "VK".
For required params follow the links:  
Facebook: https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/  
VK: https://vk.com/dev/auth_sites  
Google: https://developers.google.com/identity/protocols/OAuth2WebServer  
 
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
