import * as t from '@babel/types';
import { TemplateBase } from '@/core/TemplateBase';
import { Template } from '@/core/TemplateGenerator';
import * as c from '../shared';

export class StyledComponentsTemplate extends TemplateBase implements Template {
  // eslint-disable-next-line class-methods-use-this
  generateAST(): t.File {
    const body: t.Statement[] = [];

    body.push(
      t.importDeclaration(
        [t.importDefaultSpecifier(t.identifier('styled'))],
        t.stringLiteral('styled-components')
      )
    );

    body.push(t.emptyStatement());

    body.push(
      t.exportDefaultDeclaration(
        t.objectExpression([
          t.objectProperty(
            t.identifier('Root'),
            t.taggedTemplateExpression(
              t.memberExpression(
                t.identifier('styled'),
                t.identifier('div'),
                false
              ),
              t.templateLiteral(
                [t.templateElement({ raw: '', cooked: '' }, true)],
                []
              )
            ),
            false,
            false
          ),
        ])
      )
    );

    return c.program(body);
  }
}
