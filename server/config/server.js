'use strict'

const Fs = require('fs')
const Path = require('path')

const path = Path.join(__dirname, '../../package.json')
const content = Fs.readFileSync(path)
const staticDir = JSON.parse(content).config.serverStaticDir
const relativeTo = Path.join(__dirname, '../..', staticDir)

module.exports = {
  connections: {
    routes: {
      files: { relativeTo }
    }
  }
}
