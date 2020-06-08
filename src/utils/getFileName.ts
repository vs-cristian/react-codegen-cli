import { CONFIG } from '../constants';
import { Logger } from '../core/Logger';

let warned = false;

export function getFileName(type: string) {
  let name = this.componentName[`${CONFIG.fileNameCase}Case`];
  if (type === 'hoc') {
    name = this.componentName.camelCase;
  }

  if (!name) {
    if (!warned) {
      Logger.warn(
        `File name case "${CONFIG.fileNameCase}" is not supported. Using default "pascal"\n`
      );
      warned = true;
    }
    return this.componentName.pascalCase;
  }

  return name;
}
