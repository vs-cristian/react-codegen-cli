import * as t from '@babel/types';

export const component = (componentName: string, contentStatement: t.Statement[] = []) => {
  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(componentName),
      t.arrowFunctionExpression(
        [t.identifier('props')],
        t.blockStatement([
          ...contentStatement,
          t.returnStatement(
            t.jsxElement(
              t.jsxOpeningElement(t.jsxIdentifier('div'), [], false),
              t.jsxClosingElement(t.jsxIdentifier('div')),
              []
            )
          ),
        ])
      )
    ),
  ]);
};

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

export const hoc = (hocName: string, contentStatement: t.Statement[] = []) => {
  return t.functionDeclaration(
    t.identifier(hocName),
    [t.identifier('WrappedComponent')],
    t.blockStatement([
      t.returnStatement(
        t.arrowFunctionExpression(
          [t.identifier('props')],
          t.blockStatement([
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
          ])
        )
      ),
    ])
  );
};

export const hook = (hookName: string, contentStatement: t.Statement[] = []) => {
  return t.functionDeclaration(
    t.identifier(hookName),
    [],
    t.blockStatement([...contentStatement, t.returnStatement(t.nullLiteral())])
  );
};
