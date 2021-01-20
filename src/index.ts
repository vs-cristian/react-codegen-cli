import path from 'path';
import inquirer from 'inquirer';
import { config } from '@/config';
import { Logger } from './core/Logger';
import * as questionTypes from './questions/questionTypes';
import { type as typeQuestion } from './questions/questions';
import { FileGenerateManager } from './core/FileGenerateManager';

export interface IArgs {
  wrap?: boolean;
  directory?: string;
}

export async function runGenerator(args: IArgs, data?: any) {
  const { directory, wrap } = args;

  let { type } = data;

  if (!type) {
    const res: any = await inquirer.prompt(typeQuestion as any);
    type = res.type;
  }

  process.stdout.write('\n');

  if (directory) {
    config.path = path.resolve(process.cwd(), directory);
  }

  if (wrap != null) {
    config.wrapFolder = wrap;
  }

  switch (type) {
    case 'component': {
      const answers: any =
        data.answers ||
        (await inquirer.prompt(questionTypes.getComponentQuestions()));
      await FileGenerateManager.generateComponent(answers);
      break;
    }
    case 'hoc': {
      const answers: any =
        data.answers ||
        (await inquirer.prompt(questionTypes.getHOCQuestions()));
      await FileGenerateManager.generateHOC(answers);
      break;
    }
    case 'hook': {
      const answers: any =
        data.answers ||
        (await inquirer.prompt(questionTypes.getHookQuestions()));
      await FileGenerateManager.generateHook(answers);
      break;
    }
    default: {
      Logger.error(`Unsupported type: ${type}`);
    }
  }

  process.stdout.write('\n');
}
