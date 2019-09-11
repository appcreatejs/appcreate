const fs = require('fs');

const AppCreate = require('../AppCreate');

const AbstractCommand = require('../Contracts/AbstractCommand');

class HelpCommand extends AbstractCommand {

  constructor(args) {

    super(args);
    this.name = 'help';
    this.description = 'Comando "help" para appcreate e seus comandos.';
  }

  run() {


    let manifestGlobalCommands = {};

    let manifestGlobalFile = AppCreate.getManifestGlobalFilePath();

    if (fs.existsSync(manifestGlobalFile)) {
      manifestGlobalCommands = require(manifestGlobalFile);
    }

    let manifestLocalCommands = {};

    let manifestLocalFile = AppCreate.getManifestLocalFilePath();

    if (fs.existsSync(manifestLocalFile)) {
      manifestLocalCommands = require(manifestLocalFile);
    }

    let manifestCommands = { ...manifestGlobalCommands, ...manifestLocalCommands };

    let commandsMenus = {};
    let mainMenu = [];

    Object.keys(manifestCommands).forEach(name => {

      let command = manifestCommands[name];
      let options = command.help;

      mainMenu.push(`${(name + ' ').padEnd(30, '.')}  ${command.description}`);

      let optionsOutput = [];

      if (typeof options === 'object') {
        Object.keys(options).forEach(option => {
          optionsOutput.push(`${(option + ' ').padEnd(30, '.')} ${options[option]}`
          );
        });
      }

      if (typeof options === 'string') {
        optionsOutput.push(`${options + '\n'}`);
      }

      commandsMenus[command.name] = `appcreate ${command.name} <options>
      ${'\n' + command.description}
      ${'\n' + optionsOutput.join('\n')}
      `
    });

    commandsMenus['main'] = `appcreate [command] <options>
    ${'\n'}Para obter ajuda para qualquer comando digite:${'\n'}
    appcreate help [command]
    appcreate [command] --help
    appcreate [command] -h
    ${'\n' + mainMenu.join('\n')}
    `;

    const subCmd = this.args._[0] === 'help'
      ? this.args._[1]
      : this.args._[0];

    console.log(commandsMenus[subCmd] || commandsMenus.main);
  }
}

module.exports = HelpCommand;