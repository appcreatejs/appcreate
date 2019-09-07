const AbstractCommand = require('../Contracts/AbstractCommand');

class VersionCommand extends AbstractCommand {

  constructor(args) {

    super(args);
    this.name = 'version'; 
  }

  run() {
    const { version } = require('../../package.json');
    console.log(`v${version}`);
  }
}

module.exports = VersionCommand;