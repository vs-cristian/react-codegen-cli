const fs = require('fs-extra');
const path = require('path');
const Mustache = require('mustache');

const { EXT, ROOT } = require('../constants');

class TemplateService {
  constructor(variables) {
    this.variables = variables;
    this.parse = this.parse.bind(this);
  }

  parse(template) {
    return Mustache.render(template, this.variables);
  }

  getScriptTemplate() {
    const ext = EXT.component === 'js' ? 'jsx' : EXT.component;
    const filePath = path.resolve(ROOT, `templates/component-${ext}.template`);
    return fs.readFile(filePath, 'utf8').then(this.parse);
  }

  getStyleTemplate() {
    const filePath = path.resolve(ROOT, `templates/style-css.template`);
    return fs.readFile(filePath, 'utf8').then(this.parse);
  }

  getTestTemplate() {
    const ext = EXT.component === 'js' ? 'jsx' : EXT.component;
    const filePath = path.resolve(ROOT, `templates/test-${ext}.template`);
    return fs.readFile(filePath, 'utf8').then(this.parse);
  }
}

module.exports = {
  TemplateService,
};
