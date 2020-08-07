import inquirer from 'inquirer';

import { init } from './init';
import { Logger } from './core/Logger';
import * as questionTypes from './questions/questionTypes';
import { type as typeQuestion } from './questions/questions';
import { FileGenerateManager } from './core/FileGenerateManager';

export async function runCLI(shouldInit: boolean) {
  if (shouldInit) {
    await init();
    return;
  }

  const { type } = await inquirer.prompt(typeQuestion as any);

  process.stdout.write('\n');

  switch (type) {
    case 'component': {
      const answers = await inquirer.prompt(questionTypes.getComponentQuestions());
      await FileGenerateManager.generateComponent(answers);
      break;
    }
    case 'hoc': {
      const answers = await inquirer.prompt(questionTypes.getHOCQuestions());
      await FileGenerateManager.generateHOC(answers);
      break;
    }
    case 'hook': {
      const answers = await inquirer.prompt(questionTypes.getHookQuestions());
      await FileGenerateManager.generateHook(answers);
      break;
    }
    default: {
      Logger.error(`Unhandled type ${type}`);
    }
  }

  process.stdout.write('\n');
}
