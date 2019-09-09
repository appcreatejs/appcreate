const AbstractError = require("../Contracts/AbstractError");

/**
 * Classe de erro para diretório cache de comandos que não existe.
 *
 * @class ManifestDirectoryExistsError
 * @extends {AbstractError}
 */
class ManifestDirectoryExistsError extends AbstractError {

  /**
   * Cria uma instância de ManifestDirectoryExistsError.
   * 
   * @param {*} path
   * @memberof ManifestDirectoryExistsError
   */
  constructor(path) {

    super();

    this.exitWithMessage(
      `Diretório para arquivo manifest "${path}" não existe!`
    );
  }
}

module.exports = ManifestDirectoryExistsError;