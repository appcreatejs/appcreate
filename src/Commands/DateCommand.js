const AbstractCommand = require('../Contracts/AbstractCommand');

class DateCommand extends AbstractCommand {

  constructor(args) {

    super(args);
    this.name = 'date';
    this.description = 'show the current date';
    this.help = {
      '--year, -y': 'the year of the date',
      '--month, -m': 'the month of the date',
      '--day, -d': 'the day of the date',
    };
  }

  run() {

    const date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;

    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;

    let output = [];

    if (this.args.year) {
      output.push(year);
    }

    if (this.args.month) {
      output.push(month);
    }

    if (this.args.day) {
      output.push(day);
    }

    if (output.length > 0) {
      console.log(output.join('-'));
      process.exit();
    }

    console.log(`${year}-${month}-${day}`);
    process.exit();
  }
}

module.exports = DateCommand;