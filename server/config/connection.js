'use strict'

const Fs = require('fs')
const Path = require('path')

const path = Path.join(__dirname, '../../package.json')
const content = Fs.readFileSync(path)
const port = JSON.parse(content).config.serverServerPort

module.exports = { port }
