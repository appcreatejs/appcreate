const AbstractError = require("../Contracts/AbstractError");

/**
 * Classe de erro para diretório cache de comandos 
 * sem permissão de escrita para o usuário atual.
 *
 * @class ManifestDirectoryPermissionError
 * @extends {AbstractError}
 */
class ManifestDirectoryPermissionError extends AbstractError {

  /**
   * Cria uma instância de ManifestDirectoryPermissionError.
   * 
   * @param {*} path
   * @memberof ManifestDirectoryPermissionError
   */
  constructor(path) {

    super();

    this.exitWithMessage(
      `Diretório para arquivo manifest "${path}" não possui permissão de leitura ou escrita!`
    );
  }
}

module.exports = ManifestDirectoryPermissionError;