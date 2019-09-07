/**
 * Dependências gerais deste módulo.
 */
const fs = require('fs');
const minimist = require('minimist');

/**
 * Dependências no projeto
 */
const { isClass } = require('./utils/helpers');

/**
 * Erros disparados neste módulo.
 */
const InvalidCommandError = require('./Errors/InvalidCommandError');
const MissingRunMethodError = require('./Errors/MissingRunMethodError');
const CommandIsNotAClassError = require('./Errors/CommandIsNotAClassError');

/**
 * Classe AppCreate é responsável
 * por gerenciar o fluxo de comandos.
 *
 * @class AppCreate
 */
class AppCreate {

  /**
   * Envia os argumentos 
   * a partir do processo do ambiente.
   *
   * @static
   * @returns
   * @memberof AppCreate
   */
  static fromProcess() {

    if (!fs.existsSync(__dirname + '/manifest.json')) {
      AppCreate.generateManifest();
    }

    AppCreate.commands = require(__dirname + '/manifest.json');

    AppCreate.args = minimist(process.argv.slice(2));
    AppCreate.execute();
  }

  /**
   * Executa os comandos registrados.
   *
   * @static
   * @memberof AppCreate
   */
  static async execute() {

    /**
     * Os argumentos são a porta de entrada.
     */
    const args = AppCreate.args;

    /**
     * Se nenhum for definido, help é usado.
     */
    let command = args._[0] || 'help';

    // Comando para versão.
    if (args.version || args.v) {
      command = 'version';
    }

    /**
     * Comando para ajuda.
     */
    if (args.help || args.h) {
      command = 'help';
    }

    /**
     * Interrompe imediatamente se inexiste.
     */
    if (!(command in AppCreate.commands)) {
      new InvalidCommandError(command);
    }

    /**
     * Antes de executar o comando...
     */
    let Command = require(AppCreate.commands[command]);
    Command = new Command(args);

    let CommandPrototype = Object.getPrototypeOf(Command);

    /**
     * ...verifica se existe o método "run".
     */
    if (!CommandPrototype.hasOwnProperty('run')) {
      new MissingRunMethodError(command);
    }

    /**
     * Executa.
     */
    Command.run();
  } 

  /**
   * Gera um arquivo manifest.json
   * contendo os comandos registrados.
   *
   * @static
   * @memberof AppCreate
   */
  static generateManifest() {

    /**
     * Pasta do núcleo de comandos.
     */
    const commandsFolder = __dirname + '/Commands/';

    let commands = {}; 
    
    fs.readdirSync(commandsFolder).forEach(file => {

      if (!file.endsWith('Command.js')) return;

      let Command = require('./Commands/' + file);

      if (!(isClass(Command))) {
        new CommandIsNotAClassError(file);
      }

      let name = file.replace('Command.js', '').toLowerCase();

      commands[name] = './Commands/' + file;
    });

    fs.writeFileSync(__dirname + '/manifest.json', JSON.stringify(commands, null, 2));
  }
}

module.exports = AppCreate;