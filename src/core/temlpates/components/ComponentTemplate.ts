import * as t from '@babel/types';
import * as c from '../shared';
import { Template } from '../../TemplateGenerator';
import { TemplateBase } from '../../TemplateBase';
import { generateHooks } from '../shared';

export class ComponentTemplate extends TemplateBase implements Template {
  getStyleImportStringLiteral() {
    const name = `./${this.vars.fileName}.styles.${this.vars.ext.style}`;
    return t.stringLiteral(name);
  }

  generateAST() {
    const body: t.Statement[] = [];

    body.push(c.importDefault('React', 'react', this.getReactImportSpecifier()));

    if (this.hasMod('propTypes')) {
      body.push(c.importDefault('PropTypes', 'prop-types'));
    }

    body.push(t.importDeclaration([], this.getStyleImportStringLiteral()));
    body.push(t.emptyStatement());

    if (this.hasHook('useReducer')) {
      body.push(c.useReducerInit());
      body.push(t.emptyStatement());
    }

    body.push(c.component(this.vars.componentName, generateHooks(this.vars.hooks)));
    body.push(t.emptyStatement());

    if (this.hasMod('propTypes')) {
      body.push(c.propTypes(this.vars.componentName));
    }

    return c.program(body);
  }
}
