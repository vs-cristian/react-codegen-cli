import * as t from '@babel/types';
import { TemplateBase } from '@/core/TemplateBase';
import { Template } from '@/core/TemplateGenerator';
import { config } from '@/config';
import { IHookVariables } from '@/types';
import * as c from '../shared';

export class HookTemplate extends TemplateBase implements Template {
  constructor(protected vars: IHookVariables) {
    super(vars);
  }

  generateAST(): t.File {
    const body: t.Statement[] = [];

    const reactImportSpecifiers = this.getReactImportSpecifier();

    if (reactImportSpecifiers.length) {
      body.push(c.importNamed(reactImportSpecifiers, 'react'));
      body.push(t.emptyStatement());
    }

    if (this.hasHook('useReducer')) {
      body.push(c.useReducerInit());
      body.push(t.emptyStatement());
    }

    const functionContainer = config.arrowFunction
      ? c.arrowFunctionDeclaration
      : c.regularFunctionDeclaration;

    const hook = functionContainer(
      this.vars.componentName,
      [],
      [...c.generateHooks(this.vars.hooks), t.returnStatement(t.nullLiteral())]
    );

    if (config.exportType === 'named') {
      body.push(t.exportNamedDeclaration(hook));
    } else {
      body.push(hook);
    }

    if (config.exportType === 'default') {
      body.push(t.emptyStatement());
      body.push(
        t.exportDefaultDeclaration(t.identifier(this.vars.componentName))
      );
    }

    return c.program(body);
  }
}
