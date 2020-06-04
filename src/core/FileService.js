import fs from 'fs-extra';
import path from 'path';

import { CONFIG, EXT, APP_ROOT } from '../constants';
import { Logger } from './Logger';

export class FileService {
  constructor(fileName) {
    this.fileName = fileName;
    this.dirPath = path.resolve(CONFIG.path, this.fileName);
  }

  getFilePath(ext, type) {
    type = type ? `.${type}` : '';
    return `${this.dirPath}/${this.fileName}${type}.${ext}`;
  }

  createDir() {
    fs.mkdirpSync(this.dirPath);
  }

  genJs(template) {
    const filePath = this.getFilePath(EXT.component);
    if (!fs.pathExistsSync(filePath)) {
      fs.writeFileSync(filePath, template);
      Logger.success(
        chalk =>
          `Successfully generated component file ${chalk.white(path.relative(APP_ROOT, filePath))}`
      );
    } else {
      Logger.warn(chalk => `File already exists ${chalk.white(filePath)}`);
    }
  }

  genStyle(template) {
    const filePath = this.getFilePath(EXT.style, 'style');
    if (!fs.pathExistsSync(filePath)) {
      fs.writeFileSync(filePath, template);
      Logger.success(
        chalk =>
          `Successfully generated style file ${chalk.white(path.relative(APP_ROOT, filePath))}`
      );
    } else {
      Logger.warn(chalk => `File already exists ${chalk.white(filePath)}`);
    }
  }

  genTest(template) {
    const filePath = this.getFilePath(EXT.component, 'test');
    if (!fs.pathExistsSync(filePath)) {
      fs.writeFileSync(filePath, template);
      Logger.success(
        chalk =>
          `Successfully generated test file ${chalk.white(path.relative(APP_ROOT, filePath))}`
      );
    } else {
      Logger.warn(chalk => `File already exists ${chalk.white(filePath)}`);
    }
  }
}
