/**
 * AbstractCommand é um contrato
 * que permite definir definições
 * iniciais para um comando.
 *
 * @class AbstractCommand
 */
class AbstractCommand {

  /**
   * Cria uma instância de AbstractCommand.
   * 
   * @param {*} args
   * @memberof AbstractCommand
   */
  constructor(args) {
    this.args = args;
    this.description = 'nenhuma descrição para este comando';
    this.help = 'não há ajuda disponível para este comando';
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