const AbstractError = require("../Contracts/AbstractError");

/**
 * Classe de erro para diretório comandos local que não existe.
 *
 * @class CommandsLocalDirectoryError
 * @extends {AbstractError}
 */
class CommandsLocalDirectoryError extends AbstractError {

  /**
   * Cria uma instância de CommandsLocalDirectoryError.
   * 
   * @param {*} path
   * @memberof CommandsLocalDirectoryError
   */
  constructor(path) {

    super();

    this.exitWithMessage(
      `Diretório de comandos local "${path}" não existe!`
    );
  }
}

module.exports = CommandsLocalDirectoryError;