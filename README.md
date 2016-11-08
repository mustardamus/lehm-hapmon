# Backend Boilerplate - Hapi.js & MongoDB

This is a backend boilerplate template for the
[Lehm file-generator](https://mustardamus.github.io/lehm/) with funky features
such as:

- Built on [Hapi.js](http://hapijs.com)
- [MongoDB](https://mongodb.com) database connection with
  [Mongoose](http://mongoosejs.com)
- Dynamic loading of configs, helpers, routes, controllers and more
- Server restarting on code change
- Super simple but powerful routing
- Globals to be used everywhere, Models and Controllers for example

Check out the [development environment documentation](docs/server.md) for kewl
tech used, descriptions and commands.

Please note that currently you are not able to create a stand-alone project
(a API server, for example) with this template. First generate your project
with the [lehm-bulvue template](https://github.com/mustardamus/lehm-bulvue) and
then extend it with this template. WIP.

## Installation

1. If you haven't, install [Lehm](https://mustardamus.github.io/lehm/):

    `npm install lehm -g`

2. Clone this repo to your templates directory:

    ~/templates $ git clone https://github.com/mustardamus/lehm-hapmon.git

3. Extend your app with the boilerplate with Lehm:

    ~/code/your-app $ lehm create lehm-hapmon

4. Answer the questions, get a Club Mate while it installs the dependencies,
   code away.

## Extensions
