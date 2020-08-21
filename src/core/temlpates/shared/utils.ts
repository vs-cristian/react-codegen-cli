import * as t from '@babel/types';
import * as c from './index';

export const program = (body: t.Statement[] = []) => {
  return t.file(t.program(body, [], 'module'), [], null);
};

export const importSpec = (local, imported?) => {
  if (!imported) imported = local;
  return t.importSpecifier(t.identifier(local), t.identifier(imported));
};

export const importNamed = (imports: t.ImportSpecifier[], from: string) => {
  return t.importDeclaration(imports, t.stringLiteral(from));
};

export const arrowFunctionDeclaration = (
  name: string,
  params: t.Identifier[],
  body: t.Statement[]
) => {
  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(name),
      t.arrowFunctionExpression(params, t.blockStatement(body))
    ),
  ]);
};

export const regularFunctionDeclaration = (
  name: string,
  params: t.Identifier[],
  body: t.Statement[]
) => {
  return t.functionDeclaration(t.identifier(name), params, t.blockStatement(body));
};

export const importDefault = (name, from, specs = []) => {
  return t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(name)), ...specs],
    t.stringLiteral(from)
  );
};

export const propTypes = (componentName: string) => {
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(t.identifier(componentName), t.identifier('propTypes')),
      t.objectExpression([])
    )
  );
};

export const generateHooks = (enabledHooks: string[]) => {
  const body: t.Statement[] = [];

  if (enabledHooks.includes('useReducer')) {
    body.push(c.useReducer());
    body.push(t.emptyStatement());
  }

  if (enabledHooks.includes('useState')) {
    body.push(c.useState());
    body.push(t.emptyStatement());
  }

  if (enabledHooks.includes('useContext')) {
    body.push(c.useContext());
    body.push(t.emptyStatement());
  }

  if (enabledHooks.includes('useRef')) {
    body.push(c.useRef());
    body.push(t.emptyStatement());
  }

  if (enabledHooks.includes('useMemo')) {
    body.push(c.useMemo());
    body.push(t.emptyStatement());
  }

  if (enabledHooks.includes('useCallback')) {
    body.push(c.useCallback());
    body.push(t.emptyStatement());
  }

  if (enabledHooks.includes('useEffect')) {
    body.push(c.useEffect());
    body.push(t.emptyStatement());
  }

  return body;
};
