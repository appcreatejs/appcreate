const AbstractError = require("../Contracts/AbstractError");

/**
 * Classe de error para comando que não existe.
 *
 * @class InvalidCommandError
 * @extends {AbstractError}
 */
class InvalidCommandError extends AbstractError {

  /**
   * Cria uma instância de InvalidCommandError.
   * @param {*} command
   * @memberof InvalidCommandError
   */
  constructor(command) {

    super();

    this.exitWithMessage(
      `"${command}" não é um comando válido!`
    );
  }
}

module.exports = InvalidCommandError;