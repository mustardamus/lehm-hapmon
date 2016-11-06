'use strict'

const Path = require('path')
const Handlebars = require('handlebars')

module.exports = function (server) {
  server.views({
    engines: { html: Handlebars },
    layout: false, // true + create ./server/views/layout/layout.html
    relativeTo: Path.join(__dirname, '..'),
    path: 'views',
    layoutPath: 'views/layout'
  })
}
