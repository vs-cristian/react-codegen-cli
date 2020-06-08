import generate from '@babel/generator';
import * as t from '@babel/types';

const importSpec = (local, imported?) => {
  if (!imported) imported = local;
  return t.importSpecifier(t.identifier(local), t.identifier(imported));
};

const importDefault = (name, from, specs = []) => {
  return t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(name)), ...specs],
    t.stringLiteral(from)
  );
};

const component = (statement = []) => {
  return t.exportNamedDeclaration(
    t.variableDeclaration('const', [
      t.variableDeclarator(
        t.identifier('Button'),
        t.arrowFunctionExpression(
          [t.identifier('props')],
          t.blockStatement([
            ...statement,
            t.returnStatement(
              t.jsxElement(
                t.jsxOpeningElement(t.jsxIdentifier('div'), [], false),
                t.jsxClosingElement(t.jsxIdentifier('div')),
                [],
                null
              )
            ),
          ])
        )
      ),
    ])
  );
};

const useState = () => {
  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.arrayPattern([t.identifier('state'), t.identifier('setState')]),
      t.callExpression(t.identifier('useState'), [t.objectExpression([])])
    ),
  ]);
};

const ast = t.file(
  t.program(
    [
      importDefault('React', 'react', [importSpec('useState')]),
      importDefault('propTypes', 'prop-types'),
      t.importDeclaration([], t.stringLiteral('button.styles.css')),
      // Component
      // t.emptyStatement(),
      component([useState()]),
    ],
    [],
    'module'
  ),
  [],
  null
);

const config: any = {
  indentLevel: 2,
};

console.log(generate(ast, config).code);
