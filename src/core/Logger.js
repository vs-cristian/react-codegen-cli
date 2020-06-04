import chalk from 'chalk';
import logSymbols from 'log-symbols';

export class Logger {
  static info(value) {
    const log = v => Logger.log(v, 'blue', logSymbols.info);

    if (typeof value === 'function') {
      return log(value(chalk));
    }
    return log(value);
  }

  static success(value) {
    const log = v => Logger.log(v, 'green', logSymbols.success);

    if (typeof value === 'function') {
      return log(value(chalk));
    }
    return log(value);
  }

  static warn(value) {
    const log = v => Logger.log(v, 'yellow', logSymbols.warning);

    if (typeof value === 'function') {
      return log(value(chalk));
    }
    return log(value);
  }

  static error(value) {
    const log = v => Logger.log(v, 'red', logSymbols.error);

    if (typeof value === 'function') {
      return log(value(chalk));
    }
    return log(value);
  }

  static log(value, color = 'white', icon) {
    if (icon) return console.log(icon, chalk[color](value));
    return console.log(chalk[color](value));
  }
}
