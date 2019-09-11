/**
 * Dependências gerais deste módulo.
 */
const os = require('os');
const fs = require('fs');
const minimist = require('minimist');

/**
 * Dependências no projeto
 */
const {
  isClass,
  normalizePath,
  isWritable,
} = require('./utils/helpers');

/**
 * Erros disparados neste módulo.
 */
const CommandsLocalDirectoryError = require('./Errors/CommandsLocalDirectoryError');
const ManifestDirectoryExistsError = require('./Errors/ManifestDirectoryExistsError');
const ManifestDirectoryPermissionError = require('./Errors/ManifestDirectoryPermissionError');
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

    AppCreate.args = minimist(process.argv.slice(2));


    let cmdArg = AppCreate.args._[0];


    let generateLocal = cmdArg === 'build' && AppCreate.args.force != 'global';

    let forceCreateGlobal = cmdArg === 'build' && AppCreate.args.force == 'global';

    AppCreate.generateManifest(generateLocal, forceCreateGlobal);

    AppCreate.commands = {
      ...require(AppCreate.getManifestGlobalFilePath()),
      ...require(AppCreate.getManifestLocalFilePath()),
    };

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
    let Command = require(AppCreate.commands[command].path);
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
   * Gera os arquivos *-manifest.json
   * contendo os comandos registrados.
   *
   * @static
   * @param {boolean} [generateLocal=false]
   * @param {boolean} [forceCreateGlobal=false]
   * @memberof AppCreate
   */
  static generateManifest(generateLocal = false, forceCreateGlobal = false) {

    let homeDirectory = os.homedir();

    let homeGlobalCacheDirectory = normalizePath(
      `${homeDirectory}/.appcreate/cache/cli`
    );

    fs.mkdirSync(homeGlobalCacheDirectory, { recursive: true });

    let manifestGlobalFile = AppCreate.getManifestGlobalFilePath();

    /**
     * Apaga o arquivo global atual para criá-lo novamente.
     */
    if (forceCreateGlobal) {

      fs.unlinkSync(manifestGlobalFile);
    }

    /**
     * Previne que os comandos globais sejam gerados.
     */
    if (fs.existsSync(manifestGlobalFile)
      && generateLocal === false) {

      return false;
    }

    /**
     * Pasta do núcleo de comandos.
     */
    let commandsDirectory = normalizePath(
      `${__dirname}/Commands/`
    );

    /**
     * Constrói os comandos globais.
     */
    AppCreate.buildCommands(
      commandsDirectory,
      manifestGlobalFile
    );

    /**
     * Previne que os comandos locais 
     * sejam gerados se não for solicitado.
     */
    if (!generateLocal) {

      return false;
    }

    let currentDirectory = process.cwd();

    let manifestLocalCacheDirectory = normalizePath(
      `${currentDirectory}/storage/cache/cli/`
    );

    let commandsLocalDirectory = normalizePath(
      `${process.cwd()}/app/Commands/`
    );

    if (!fs.existsSync(commandsLocalDirectory)) {

      new CommandsLocalDirectoryError(
        commandsLocalDirectory
      );
    }

    if (!fs.existsSync(manifestLocalCacheDirectory)) {

      new ManifestDirectoryExistsError(
        manifestLocalCacheDirectory
      );
    }

    if (process.platform !== 'win32' &&
      !isWritable(manifestLocalCacheDirectory)
    ) {

      new ManifestDirectoryPermissionError(
        manifestLocalCacheDirectory
      );
    }

    let manifestLocalFile = normalizePath(
      `${manifestLocalCacheDirectory}/commands-manifest.json`
    );

    if (fs.existsSync(manifestLocalFile)) {

      fs.unlinkSync(manifestLocalFile);
    }


    AppCreate.buildCommands(
      commandsLocalDirectory,
      manifestLocalFile
    );
  }

  /**
   * Constrói o objeto contendo 
   * dos comandos registrados.
   *
   * @static
   * @param {*} commandsDirectory
   * @param {*} manifestFile
   * @memberof AppCreate
   */
  static buildCommands(commandsDirectory, manifestFile) {

    let commands = {};

    fs.readdirSync(commandsDirectory).forEach(file => {

      if (!file.endsWith('Command.js')) return;

      let Command = require(`${commandsDirectory}/${file}`);

      if (!(isClass(Command))) {

        new CommandIsNotAClassError(file);
      }

      let name = file.replace('Command.js', '').toLowerCase();

      Command = new Command({});


      let path = /app\/Commands/.test(commandsDirectory)
        ? `../../../app/Commands/${file}`
        : `./Commands/${file}`;

      commands[name] = {
        name: typeof Command.name === 'string' ? Command.name : name,
        path: path,
        help: Command.help,
        description: typeof Command.description === 'string' ? Command.description : '',
      };
    });

    fs.writeFileSync(
      manifestFile,
      JSON.stringify(commands, null, 2),
      { encoding: 'utf8', flag: 'w' }
    );
  }

  /**
   * Retorna o caminho aonde o arquivo global
   * "commands-manifest.json" deve estar.
   *
   * @static
   * @returns
   * @memberof AppCreate
   */
  static getManifestGlobalFilePath() {

    let homeDirectory = os.homedir();
    let homeGlobalCacheDirectory = normalizePath(
      `${homeDirectory}/.appcreate/cache/cli`
    );

    return normalizePath(
      `${homeGlobalCacheDirectory}/commands-manifest.json`
    );
  }

  /**
   * Retorna o caminho aonde o arquivo local
   * "commands-manifest.json" deve estar.
   *
   * @static
   * @returns
   * @memberof AppCreate
   */
  static getManifestLocalFilePath() {

    let currentDirectory = process.cwd();

    return normalizePath(
      `${currentDirectory}/storage/cache/cli/commands-manifest.json`
    );
  }
}

module.exports = AppCreate;
