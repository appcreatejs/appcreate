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
  description = 'nenhuma descrição para este comando';

  /**
   * O texto ajuda para o comando.
   */
  help = 'nenhuma ajuda disponível para este comando'

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