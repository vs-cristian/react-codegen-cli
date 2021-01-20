import chalk, { Chalk } from 'chalk';
import logSymbols from 'log-symbols';

type LoggerFunctionValue = (chalk: Chalk) => string;
type LoggerValue = string | LoggerFunctionValue;

export class Logger {
  static info(value: LoggerValue) {
    const log = (v: string) => Logger.log(v, 'blue', logSymbols.info);

    if (typeof value === 'function') {
      return log(value(chalk));
    }
    return log(value);
  }

  static success(value: LoggerValue) {
    const log = (v: string) => Logger.log(v, 'green', logSymbols.success);

    if (typeof value === 'function') {
      return log(value(chalk));
    }
    return log(value);
  }

  static warn(value: LoggerValue) {
    const log = (v: string) => Logger.log(v, 'yellow', logSymbols.warning);

    if (typeof value === 'function') {
      return log(value(chalk));
    }
    return log(value);
  }

  static error(value: LoggerValue) {
    const log = (v: string) => Logger.log(v, 'red', logSymbols.error);

    if (typeof value === 'function') {
      return log(value(chalk));
    }
    return log(value);
  }

  static log(value: LoggerValue, color = 'white', icon?: string) {
    if (typeof value === 'function') {
      value = value(chalk);
    }

    if (icon) {
      return console.log(icon, chalk[color](value));
    }
    return console.log(chalk[color](value));
  }
}
