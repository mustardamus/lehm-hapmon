'use strict'

const Good = require('good')

let reporters = {
  console: [
    {
      module: 'good-console',
      args: [
        {
          request: '*',
          response: '*',
          log: '*',
          error: '*',
          ops: null
        }
      ]
    },
    'stdout'
  ]
}

if (process.env.NODE_ENV === 'production') {
  reporters = {}
}

module.exports = {
  register: Good,
  options: {
    ops: { interval: 60000 },
    reporters
  }
}
