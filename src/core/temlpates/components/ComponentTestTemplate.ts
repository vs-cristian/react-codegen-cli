import * as t from '@babel/types';
import { Template } from '@/core/TemplateGenerator';
import { TemplateBase } from '@/core/TemplateBase';
import { config } from '@/config';
import * as c from '../shared';

export class ComponentTestTemplate extends TemplateBase implements Template {
  generateAST(): t.File {
    const componentPath = `./${this.vars.componentName}.${config.ext.component}`;
    const body: t.Statement[] = [];

    body.push(c.importDefault('React', 'react'));
    body.push(c.importNamed([c.importSpec('render')], '@testing-library/react'));
    body.push(c.importNamed([c.importSpec(this.vars.componentName)], componentPath));

    body.push(t.emptyStatement());

    body.push(c.test(this.vars.componentName));

    return c.program(body);
  }
}
