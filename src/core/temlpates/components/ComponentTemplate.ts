import * as t from '@babel/types';
import { Template } from '@/core/TemplateGenerator';
import { TemplateBase } from '@/core/TemplateBase';
import { config } from '@/config';
import * as c from '../shared';

export class ComponentTemplate extends TemplateBase implements Template {
  getStyleImport() {
    const specifiers = [];
    const name = `./${this.vars.fileName}.${config.prefixes.style}.${config.ext.style}`;

    if (config.cssModules) {
      specifiers.push(t.importDefaultSpecifier(t.identifier('styles')));
    }

    return t.importDeclaration(specifiers, t.stringLiteral(name));
  }

  generateAST() {
    const body: t.Statement[] = [];

    body.push(c.importDefault('React', 'react', this.getReactImportSpecifier()));

    if (this.hasMod('propTypes')) {
      body.push(c.importDefault('PropTypes', 'prop-types'));
    }

    body.push(this.getStyleImport());
    body.push(t.emptyStatement());

    if (this.hasHook('useReducer')) {
      body.push(c.useReducerInit());
      body.push(t.emptyStatement());
    }

    const component = c.component(this.vars.componentName, c.generateHooks(this.vars.hooks));

    if (config.exportType === 'named') {
      body.push(t.exportNamedDeclaration(component));
    } else {
      body.push(component);
    }

    if (this.hasMod('propTypes')) {
      body.push(t.emptyStatement());
      body.push(c.propTypes(this.vars.componentName));
    }

    if (config.exportType === 'default') {
      body.push(t.emptyStatement());
      body.push(t.exportDefaultDeclaration(t.identifier(this.vars.componentName)));
    }

    return c.program(body);
  }
}
