import * as t from '@babel/types';
import generate from '@babel/generator';
import prettier from 'prettier';
import { Variables } from '@/types';

export interface Template {
  generateAST(): t.File;
}

/* istanbul ignore next */
export class TemplateGenerator {
  constructor(private vars: Variables) {}

  private static addEmptyLines(template) {
    return template.replace(/^\s*;$/gm, '');
  }

  generateTemplate(FileTemplate) {
    let template;
    const ast = new FileTemplate(this.vars).generateAST();

    template = generate(ast).code;
    template = TemplateGenerator.addEmptyLines(template);
    template = prettier.format(template, { parser: 'babel' });

    return template;
  }
}
