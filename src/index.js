#!/usr/bin/env node

import inquirer from 'inquirer';

import { FileService } from './core/FileService';
import { TemplateService } from './core/TemplateService';
import { getQuestions, getVariables, parseAnswers } from './utils';

inquirer
  .prompt(getQuestions())
  .then(async answers => {
    console.log();
    const data = parseAnswers(answers);
    const variables = getVariables(data);

    const fileService = new FileService(variables.fileName());
    const templateService = new TemplateService(variables);

    await fileService.createDir();
    await fileService.genJs(await templateService.getScriptTemplate());
    await fileService.genStyle(await templateService.getStyleTemplate());
    if (answers.test) {
      await fileService.genTest(await templateService.getTestTemplate());
    }
    console.log();
  })
  .catch(console.error);
