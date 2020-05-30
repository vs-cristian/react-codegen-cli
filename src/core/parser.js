// eslint-disable-file
import parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

const code = `
import React from 'react';
import propTypes from 'prop-types';
import './$ComponentName.style.css';

export const $ComponentName = props => {
  const [state, setState] = React.useState({});

  React.useEffect(() => {}, []);

  return null;
};
`;
const AST = parser.parse(code, {
  sourceType: 'module',
});

traverse(AST, {
  enter(path) {
    if (path.isImportDeclaration()) {
      console.log('import');
    }
  },
});

// eslint-disable-next-line no-unused-vars
const output = generate(AST, code);
// console.log(output.code);
// console.log(output);
