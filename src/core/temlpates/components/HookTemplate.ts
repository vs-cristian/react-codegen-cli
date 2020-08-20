import * as t from '@babel/types';
import { TemplateBase } from '@/core/TemplateBase';
import { Template } from '@/core/TemplateGenerator';
import * as c from '../shared';

export class HookTemplate extends TemplateBase implements Template {
  generateAST(): t.File {
    const body: t.Statement[] = [];

    body.push(c.importNamed(this.getReactImportSpecifier(), 'react'));
    body.push(t.emptyStatement());

    if (this.hasHook('useReducer')) {
      body.push(c.useReducerInit());
      body.push(t.emptyStatement());
    }

    body.push(c.hook(this.vars.componentName, c.generateHooks(this.vars.hooks)));

    return c.program(body);
  }
}
