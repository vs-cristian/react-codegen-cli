const _ = require('lodash');

function getNameCases(name) {
  return {
    camelCase: _.camelCase(name),
    pascalCase: _.upperFirst(_.camelCase(name)),
    snakeCase: _.snakeCase(name),
    snakeUpperCase: _.snakeCase(name).toUpperCase(),
    kebabCase: _.kebabCase(name),
  };
}

module.exports = {
  getNameCases,
};
