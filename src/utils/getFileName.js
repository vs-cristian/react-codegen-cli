import logSymbols from 'log-symbols';
import chalk from 'chalk';

import { CONFIG } from '../constants';

let warned = false;

export function getFileName() {
  const name = this.componentName[`${CONFIG.fileNameCase}Case`];

  if (!name) {
    if (!warned) {
      console.log(
        logSymbols.warning,
        chalk.yellow(
          `File name case "${CONFIG.fileNameCase}" is not supported. Using default "pascal"\n`
        )
      );
      warned = true;
    }
    return this.componentName.pascalCase;
  }

  return name;
}
