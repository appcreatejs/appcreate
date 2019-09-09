const AbstractCommand = require('../Contracts/AbstractCommand');

class VersionCommand extends AbstractCommand {

  constructor(args) {

    super(args);
    this.name = 'version';
    this.description = 'get "appcreate" current version' 
  }

  run() {
    const { version } = require('../../package.json');
    console.log(`v${version}`);
    process.exit();
  }
}

module.exports = VersionCommand;