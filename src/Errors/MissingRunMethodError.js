const AbstractError = require("../Contracts/AbstractError");

/**
 * Classe de error para comando que possui o método "run"
 *
 * @class MissingRunMethodError
 * @extends {AbstractError}
 */
class MissingRunMethodError extends AbstractError {

  /**
   * Cria uma instância de MissingRunMethodError.
   * @param {*} command
   * @memberof MissingRunMethodError
   */
  constructor(command) {

    super();

    this.exitWithMessage(
      `O comando "${command}" não possui ` +
      `um método executável ou o mesmo está estático.`
    );
  }
}

module.exports = MissingRunMethodError;