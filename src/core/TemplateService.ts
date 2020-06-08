import path from 'path';
import fs from 'fs-extra';
import Mustache from 'mustache';

import { EXT, ROOT } from '../constants';
import { Logger } from './Logger';
import { IGenAnswers } from '../types/types';

export class TemplateService {
  constructor(private variables: IGenAnswers) {}

  static getExt(format) {
    switch (format) {
      case 'script':
      case 'test':
        return EXT.component === 'js' ? 'jsx' : EXT.component;
      case 'style':
        return 'css';
      default:
        Logger.error(`Unhandled format ${format}`);
        return process.exit(1);
    }
  }

  getTemplate(format = 'script') {
    const ext = TemplateService.getExt(format);
    const { type } = this.variables;

    const filePath = path.resolve(ROOT, `templates/${type}/${type}-${format}-${ext}.template`);
    if (fs.pathExistsSync(filePath)) {
      const template = fs.readFileSync(filePath, 'utf8');
      return Mustache.render(template, this.variables);
    }
    Logger.warn(chalk => `Couldn't find "${format}" template at ${chalk.white(filePath)}`);
    return '// Template not found';
  }
}
