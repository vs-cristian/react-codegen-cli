#!/usr/bin/env node

const inquirer = require('inquirer');

const { FileService } = require('./core/FileService');
const { TemplateService } = require('./core/TemplateService');
const { parseAnswers, getQuestions, getVariables } = require('./utils');

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
