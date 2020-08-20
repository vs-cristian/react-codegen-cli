import * as t from '@babel/types';
import { TemplateBase } from '@/core/TemplateBase';
import { Template } from '@/core/TemplateGenerator';
import * as c from '../shared';

export class HOCTemplate extends TemplateBase implements Template {
  generateAST(): t.File {
    const body: t.Statement[] = [];

    body.push(c.importDefault('React', 'react', this.getReactImportSpecifier()));
    body.push(t.emptyStatement());

    if (this.hasHook('useReducer')) {
      body.push(c.useReducerInit());
      body.push(t.emptyStatement());
    }

    body.push(c.hoc(this.vars.componentName, c.generateHooks(this.vars.hooks)));

    return c.program(body);
  }
}
