export type StyleFormats = 'CSS' | 'SCSS' | 'SASS' | 'Less' | 'Stylus';
export type FileNameCase = 'pascal' | 'camel' | 'kebab' | 'snake' | 'snakeUpper';

export interface IConfig {
  styles: StyleFormats;
  typescript: boolean;
  jsxExt: boolean;
  fileNameCase: FileNameCase;
  path: string;
}

export interface IGenAnswers {
  type: 'component' | 'hoc';
  name: string;
  test: boolean;

  // Hooks

  useState: boolean;
  useEffect: boolean;
  useContext: boolean;
  useReducer: boolean;
  useRef: boolean;
  useMemo: boolean;
  useCallBack: boolean;

  // Mods

  propTypes: boolean;
}
