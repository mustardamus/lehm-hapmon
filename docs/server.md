# Server

This is a Node.js backend built on top of [http://hapijs.com/api](Hapi.js) and
[MongoDB](https://docs.mongodb.com/manual/) with
[Mongosse](http://mongoosejs.com/docs/guide.html) as database adapter.

Its bootstrapping code is fully dynamic, so you can initialize new
configurations, plugins, models, etc. by adding files instead of touching the
code to run the server.


## Bootstrapping Startup

[Ekso](https://github.com/mustardamus/ekso) is used to initialize a couple of
directories (see below). These directories are the places if you want to extend
the server in any way.

Further will the bootstrapping code, which can be found in
[`server/index.js`](../server/index.js), connect to the database.


## Bootstrapping Directories

The order you see below is also the order that directories gets initialized in.

### [`helpers`](../server/helpers)

`*.js` files in this directory are exporting helper functions that are available
to all files in the global `Helpers` `Object`.

You can either export whole Node Modules, `./server/helpers/slug.js` for
example:

    module.exports = require('slug')

Which you can then access and use anywhere via `Helpers.slug('some title')`.

Or you can write custom functions, `./server/helpers/capitalize.js` for example:

    module.exports = function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

Which you can then access and use anywhere via `Helpers.capitalize('heya')`.

Helper functions should be pure, meaning that they are only doing one thing
without any side effects.

Note that you also have access to the [Lodash](https://lodash.com/docs) Module
globally via `_` (see 'Globals' below). So the example above could be simplified
to `_.capitalize('heya')`, which you can also access and use anywhere.

#### Default Helpers

##### [Boom](https://github.com/hapijs/boom) - [`boom.js`](../server/helpers/boom.js)

Provides a set of utilities for returning HTTP errors.

##### [Joi](https://github.com/hapijs/joi) - [`joi.js`](../server/helpers/joi.js)

Allows you to create blueprints or schemas for JavaScript objects
(an object that stores information) to ensure validation of key information.


### [`config`](../server/config)

`*.js` files in this directory are exporting configurations that are available
to all files in the global `Config` `Object`.

Lets create a file called `i18n.js` for example:

    module.exports = {
      en: {
        simple: 'too simple'
      },
      de: {
        simple: 'zu einfach'
      }
    }

That's all what is needed to have access to the configurations anywhere via:

- 'Config.i18n.en.simple' -> 'too simple'
- 'Config.i18n.de.simple' -> 'zu einfach

#### Default Configurations

##### [`connection.js`](../server/config/connection.js)

Server connection configuration, such as the port it is listening too. Note that
the port is extracted from the `package.json` file, `config.serverServerPort`.

##### [`databse.js`](../server/config/database.js)

Contains database configuration, such as the URL. Note that the `database.js`
file is included in `.gitignore` and thus out of version control. When you
deploy your app, you need to create that file on the server manually.

##### [`server.js`](../server/config/server.js)

Misc server configurtion, such as the static files directory path. Note that the
path is extracted from the `package.json` file, `config.serverStaticDir`.


### [`plugins`](../server/plugins)

`*.js` files in this directory are exporting
[Hapi.js Plugins](http://hapijs.com/tutorials/plugins?lang=en_US) that are
registered to the server by the bootstrapping code.

You can find a [list of Hapi.js Plugins here](http://hapijs.com/plugins).

If a plugin does not have any options, you can simply just export it like so:

    module.exports = require('inert')

If it does have options, it must export an `Object` with a `register` `Function`
and a `options` `Object`:

    module.exports = {
      register: require('plugin'),
      options: {}
    }

#### Default Plugins

##### [Good](https://github.com/hapijs/good) - [`good.js`](../server/plugins/good.js)

Monitor and report on a variety of hapi server events as well as ops information
from the host machine. The default reporter is the
[Console](https://github.com/hapijs/good-console). Note that for the production
environment no reporter is used, thus no reporting is done.

##### [Inert](https://github.com/hapijs/inert) - [`inert.js`](../server/plugins/inert.js)

Provides new handler methods for serving static files and directories, as well
as decorating the `reply` interface with a `file` method for serving file based
resources.

##### [Vision](https://github.com/hapijs/vision) - [`vision.js`](../server/plugins/vision.js)

Decorates the `server`, `request`, and `reply` interfaces with additional
methods for managing view engines that can be used to render templated
responses. The template engine used is [Handlebars](http://handlebarsjs.com/).


### [`init`](../server/init)

`*.js` files in this directory are exporting functions that will initialize
certain things on the [Hapi.js `server`](http://hapijs.com/api#server) `Object`.
The `server` `Object` is passed to the exported function as the first and only
argument, for example:

    module.exports = function (server) {
      // do something on `server`, eg `server.route()`
    }

#### Default Inits

##### [`static.js`](../server/init/static.js)

This will init the routes for the static files. They will be served, if they are
found in the static directory path (configured in `config/server.js`).

##### [`views.js`](../server/init/views.js)

This will init the default view engine, which is
[Handlebars](http://handlebarsjs.com/), and the paths where the views can be
found (configured in `config/views.js`).


### [`models`](../server/models)

`*.js` files in this directory are exporting
[Mongoose Models](http://mongoosejs.com/docs/models.html) with a given
name and [schema](http://mongoosejs.com/docs/guide.html).

The first and only argument passed to the exported function is the `mongoose`
instance, which is connected to the database in the bootstrap code.

Models are globally available by their filename. For example
`./server/models/Article.js`:

    'use strict'

    module.exports = function (mongoose) {
      const name = 'Article'
      const schema = new mongoose.Schema({
        isDraft: { type: Boolean, default: true },
        title: { type: String },
        content: { type: String }
      }, {
        timestamps: true
      })

      return mongoose.model(name, schema)
    }

This will be available anywhere as `Article`. As a convention you should name
your models in singular and captalized.


### [`controllers`](../server/controllers)

`*.js` files in this directory are exporting `Objects` with functions that can
be mapped to routes (see below).

A `Function` receives two arguments:

- [`request`](http://hapijs.com/api#request-object) - the Hapi.js `request`
  `Object` where you can find useful information such as the `headers`,
  `query` and `params`.
- [`reply`](http://hapijs.com/api#replyerr-result) - the Hapi.js `reply`
  interface to response to the request with data or an error.

Controllers are globally available by their filename. For example
`./server/controllers/ArticlesController.js`:

    /* globals Helpers, Article */
    'use strict'

    module.exports = {
      index (request, reply) {
        Article
          .find({ isDraft: false })
          .sort({ createdAt: 'desc' })
          .exec((err, articles) => {
            if (err) {
              return Helpers.boom.badImplementation('Find Articles')
            }

            reply({ articles })
          })
      }
    }

This will be available anywhere as `ArticlesController`. As a convention you
should name your controllers in plural, capitalized and followed by `Controller`
to distinct them from models.

Note that we accessed `Helpers` and the `Article` model in the example above
without referencing them - since they are globally defined for convenience.

Using `reply` directly will return JSON to the client. The returned `Object`
would look something like this:

    {
      articles: [
        { _id: 'ObjectId', isDraft: false, title: 'Article 1', content: '...', createdAt: '...', updatedAt: '...' },
        { _id: 'ObjectId', isDraft: false, title: 'Article 2', content: '...', createdAt: '...', updatedAt: '...' }
      ]
    }

For rendering views, see the documentation below.


### [`routes`](../server/routes)

`*.js` files in this directory are exporting a `Object` that will define a URL
either by a simple `String`, or as an `Object` if the route has further options.

Under the hood it will invoke
[`server.route()`](http://hapijs.com/tutorials/routing?lang=en_US), but will add
some syntactic sugar as well as checking if the controller and action exists.

Lets create the file to tie together the index route with the controller,
`./server/routes/articles.js`.

If the route doesn't has any options, you can link it to a controller in this
format:

    '<method> <url>': '<controller>.<action>'

For example the `index` action of the `ArticlesController`, linked to
`GET /articles`:

    module.exports = {
      'GET /articles': 'ArticlesController.index'
    }

`<method>` can be either `GET`, `POST`, `PUT` or `DELETE`.

If you want to apply some configuration to a route, you have to export a
`Object` with the `handler` and `config` fields. Lets extend the route from
above with some basic validation via our Joi Helper:

    /* globals Helpers */

    module.exports = {
      'GET /articles': {
        handler: 'ArticlesController.index',
        config: {
          validate: {
            query: {
              isDraft: Helpers.joi.boolean()
            }
          }
        }
      }
    }


## Globals

Here is a list of Globals that can be accessed anywhere in your app:

- `Helpers.*`, eg. `helpers/capitalize.js` -> `Helpers.capialize`
- `Config.*`, eg. `config/i18n.js` -> `Config.i18n`
- Global Models, eg. `models/Article.js` -> `Article`
- Global Controllers, eg. `controllers/AppController.js` -> `AppController`
- `_` -> [Lodash](https://lodash.com/docs/4.16.6)

If you like to add other global node modules, you can do so in the
`globalRequire` option for Ekso, in the `server/index.js` bootstrap code.


## NPM Commands

Execute them with `npm run [command]`.

#### `client:serve:proxy`

Serves the build code in `./www` with [BrowserSync](https://browsersync.io/),
exactly like the [lehm-bulvue](https://github.com/mustardamus/lehm-bulvue)
frontend boilerplate does. The difference is that all unhandled request will be
forwarded to the server on port `9001`.

#### `server:lint`

Lints the server code in `./server` with the
[JavaScript Standard Style](http://standardjs.com/).

#### `server:test` *Not working yet*

This will run all files that end in `*_spec.js` in the server directory with
[Mocha](https://mochajs.org/). TODO: Extend Ekso Lib so it can ignore single
files like `*_spec.js`.

#### `server`

This will start the server and watches the server directory with
[Forever](https://github.com/foreverjs/forever) for file changes and restarts
the server.

#### `start`

Convenient way to start the client and server development environment by running
`npm run client:watch & npm run client:serve:proxy & npm run server:serve`.
