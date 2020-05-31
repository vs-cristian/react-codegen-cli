import fs from 'fs-extra';
import chalk from 'chalk';
import path from 'path';
import logSymbols from 'log-symbols';

import { CONFIG, EXT } from '../constants';

export class FileService {
  constructor(fileName) {
    this.fileName = fileName;
    this.dirPath = path.resolve(CONFIG.path, this.fileName);
    console.log(fileName, CONFIG.path);
  }

  getFilePath(ext, type) {
    type = type ? `.${type}` : '';
    return `${this.dirPath}/${this.fileName}${type}.${ext}`;
  }

  createDir() {
    return fs.mkdirp(this.dirPath);
  }

  genJs(template) {
    const filePath = this.getFilePath(EXT.component);
    if (!fs.pathExistsSync(filePath)) {
      fs.writeFileSync(filePath, template);
      console.log(
        logSymbols.success,
        chalk.green(`Successfully generated component file ${chalk.white(filePath)}`)
      );
    } else {
      console.log(logSymbols.warning, chalk.yellow(`File already exists ${chalk.white(filePath)}`));
    }
  }

  genStyle(template) {
    const filePath = this.getFilePath(EXT.style, 'style');
    if (!fs.pathExistsSync(filePath)) {
      fs.writeFileSync(filePath, template);
      console.log(
        logSymbols.success,
        chalk.green(`Successfully generated style file ${chalk.white(filePath)}`)
      );
    } else {
      console.log(logSymbols.warning, chalk.yellow(`File already exists ${chalk.white(filePath)}`));
    }
  }

  genTest(template) {
    const filePath = this.getFilePath(EXT.component, 'test');
    if (!fs.pathExistsSync(filePath)) {
      fs.writeFileSync(filePath, template);
      console.log(
        logSymbols.success,
        chalk.green(`Successfully generated test file ${chalk.white(filePath)}`)
      );
    } else {
      console.log(logSymbols.warning, chalk.yellow(`File already exists ${chalk.white(filePath)}`));
    }
  }
}
