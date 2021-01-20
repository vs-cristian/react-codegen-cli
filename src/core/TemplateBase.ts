import * as t from '@babel/types';
import { ReactHook, Variables } from '@/types';
import * as c from './temlpates/shared';

/* istanbul ignore next */
export class TemplateBase {
  constructor(protected vars: Variables) {}

  protected getReactImportSpecifier(): t.ImportSpecifier[] {
    return this.vars.hooks.map(hook => c.importSpec(hook));
  }

  protected hasHook(hook: ReactHook) {
    return this.vars.hooks.includes(hook);
  }
}
