/**
 * AbstractCommand é um contrato
 * que permite definir definições
 * iniciais para um comando.
 *
 * @class AbstractCommand
 */
class AbstractCommand {

  /**
   * O nome do comando.
   */
  name = null;

  /**
   * Os argumentos utilizados pelo comando.
   */
  args = {};

  /**
   * A descrição do comando.
   */
  description = 'No description for this command';

  /**
   * O texto ajuda para o comando.
   */
  help = 'No help available for this command'

  /**
   * Cria uma instância de AbstractCommand.
   * 
   * @param {*} args
   * @memberof AbstractCommand
   */
  constructor(args) {
    this.args = args;
  }

  /**
   * Executa a lógica do comando.
   *
   * @returns
   * @memberof AbstractCommand
   */
  run() {
    process.exit(1);
  }
}

module.exports = AbstractCommand;