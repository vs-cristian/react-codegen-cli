import * as t from '@babel/types';

export const test = (componentName: string) => {
  return t.expressionStatement(
    t.callExpression(t.identifier('describe'), [
      t.stringLiteral(componentName),
      t.arrowFunctionExpression(
        [],
        t.blockStatement([
          t.expressionStatement(
            t.callExpression(t.identifier('it'), [
              t.stringLiteral('should render without crashing'),
              t.arrowFunctionExpression(
                [],
                t.blockStatement([
                  t.variableDeclaration('const', [
                    t.variableDeclarator(
                      t.identifier('component'),
                      t.callExpression(t.identifier('render'), [
                        t.jsxElement(
                          t.jsxOpeningElement(t.jsxIdentifier(componentName), [], true),
                          null,
                          []
                        ),
                      ])
                    ),
                  ]),
                ])
              ),
            ])
          ),
        ])
      ),
    ])
  );
};

export const hocBody = (contentStatement: t.Statement[] = []) => {
  return t.blockStatement([
    ...contentStatement,
    t.returnStatement(
      t.jsxElement(
        t.jsxOpeningElement(
          t.jsxIdentifier('WrappedComponent'),
          [t.jsxSpreadAttribute(t.identifier('props'))],
          true
        ),
        null,
        []
      )
    ),
  ]);
};
