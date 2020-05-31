import path from 'path';
import findUp from 'find-up';
import chalk from 'chalk';
import logSymbols from 'log-symbols';

export function getAppRoot() {
  const file = findUp.sync('package.json');
  if (file) return path.dirname(file);
  console.log(
    logSymbols.warning,
    chalk.yellow(
      'Could not find application root. Files will be generated relative to the current directory'
    )
  );
  return process.cwd();
}
