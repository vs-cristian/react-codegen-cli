import { TemplateBase } from '@/core/TemplateBase';
import { IComponentVariables } from '@/types';

/* istanbul ignore next */
export class ComponentTemplateBase extends TemplateBase {
  constructor(protected vars: IComponentVariables) {
    super(vars);
  }

  protected hasMod(mod: string) {
    return this.vars.mods?.includes(mod);
  }
}
