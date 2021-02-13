import * as t from '@babel/types';
import { TemplateBase } from '@/core/TemplateBase';
import { Template } from '@/core/TemplateGenerator';
import { config } from '@/config';
import * as c from '../shared';

export class BarrelTemplate extends TemplateBase implements Template {
  generateAST(): t.File {
    const body: t.Statement[] = [];

    body.push(
      t.exportNamedDeclaration(
        null,
        [
          t.exportSpecifier(
            t.identifier(
              config.exportType === 'named'
                ? this.vars.componentName
                : 'default'
            ),
            t.identifier(
              config.exportType === 'named'
                ? this.vars.componentName
                : 'default'
            )
          ),
        ],
        t.stringLiteral(`./${this.vars.fileName}`)
      )
    );

    return c.program(body);
  }
}
