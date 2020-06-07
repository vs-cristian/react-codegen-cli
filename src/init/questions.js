import { getNameCases } from '../utils';

const nameCases = getNameCases('my component');

function getFileName(format, answers) {
  const name = nameCases[`${format}Case`];
  const ext = answers.typescript ? 'tsx' : `j${answers.jsxExt ? 'sx' : 's'}`;

  return `${name}.${ext}`;
}

export const question = [
  {
    type: 'list',
    name: 'styles',
    message: 'Which stylesheet format would you like to use?',
    choices: ['CSS', 'SCSS', 'SASS', 'Less', 'Stylus'],
  },
  {
    type: 'confirm',
    name: 'typescript',
    message: 'Use typescript?',
  },
  {
    type: 'confirm',
    name: 'jsxExt',
    message: 'Use JSX format',
    when: values => !values.typescript,
  },
  {
    type: 'list',
    name: 'fileNameCase',
    message: 'Which file name case would you like to use?',
    choices: values => [
      {
        value: 'pascal',
        name: `Pascal Case       [ ${getFileName('pascal', values)}  ]`,
      },
      {
        value: 'kebab',
        name: `Kebab Case        [ ${getFileName('kebab', values)} ]`,
      },
      {
        value: 'camel',
        name: `Camel Case        [ ${getFileName('camel', values)}  ]`,
      },
      {
        value: 'snake',
        name: `Snake Case        [ ${getFileName('snake', values)} ]`,
      },
      {
        value: 'snakeUpper',
        name: `Snake Upper Case  [ ${getFileName('snakeUpper', values)} ]`,
      },
    ],
  },
  {
    type: 'input',
    name: 'path',
    message: 'Where to generate files?',
    default: 'src/components',
    validate: str => str.length > 0,
  },
  {
    type: 'confirm',
    name: 'script',
    message: 'Add script in package.json?',
  },
  {
    type: 'input',
    name: 'scriptName',
    message: 'Script name?',
    default: 'react-codegen',
    when: answers => answers.script,
    validate: str => str.length > 0,
  },
];
