import { EXT } from '../constants';

export type StyleFormats = 'CSS' | 'SCSS' | 'SASS' | 'Less' | 'Stylus';
export type FileNameCase = 'pascal' | 'camel' | 'kebab' | 'snake' | 'snakeUpper';

export interface IConfig {
  styles: StyleFormats;
  typescript: boolean;
  jsxExt: boolean;
  fileNameCase: FileNameCase;
  path: string;
  wrapFolder: boolean;
}

interface IBaseVariables {
  componentName: string;
  fileName: string;
  ext: typeof EXT;
}

export interface IComponentVariables extends IBaseVariables {
  type: 'component' | 'hoc';
  name: string;
  test: boolean;
  hooks: string[];
  mods: string[];
}

export interface IHOCVariables extends IBaseVariables {
  type: 'hoc';
  name: string;
  hooks: string[];
}

export interface IHookVariables extends IBaseVariables {
  type: 'hook';
  name: string;
  hooks: string[];
}
