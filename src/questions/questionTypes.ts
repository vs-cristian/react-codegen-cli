import chalk from 'chalk';
import { CONFIG } from '../constants';
import * as questions from './questions';

const reactHooks = [
  'useState',
  'useEffect',
  'useContext',
  'useReducer',
  'useRef',
  'useMemo',
  'useCallback',
];
const mods = [];

export function getComponentQuestions() {
  if (!CONFIG.typescript) {
    mods.push('propTypes');
  }

  const val = [questions.name('Component'), questions.test(), questions.hooks(reactHooks)];

  if (mods.length) {
    val.push(questions.mods(mods));
  }

  return val;
}

export function getHOCQuestions() {
  return [
    questions.name('HOC', `: (prefix: ${chalk.magenta('with')})`),
    questions.hooks(reactHooks),
  ];
}

export function getHookQuestions() {
  return [
    questions.name('Hook', `: (prefix: ${chalk.magenta('use')})`),
    questions.hooks(reactHooks),
  ];
}
