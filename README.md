# Open360 Frontend
[![Build Status](https://travis-ci.org/o360/frontend.svg?branch=master)](https://travis-ci.org/o360/frontend)
[![Coverage Status](https://coveralls.io/repos/github/o360/frontend/badge.svg?branch=master)](https://coveralls.io/github/o360/frontend?branch=master)

Frontend project for Open360. Open360 is a system to create, manage and run surveys in a convenient way for both employees and employers. Please see the [github.io page](https://o360.github.io/) for more information.


#### Related projects
[Open360 Backend](https://github.com/o360/backend)

[Open360 Demo](https://github.com/o360/demo)

## Getting started
### Docker
The easiest way to run the application is running it in docker.
Make sure you have [Docker](https://docs.docker.com/install/) installed.  
To build docker image run the following command from root of the project folder:  
```shell
docker build -f .docker/Dockerfile -t <image_name> .
```  
Don't forget about the dot at the end of the command.  
To serve the project locally run  
```shell
docker run --name <container_name> -v </path/to/config.json>:/var/www/assets/config.json -d -p <port>:80 <image_name>
```  
Make sure `</path/to/config.json>` is absolute path. To read more about configuration file go to [configuration guide](/docs/config.md).   
The application will be served at `http://localhost:<port>`.

### Development setup

#### Installation and configuration

1. Make sure that you have Node 12 or later installed. See instructions [here](https://nodejs.org/en/download/).
1. Run `npm install` from the root of your clone of this project to install dependencies.
1. Set up configuration in `/tools/env/env.config.ts` file. See more at [configuration guide](/docs/config.md).

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:5555/`. The app will automatically reload if you change any of the source files.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Testing

Run `npm run test` to run tests.

When debugging a specific test, change `describe()` or `it()` to `fdescribe()`
and `fit()` to focus execution to just that one test. This will keep the output clean and speed up execution by not running irrelevant tests.

### Intellij IDEA / WebStorm

To load the project in Intellij products, simply `Open` the repository folder.
Do **not** `Import Project`, because that will overwrite the existing
configuration.
