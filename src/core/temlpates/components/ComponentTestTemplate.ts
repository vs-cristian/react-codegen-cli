import * as t from '@babel/types';
import { Template } from '@/core/TemplateGenerator';
import { config } from '@/config';
import { IComponentVariables } from '@/types';
import { ComponentTemplateBase } from '../ComponentTemplateBase';
import * as c from '../shared';

export class ComponentTestTemplate
  extends ComponentTemplateBase
  implements Template {
  constructor(protected vars: IComponentVariables) {
    super(vars);
  }

  generateAST(): t.File {
    const componentPath = `./${this.vars.componentName}`;
    const body: t.Statement[] = [];

    body.push(c.importDefault('React', 'react'));
    body.push(
      c.importNamed([c.importSpec('render')], '@testing-library/react')
    );

    if (config.exportType === 'named') {
      body.push(
        c.importNamed([c.importSpec(this.vars.componentName)], componentPath)
      );
    } else {
      body.push(c.importDefault(this.vars.componentName, componentPath));
    }

    body.push(t.emptyStatement());

    body.push(c.test(this.vars.componentName));

    return c.program(body);
  }
}
