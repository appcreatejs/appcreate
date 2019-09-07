const AbstractCommand = require('../Contracts/AbstractCommand');

class HelpCommand extends AbstractCommand {

  constructor(args) {

    super(args);
    this.name = 'help';
    this.description = 'help command for appcreate.';
    this.help = `
    appcreate [command] <options>

    today .............. show weather for today
    version ............ show package version
    help ............... show help menu for a command`
      ;
  }

  run() {
    return 'from run';
  }
}

module.exports = HelpCommand;

// const menus = {
//   main: `
//     appcreate [command] <options>

//     today .............. show weather for today
//     version ............ show package version
//     help ............... show help menu for a command`,

//   today: `
//     outside today <options>

//     --location, -l ..... the location to use`,

//   forecast: `
//     outside forecast <options>

//     --location, -l ..... the location to use`,
// }

// module.exports = (args) => {
//   const subCmd = args._[0] === 'help'
//     ? args._[1]
//     : args._[0]

//   console.log(menus[subCmd] || menus.main)
// }