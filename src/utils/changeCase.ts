import _ from 'lodash';
import { Logger } from '@/core/Logger';

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
  return Logger.warn(`File name case "${strCase}" is not supported. Using default "pascal"\n`);
}
