const chalk = require('chalk');
const logSymbols = require('log-symbols');

const { CONFIG } = require('../constants');

let warned = false;

function getFileName() {
  const name = this.componentName[CONFIG.fileNameCase + 'Case'];

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

module.exports = {
  getFileName,
};
