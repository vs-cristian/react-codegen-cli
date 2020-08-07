import * as t from '@babel/types';
import * as c from '../shared';
import { TemplateBase } from '../../TemplateBase';
import { Template } from '../../TemplateGenerator';
import { generateHooks } from '../shared';

export class HookTemplate extends TemplateBase implements Template {
  generateAST(): t.File {
    const body: t.Statement[] = [];

    body.push(c.importNamed(this.getReactImportSpecifier(), 'react'));
    body.push(t.emptyStatement());

    if (this.hasHook('useReducer')) {
      body.push(c.useReducerInit());
      body.push(t.emptyStatement());
    }

    body.push(c.hook(this.vars.componentName, generateHooks(this.vars.hooks)));

    return c.program(body);
  }
}
