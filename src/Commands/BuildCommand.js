const AbstractCommand = require('../Contracts/AbstractCommand');
const AppCreate = require('../AppCreate');

class BuildCommand extends AbstractCommand {

  constructor(args) {

    super(args);
    this.name = 'build';
    this.description = 'Publica os comandos locais.';
    this.help = {
      '--force[=TARGET], -f': 'Força recriar os comandos no destino (global, local). [padrão: "local"]',
    };
  }

  run() {

    switch (this.args.force) {
      /**
       * Recria o manifest para os comandos globais.
       */
      case 'global':
        console.log('fuck')
        AppCreate.generateManifest(false, true);
        break;

      /**
       * Recria o manifest para os comandos locais.
       */
      case 'local':
      case this.args.force === true:
        AppCreate.generateManifest(true);
        break;
    }
 
    process.exit();
  }
}

module.exports = BuildCommand;