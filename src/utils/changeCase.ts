import _ from 'lodash';
import { Logger } from '@/core/Logger';
import { DEFAULT_CONFIG } from '@/constants';

const stringCases = {
  camel: _.camelCase,
  pascal: (name: string) => _.upperFirst(_.camelCase(name)),
  snake: _.snakeCase,
  snakeUpper: (name: string) => _.snakeCase(name).toUpperCase(),
  kebab: _.kebabCase,
};

export function changeCase(name: string, strCase: keyof typeof stringCases) {
  const caseFn = stringCases[strCase];
  if (caseFn) {
    return caseFn(name);
  }

  Logger.warn(
    chalk =>
      `Unsupported "fileNameCase" value "${strCase}" ${chalk.white(
        `(using default value - ${DEFAULT_CONFIG.fileNameCase})`
      )}`
  );

  return stringCases[DEFAULT_CONFIG.fileNameCase](name);
}
