const AbstractCommand = require('../Contracts/AbstractCommand');

class VersionCommand extends AbstractCommand {

  constructor(args) {

    super(args);

    this.name = 'version';
    this.description = 'Mostra a versão atual para "appcreate"' 
  }

  run() {

    const { version } = require('../../package.json');
    
    console.log(`v${version}`);
    
    process.exit();
  }
}

module.exports = VersionCommand;