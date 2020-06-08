import _ from 'lodash';

export function getNameCases(name: string) {
  return {
    camelCase: _.camelCase(name),
    pascalCase: _.upperFirst(_.camelCase(name)),
    snakeCase: _.snakeCase(name),
    snakeUpperCase: _.snakeCase(name).toUpperCase(),
    kebabCase: _.kebabCase(name),
  };
}
