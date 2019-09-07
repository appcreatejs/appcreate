const AbstractCommand = require('../Contracts/AbstractCommand');

class DateCommand extends AbstractCommand {

  constructor(args) {

    super(args);
    this.name = 'date';
    this.description = 'show the current date';
    this.help = `
    outside today <options>
    --year ......... the year of the date
    --month ........ the month of the date
    --day .......... the day of the date`
      ;
  }

  run() {

    const date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    console.log(`${year}-${month}-${day}`);
  }
}

module.exports = DateCommand;