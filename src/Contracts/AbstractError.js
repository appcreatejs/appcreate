/**
 * Classe genérica para tratamento de erros.
 *
 * @class AbstractError
 * @extends {Error}
 */
class AbstractError extends Error {

  /**
   * Cria uma intância de AbstractError.
   * 
   * @param {*} args
   * @memberof AbstractError
   */
  constructor(args) {

    super(args);
  }

  /**
   * Encerra o Node.js imediatamente,
   * transmitindo a mensagem repassada.
   *
   * @param {*} message
   * @memberof AbstractError
   */
  exitWithMessage(message) {
    
    console.error(message);

    this.exit();
  }
  
  /**
   * Encerra o Node.js imediatamente.
   *
   * @memberof AbstractError
   */
  exit() {
    
    process.exit(1);
  }
}

module.exports = AbstractError;
