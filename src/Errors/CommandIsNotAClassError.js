const AbstractError = require("../Contracts/AbstractError");

/**
 * Classe de error para comando que não é uma classe.
 *
 * @class CommandIsNotAClassError
 * @extends {AbstractError}
 */
class CommandIsNotAClassError extends AbstractError {

  /**
   * Cria uma instância de CommandIsNotAClassError.
   * 
   * @param {*} file
   * @memberof CommandIsNotAClassError
   */
  constructor(file) {

    super();

    this.exitWithMessage(
      `O comando para o arquivo "${file}" não é uma classe`
    );
  }
}

module.exports = CommandIsNotAClassError;