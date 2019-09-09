const AppCreate = require('../AppCreate');

const AbstractCommand = require('../Contracts/AbstractCommand');

class HelpCommand extends AbstractCommand {

  constructor(args) {

    super(args);
    this.name = 'help';
    this.description = 'help command for appcreate.';
  }

  run() {

    let manifestGlobalFile = AppCreate.getManifestGlobalFilePath();

    let commandsManifest = require(manifestGlobalFile);

    let commandsMenus = {};
    let mainMenu = [];

    Object.keys(commandsManifest).forEach(name => {

      let command = commandsManifest[name];
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
    ${'\n'}to get help for any command type:${'\n'}
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