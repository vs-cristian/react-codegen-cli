import { IComponentVariables } from '@/types';
import { TemplateBase } from '@/core/TemplateBase';

/* istanbul ignore next */
export class ComponentTemplateBase extends TemplateBase {
  protected vars: IComponentVariables;

  protected hasMod(mod: string) {
    return this.vars.mods?.includes(mod);
  }
}
