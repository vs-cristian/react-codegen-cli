import * as t from '@babel/types';
import generate from '@babel/generator';
import prettier from 'prettier';
import { IComponentVariables, IHOCVariables, IHookVariables } from '@/types';

export type IVariables = IHookVariables | IHOCVariables | IComponentVariables;

export interface Template {
  generateAST(): t.File;
}

export class TemplateGenerator {
  constructor(private vars: IVariables) {}

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
