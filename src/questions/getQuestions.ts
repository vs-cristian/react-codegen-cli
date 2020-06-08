import { CONFIG } from '../constants';
import * as q from './questions';
import { Logger } from '../core/Logger';

const hooks = [
  'useState',
  'useEffect',
  'useContext',
  'useReducer',
  'useRef',
  'useMemo',
  'useCallBack',
];
const mods = [];

export function getQuestions(type: string) {
  switch (type) {
    case 'component': {
      if (!CONFIG.typescript) mods.push('propTypes');

      const val = [q.name('Component'), q.test, q.hooks(hooks)];
      if (mods.length) val.push(q.mods(mods));

      return val;
    }
    case 'hoc': {
      const val = [q.name('HOC'), q.hooks(hooks)];
      if (mods.length) val.push(q.mods(mods));

      return val;
    }
    default:
      Logger.error(`Unhandled generation type ${type}`);
      return process.exit(1);
  }
}
