import * as t from '@babel/types';
import { TemplateBase } from '@/core/TemplateBase';
import { Template } from '@/core/TemplateGenerator';
import { config } from '@/config';
import { IHOCVariables } from '@/types';
import * as c from '../shared';

export class HOCTemplate extends TemplateBase implements Template {
  constructor(protected vars: IHOCVariables) {
    super(vars);
  }

  generateAST(): t.File {
    const body: t.Statement[] = [];

    body.push(
      c.importDefault('React', 'react', this.getReactImportSpecifier())
    );
    body.push(t.emptyStatement());

    if (this.hasHook('useReducer')) {
      body.push(c.useReducerInit());
      body.push(t.emptyStatement());
    }

    const functionContainer = config.arrowFunction
      ? c.arrowFunctionDeclaration
      : c.regularFunctionDeclaration;

    const hocBody = c.hocBody(c.generateHooks(this.vars.hooks));

    const functionExpression = config.arrowFunction
      ? t.arrowFunctionExpression([t.identifier('props')], hocBody)
      : t.functionExpression(null, [t.identifier('props')], hocBody);

    const hoc = functionContainer(
      this.vars.componentName,
      [t.identifier('WrappedComponent')],
      [t.returnStatement(functionExpression)]
    );

    if (config.exportType === 'named') {
      body.push(t.exportNamedDeclaration(hoc));
    } else {
      body.push(hoc);
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
