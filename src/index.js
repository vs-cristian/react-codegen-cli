#!/usr/bin/env node

import inquirer from 'inquirer';

import { FileService } from './core/FileService';
import { TemplateService } from './core/TemplateService';
import { Logger } from './core/Logger';
import { getVariables, parseAnswers } from './utils';
import { getQuestions } from './questions/getQuestions';
// import { type as typeQuestion } from './questions/questions';

const type = 'component';
inquirer
  .prompt(getQuestions(type))
  .then(async answers => {
    // const answers = await inquirer.prompt(getQuestions(type));

    process.stdout.write('\n');

    const data = parseAnswers({ ...answers, type });
    const variables = getVariables(data);

    const fileService = new FileService(variables.fileName(type));
    const templateService = new TemplateService(variables);

    fileService.createDir();
    fileService.genJs(templateService.getTemplate());
    if (data.type !== 'hoc') {
      fileService.genStyle(templateService.getTemplate('style'));
    }
    if (data.test) {
      fileService.genTest(templateService.getTemplate('test'));
    }

    process.stdout.write('\n');
  })
  .catch(Logger.error);
