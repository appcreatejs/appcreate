const AbstractCommand = require('../Contracts/AbstractCommand');

class BuildCommand extends AbstractCommand {

  constructor(args) {

    super(args);
    this.name = 'build';
    this.description = 'build the local commands'; 
  }

  run() {

    console.log('Nada para gerar');
    process.exit();
  }
}

module.exports = BuildCommand;