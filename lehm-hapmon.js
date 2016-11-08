'use strict'

module.exports = {
  name: 'Backend Boilerplate - Hapi.js & MongoDB',
  description: 'https://github.com/mustardamus/lehm-hapmon',
  delimiters: '{{ }}',
  ignore: ['README.md', 'package.json'],

  after: function (srcPath, distPath, variables, utils) {
    let yesNo = (question) => {
      return [{
        type: 'list',
        name: 'answer',
        message: question,
        choices: ['yes', 'no']
      }]
    }
    let pkgPath = distPath + '/package.json'
    let oldPkg = require(pkgPath)
    let extPkg = require(srcPath + '/package.json')

    utils._.assign(oldPkg.config, extPkg.config)
    utils._.assign(oldPkg.scripts, extPkg.scripts)
    utils._.assign(oldPkg.dependencies, extPkg.dependencies)

    console.log(utils.Chalk.yellow('Extending package.json...'))
    utils.Fs.writeFileSync(pkgPath, JSON.stringify(oldPkg, null, 2), 'utf8')

    let gitignorePath = distPath + '/.gitignore'
    let gitignoreContent = utils.Fs.readFileSync(gitignorePath, 'utf8')
    gitignoreContent += '\nserver/config/database.js\n'

    console.log(utils.Chalk.yellow('Extending .gitignore...'))
    utils.Fs.writeFileSync(gitignorePath, gitignoreContent, 'utf8')

    utils.Inquirer.prompt(yesNo('Install dependencies?')).then((the) => {
      if (the.answer === 'yes') {
        console.log(utils.Chalk.yellow('This takes a while...'))
        utils.Shell.exec('npm install')
      }
    })
  }
}
