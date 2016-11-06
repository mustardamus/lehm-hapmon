'use strict'

module.exports = {
  name: 'Backend Boilerplate - Hapi.js & MongoDB',
  description: 'https://github.com/mustardamus/lehm-hapmon',
  delimiters: '{{ }}',
  ignore: ['README.md', 'package.json'],

  after: function (srcPath, distPath, variables, utils) {
    /*
    let pkgPath = distPath + '/package.json'
    let oldPkg = require(pkgPath)
    let extPkg = require(srcPath + '/package.json')

    utils._.assign(oldPkg.config, extPkg.config)
    utils._.assign(oldPkg.scripts, extPkg.scripts)
    oldPkg.scripts['client:copy'] += ' & npm run client:copy:fonts'

    console.log(utils.Chalk.yellow('Extending package.json...'))
    utils.Fs.writeFileSync(pkgPath, JSON.stringify(oldPkg, null, 2), 'utf8')

    console.log(utils.Chalk.yellow('Installing Font-Awesome...'))
    utils.Shell.exec('npm install font-awesome --save')

    let stylePath = distPath + '/client/index.styl'
    let styleContent = utils.Fs.readFileSync(stylePath, 'utf8')
    styleContent += '\n@import "../node_modules/font-awesome/css/font-awesome.css"\n'

    console.log(utils.Chalk.yellow('Extending client/index.styl...'))
    utils.Fs.writeFileSync(stylePath, styleContent, 'utf8')
    */

    // add "server/config/database.js" to .gitignore
  }
}
