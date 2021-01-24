import fs from 'fs-extra';
import path from 'path';

import { APP_ROOT } from '@/constants';
import { config } from '@/config';
import { Logger } from './Logger';

export class FileService {
  private dirPath = path.resolve(
    config.path,
    config.wrapFolder ? this.fileName : ''
  );

  constructor(private fileName: string) {}

  // eslint-disable-next-line class-methods-use-this
  genFile(filePath: string, template: string, type: string) {
    if (!fs.pathExistsSync(filePath)) {
      fs.writeFileSync(filePath, template);
      Logger.success(
        chalk =>
          `Successfully generated ${type} file ${chalk.white(
            path.relative(APP_ROOT, filePath)
          )}`
      );
    } else {
      Logger.warn(chalk => `File already exists ${chalk.white(filePath)}`);
    }
  }

  getFilePath(ext: string, prefix?: string) {
    prefix = prefix ? `.${prefix}` : '';
    return `${this.dirPath}/${this.fileName}${prefix}.${ext}`;
  }

  createDir() {
    fs.mkdirpSync(this.dirPath);
  }

  genBarrel(template: string) {
    const filePath = `${this.dirPath}/index.${config.ext.component}`;
    this.genFile(filePath, template, 'barrel');
  }

  genJs(template: string) {
    const filePath = this.getFilePath(config.ext.component);
    this.genFile(filePath, template, 'component');
  }

  genStyle(template: string) {
    const filePath = this.getFilePath(config.ext.style, config.prefixes.style);
    this.genFile(filePath, template, 'styles');
  }

  genTest(template: string) {
    const filePath = this.getFilePath(
      config.ext.component,
      config.prefixes.test
    );
    this.genFile(filePath, template, 'test');
  }
}
