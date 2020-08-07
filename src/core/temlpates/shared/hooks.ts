import * as t from '@babel/types';

export const useState = () => {
  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.arrayPattern([t.identifier('state'), t.identifier('setState')]),
      t.callExpression(t.identifier('useState'), [t.objectExpression([])])
    ),
  ]);
};

export const useContext = () => {
  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier('value'),
      t.callExpression(t.identifier('useContext'), [t.identifier('MyContext')])
    ),
  ]);
};

export const useRef = () => {
  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier('ref'),
      t.callExpression(t.identifier('useRef'), [t.nullLiteral()])
    ),
  ]);
};

export const useMemo = () => {
  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier('memoizedValue'),
      t.callExpression(t.identifier('useMemo'), [
        t.arrowFunctionExpression(
          [],
          t.callExpression(t.identifier('computeExpensiveValue'), [
            t.identifier('a'),
            t.identifier('b'),
          ]),
          false
        ),
        t.arrayExpression([t.identifier('a'), t.identifier('b')]),
      ])
    ),
  ]);
};

export const useCallback = () => {
  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier('memoizedCallback'),
      t.callExpression(t.identifier('useCallback'), [
        t.arrowFunctionExpression(
          [],
          t.callExpression(t.identifier('doSomething'), [t.identifier('a'), t.identifier('b')]),
          false
        ),
        t.arrayExpression([t.identifier('a'), t.identifier('b')]),
      ])
    ),
  ]);
};

export const useEffect = () => {
  return t.expressionStatement(
    t.callExpression(t.identifier('useEffect'), [
      t.arrowFunctionExpression([], t.blockStatement([], []), false),
      t.arrayExpression([]),
    ])
  );
};

export const useReducer = () => {
  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.arrayPattern([t.identifier('reducerState'), t.identifier('dispatch')]),
      t.callExpression(t.identifier('useReducer'), [
        t.identifier('reducer'),
        t.identifier('initialState'),
      ])
    ),
  ]);
};

export const useReducerInit = () => {
  return t.functionDeclaration(
    t.identifier('reducer'),
    [t.identifier('state'), t.identifier('action')],
    t.blockStatement(
      [
        t.switchStatement(t.memberExpression(t.identifier('action'), t.identifier('type'), false), [
          t.switchCase(t.stringLiteral('actionType'), [t.returnStatement(t.objectExpression([]))]),
          t.switchCase(null, [t.throwStatement(t.newExpression(t.identifier('Error'), []))]),
        ]),
      ],
      []
    ),
    false,
    false
  );
};
