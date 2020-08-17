import fs from 'fs-extra';
import path from 'path';
import clear from 'console-clear';
import inquirer from 'inquirer';

import { Logger } from '../core/Logger';
import { question } from './questions';
import { APP_ROOT } from '../constants';
import { updatePackage } from './helpers';

export async function initConfigFile() {
  clear(true);
  Logger.log(
    chalk => `
  Welcome to ${chalk.green('React Codegen')}!
  Answer few questions to set up config for you.
  `
  );

  const answers = await inquirer.prompt(question);

  const config = {
    styles: answers.styles.toLowerCase(),
    typescript: answers.typescript,
    jsxExt: answers.jsxExt,
    fileNameCase: answers.fileNameCase,
    path: answers.path,
  };

  const content = JSON.stringify(config, null, 2);
  const filePath = path.resolve(APP_ROOT, '.react-codegenrc.json');

  fs.writeFileSync(filePath, content, 'utf-8');

  if (answers.script) {
    await updatePackage(answers.scriptName);

    Logger.log(
      chalk => `
    Now you can run the following command
    to run React CodeGen.
    
    ${chalk.cyan(`npm run ${answers.scriptName}`)}
    `
    );
  }
}
