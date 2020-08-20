import * as c from './temlpates/shared';

export class TemplateBase {
  constructor(protected vars) {}

  protected getReactImportSpecifier() {
    return this.vars.hooks.map(hook => c.importSpec(hook));
  }

  protected hasHook(hook: string) {
    return this.vars.hooks.includes(hook);
  }

  protected hasMod(mod: string) {
    return this.vars.mods?.includes(mod);
  }
}
