import * as t from '@babel/types';
import { ReactHook, Variables } from '@/types';
import { config } from '@/config';
import * as c from './temlpates/shared';

/* istanbul ignore next */
export class TemplateBase {
  protected vars: Variables;

  constructor(vars: Variables) {
    this.vars = vars;
  }

  // eslint-disable-next-line class-methods-use-this
  protected getReactImport(
    reactImportSpecifiers: t.ImportSpecifier[] = []
  ): t.ImportDeclaration | null {
    if (config.newJsx) {
      if (reactImportSpecifiers.length) {
        return c.importNamed(reactImportSpecifiers, 'react');
      }
      return null;
    }
    return c.importDefault('React', 'react', reactImportSpecifiers);
  }

  protected getReactImportSpecifiers(): t.ImportSpecifier[] {
    return this.vars.hooks.map(hook => c.importSpec(hook));
  }

  protected hasHook(hook: ReactHook) {
    return this.vars.hooks.includes(hook);
  }
}
